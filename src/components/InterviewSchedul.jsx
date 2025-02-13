import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { create } from "zustand";
import { useInterviewerStore } from "./InterviewerForm";

// Interview Store
const useInterviewStore = create((set) => ({
  interviews: JSON.parse(localStorage.getItem("interviews")) || [],
  addInterview: (interview) =>
    set((state) => {
      const updatedList = [...state.interviews, interview];
      localStorage.setItem("interviews", JSON.stringify(updatedList));
      sendEmailNotification(interview);
      return { interviews: updatedList };
    }),
  updateInterview: (index, updatedInterview) =>
    set((state) => {
      const updatedList = [...state.interviews];
      updatedList[index] = updatedInterview;
      localStorage.setItem("interviews", JSON.stringify(updatedList));
      sendEmailNotification(updatedInterview);
      return { interviews: updatedList };
    }),
  deleteInterview: (index) =>
    set((state) => {
      const updatedList = state.interviews.filter((_, i) => i !== index);
      localStorage.setItem("interviews", JSON.stringify(updatedList));
      return { interviews: updatedList };
    }),
}));

const sendEmailNotification = (interview) => {
  console.log("Sending email to:", interview.email);
  console.log("Subject: Interview Scheduled");
  console.log(`Dear ${interview.candidate}, your interview with ${interview.interviewer} is scheduled on ${interview.date} from ${interview.startTime} to ${interview.endTime}.`);
};

const InterviewSchedule = () => {
  const { addInterview, updateInterview, deleteInterview, interviews } = useInterviewStore();
  const { interviewers } = useInterviewerStore(); // Get interviewers from store

  const [form, setForm] = useState({
    candidate: "",
    email: "",
    interviewer: "",
    type: "Technical",
    date: new Date(),
    startTime: "",
    endTime: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { candidate, email, interviewer, date, startTime, endTime } = form;

    if (!candidate || !email || !interviewer || !startTime || !endTime) {
      alert("Please fill all fields");
      return;
    }

    // Convert the date to the local midnight time zone
    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);

    // Convert startTime and endTime to Date objects for comparison
    const startTimeObj = new Date(`1970-01-01T${startTime}:00Z`);
    const endTimeObj = new Date(`1970-01-01T${endTime}:00Z`);

    // Check if the new interview conflicts with any previous interview
    const isConflict = interviews.some(
      (interview, index) => {
        const interviewStart = new Date(`1970-01-01T${interview.startTime}:00Z`);
        const interviewEnd = new Date(`1970-01-01T${interview.endTime}:00Z`);
        const conflict = 
          index !== editIndex &&
          interview.interviewer === interviewer &&
          interview.date === formattedDate &&
          ((startTimeObj >= interviewStart && startTimeObj < interviewEnd) ||
            (endTimeObj > interviewStart && endTimeObj <= interviewEnd) ||
            (startTimeObj <= interviewStart && endTimeObj >= interviewEnd));
        
        return conflict;
      }
    );

    if (isConflict) {
      alert("This interviewer already has a meeting in this time slot.");
      return;
    }

    // Add or update the interview
    if (editIndex !== null) {
      updateInterview(editIndex, { ...form, date: formattedDate });
      setEditIndex(null);
    } else {
      addInterview({ ...form, date: formattedDate });
    }

    // Reset form
    setForm({ candidate: "", email: "", interviewer: "", type: "Technical", date: new Date(), startTime: "", endTime: "" });
  };

  const handleEdit = (index) => {
    const interview = interviews[index];
    setForm({ ...interview, date: new Date(interview.date) });
    setEditIndex(index);
  };

  return (
    <div className="p-6 bg-[#DCD7C9] text-[#3F4F44] rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center">{editIndex !== null ? "Edit Interview" : "Schedule an Interview"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="candidate"
          placeholder="Candidate Name"
          value={form.candidate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Candidate Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg"
          required
        />
        <select
          name="interviewer"
          value={form.interviewer}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg"
          required
        >
          <option value="">Select Interviewer</option>
          {interviewers.map((i, index) => (
            <option key={index} value={i.name}>
              {i.name} ({i.type} - {i.position})
            </option>
          ))}
        </select>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg"
        >
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
          <option value="Behavioral">Behavioral</option>
        </select>
        <DatePicker
          selected={form.date}
          onChange={(date) => setForm({ ...form, date })}
          dateFormat="yyyy-MM-dd"
          className="w-full p-3 border border-gray-400 rounded-lg"
          required
        />
        <div className="flex gap-3">
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-400 rounded-lg"
            required
          />
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="w-1/2 p-3 border border-gray-400 rounded-lg"
            required
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-[#3F4F44] to-[#2C3A32] text-white p-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-[#2C3A32] hover:to-[#1A241A] focus:outline-none focus:ring-2 focus:ring-[#A0A8A1] shadow-lg">
          {editIndex !== null ? "Update Interview" : "Schedule Interview"}
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Scheduled Interviews</h3>
        <ul className="mt-2">
          {interviews.map((interview, index) => (
            <li key={index} className="flex justify-between items-center bg-white p-2 my-2 rounded shadow">
              <span>{interview.candidate} - {interview.interviewer} ({new Date(interview.date).toLocaleDateString()}, {interview.startTime} - {interview.endTime})</span>
              <button onClick={() => handleEdit(index)} className="text-blue-500 mr-2">Edit</button>
              <button onClick={() => deleteInterview(index)} className="text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InterviewSchedule;

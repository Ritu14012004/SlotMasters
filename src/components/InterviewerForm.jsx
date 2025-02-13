import { useState } from "react";
import { create } from "zustand";

// Zustand Store for Interviewers
const useInterviewerStore = create((set) => ({
  interviewers: JSON.parse(localStorage.getItem("interviewers")) || [],
  addInterviewer: (interviewer) =>
    set((state) => {
      const updatedList = [...state.interviewers, interviewer];
      localStorage.setItem("interviewers", JSON.stringify(updatedList));
      return { interviewers: updatedList };
    }),
}));

const InterviewerForm = () => {
  const { addInterviewer, interviewers } = useInterviewerStore();
  const [form, setForm] = useState({ name: "", type: "Technical", position: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.position) return alert("Please fill all fields.");

    addInterviewer(form);
    alert("Interviewer added successfully!");
    setForm({ name: "", type: "Technical", position: "" });
  };

  return (
    <div className="p-6 bg-[#DCD7C9] text-[#3F4F44] rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center">Add Interviewer</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="name"
          placeholder="Interviewer Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg"
        >
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
          <option value="Behavioral">Behavioral</option>
          <option value="System Design">System Design</option>
        </select>
        <input
          type="text"
          name="position"
          placeholder="Position (e.g. Software Engineer, Data Scientist)"
          value={form.position}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg"
          required
        />
       <button 
  type="submit" 
  className="w-full bg-gradient-to-r from-[#3F4F44] to-[#2C3A32] text-white p-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-[#2C3A32] hover:to-[#1A241A] focus:outline-none focus:ring-2 focus:ring-[#A0A8A1] shadow-lg"
>
  Add Interviewer
</button>
      </form>

      {/* ✅ Display Added Interviewers */}
      
    </div>
  );
};

export default InterviewerForm;
export { useInterviewerStore };

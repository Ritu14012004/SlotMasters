import { useState, useEffect } from "react";
import { useInterviewerStore } from "../store/interviewerStore"; // Ensure correct path

const InterviewerList = () => {
  const { interviewers, addInterviewer, deleteInterviewer, updateInterviewer, fetchInterviewers } = useInterviewerStore();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", type: "Technical", position: "" });

  // Fetch interviewers when component mounts
  useEffect(() => {
    fetchInterviewers(); // Loads interviewers into Zustand state
  }, []);

  const handleAddInterviewer = () => {
    const newInterviewer = { name: `Interviewer ${interviewers.length + 1}`, type: "Technical", position: "Engineer" };
    addInterviewer(newInterviewer); 
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditForm(interviewers[index]);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    if (!editForm.name || !editForm.position) return alert("Fill all fields!");
    updateInterviewer(editingIndex, editForm);
    setEditingIndex(null);
  };

  return (
    <div className="p-6 bg-[#F7F7F7] rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Interviewers List</h2>

     

      {interviewers.length === 0 ? (
        <p className="text-gray-500 text-center">No interviewers added yet.</p>
      ) : (
        <ul className="space-y-3">
          {interviewers.map((interviewer, index) => (
            <li key={index} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
              {editingIndex === index ? (
                <div className="w-full flex flex-col gap-2">
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="p-2 border rounded w-full"
                  />
                  <select
                    name="type"
                    value={editForm.type}
                    onChange={handleEditChange}
                    className="p-2 border rounded w-full"
                  >
                    <option value="Technical">Technical</option>
                    <option value="HR">HR</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="System Design">System Design</option>
                  </select>
                  <input
                    type="text"
                    name="position"
                    value={editForm.position}
                    onChange={handleEditChange}
                    className="p-2 border rounded w-full"
                  />
                  <div className="flex justify-end space-x-2">
                    <button onClick={saveEdit} className="bg-green-500 text-[#008000] px-5 py-3 rounded-lg font-semibold transition duration-300 hover:bg-green-600">Save</button>
                    <button onClick={() => setEditingIndex(null)} className="bg-gray-500 text-white px-3 py-2 rounded-lg">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-between items-center">
                  <div>
                    <p><strong>{interviewer.name}</strong> ({interviewer.type})</p>
                    <p className="text-sm text-gray-600">{interviewer.position}</p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => startEditing(index)} className="bg-blue-500 text-[#FFA500] px-3 py-2 rounded-lg">Edit</button>
                    <button onClick={() => deleteInterviewer(index)} className="bg-red-500 text-[#FF0000] px-3 py-2 rounded-lg">Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InterviewerList;

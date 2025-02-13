import { create } from "zustand";

export const useInterviewerStore = create((set) => ({
  interviewers: [],

  fetchInterviewers: () => {
    const storedInterviewers = JSON.parse(localStorage.getItem("interviewers")) || [];
    set({ interviewers: storedInterviewers });
  },

  addInterviewer: (newInterviewer) => {
    set((state) => {
      const updatedInterviewers = [...state.interviewers, newInterviewer];
      localStorage.setItem("interviewers", JSON.stringify(updatedInterviewers)); // Persist data
      return { interviewers: updatedInterviewers };
    });
  },

  deleteInterviewer: (index) => {
    set((state) => {
      const updatedInterviewers = state.interviewers.filter((_, i) => i !== index);
      localStorage.setItem("interviewers", JSON.stringify(updatedInterviewers));
      return { interviewers: updatedInterviewers };
    });
  },

  updateInterviewer: (index, updatedInterviewer) => {
    set((state) => {
      const updatedInterviewers = [...state.interviewers];
      updatedInterviewers[index] = updatedInterviewer;
      localStorage.setItem("interviewers", JSON.stringify(updatedInterviewers));
      return { interviewers: updatedInterviewers };
    });
  },
}));

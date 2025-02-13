import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddInterviewer from "./pages/AddInterviewer";
import ScheduleInterview from "./pages/ScheduleInterview";
import Interviewer from "./pages/InterviewerList";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-interviewer" element={<AddInterviewer />} />
        <Route path="/interviewers" element={<Interviewer />} />
        <Route path="/schedule-interview" element={<ScheduleInterview />} />
      </Routes>
    
      </>
  );
}

export default App;

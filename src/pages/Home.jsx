import { useState, useEffect, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const Home = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store selected event details

  // Function to parse stored interview data
  const parseInterviews = (interviews) => {
    return interviews.map((interview, index) => {
      const startDateTime = new Date(`${interview.date}T${interview.startTime}:00`);
      const endDateTime = new Date(`${interview.date}T${interview.endTime}:00`);

      return {
        id: index + 1,
        title: `${interview.candidate} with ${interview.interviewer} (${interview.type})`,
        start: startDateTime,
        end: endDateTime,
        candidate: interview.candidate,
        interviewer: interview.interviewer,
        type: interview.type,
        email: interview.email,
        date: interview.date,
        startTime: interview.startTime,
        endTime: interview.endTime,
      };
    });
  };

  // Load interviews from localStorage on mount
  useEffect(() => {
    const storedInterviews = JSON.parse(localStorage.getItem("interviews")) || [];
    setEvents(parseInterviews(storedInterviews));
  }, []);

  // Update localStorage whenever events change
  useEffect(() => {
    const storedInterviews = JSON.parse(localStorage.getItem("interviews")) || [];
    localStorage.setItem("interviews", JSON.stringify(storedInterviews));
  }, [events]);

  // Function to handle drag-and-drop rescheduling
  const onEventDrop = useCallback(({ event, start, end }) => {
    const updatedEvents = events.map((ev) =>
      ev.id === event.id ? { ...ev, start, end } : ev
    );
    setEvents(updatedEvents);
  }, [events]);

  // Function to handle event click and show details
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <h2 className="text-2xl font-bold mb-4 text-center">Interview Schedule</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 600, // Adjust calendar height
            backgroundColor: "#f9fafb", // Background color for the calendar
            borderRadius: "8px", // Rounded corners for the calendar
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Light shadow effect
          }}
          draggableAccessor={() => true}
          onEventDrop={onEventDrop}
          onSelectEvent={handleEventClick} // Handle event click to show details
        />
      </div>

      {/* Modal: Pop-up */}
      {selectedEvent && (
        <div className="fixed inset-0 flex justify-center items-start z-50">
          {/* Modal content with high z-index */}
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl relative mt-16 z-10">
            <button
              className="absolute top-2 right-2 text-xl text-[#FF0000] hover:text-gray-900"
              onClick={closeModal} // Close the modal
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">Interview Details</h3>
            <p><strong>Candidate:</strong> {selectedEvent.candidate}</p>
            <p><strong>Interviewer:</strong> {selectedEvent.interviewer}</p>
            <p><strong>Interview Type:</strong> {selectedEvent.type}</p>
            <p><strong>Email:</strong> {selectedEvent.email}</p>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Time:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

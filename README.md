# SlotMaster

A functional React application that allows HR/Recruiters to schedule, manage, and view interviews efficiently.

## Live Demo

Check out the live demo of the project: [SlotMaster](#)

## Technologies Used

- **React.js (v19):** Frontend framework for building the UI.
- **Zustand:** State management library for managing global application state.
- **React Router:** Library for navigation between different views in the app.
- **Tailwind CSS:** Utility-first framework for styling the app and UI components.
- **React Toastify:** For displaying notifications (e.g., successful interview scheduling).
- **Mock APIs (JSON Server or LocalStorage):** For data persistence and fetching interview details.
- **CSS-in-JS or CSS Framework:** For styling UI components.

## 🚀 Project Setup

### 🛠️ Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v14 or higher) – [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** – Package Managers

### 📥 1. Clone the Repository

```bash
git clone https://github.com/Ritu14012004/SlotMaster
cd slotmaster
2. Install Dependencies :npm install
Run the Development Server:npm run dev

---

# Step 6: Key Features

List the core features of your application. This will give users a quick overview of the functionalities your project provides.

```markdown
## 🧠 Key Features

- **Interview Scheduling:** Easily schedule, reschedule, or delete interview slots.
- **Dashboard:** View all scheduled interviews in an organized and intuitive dashboard.
- **Notifications:** Get real-time notifications when an interview is successfully scheduled or modified.
- **State Management:** Use Zustand for managing global state related to interviews and user information.
- **Mock API:** Fetch and save interview data using mock APIs or LocalStorage.
- **Drag-and-Drop Scheduling (Bonus):** Drag interview slots to reschedule interviews.
- **Calendar Integration (Bonus):** Integrate calendar functionalities to manage interviews in an easy-to-view calendar.
- **Time Zone Handling (Bonus):** Ensure proper time zone handling for interview scheduling.
- **Mock Email Notifications (Bonus):** Send mock email notifications upon scheduling or rescheduling an interview.
## 🖌️ Design Decisions

### Component-Based Architecture:
The project follows a modular, component-based structure using React. Each feature (e.g., Interview Scheduler, Interview Dashboard, etc.) is implemented as a separate component for easier scalability and maintenance.

### State Management:
Zustand is used to manage global application state. This approach provides a simple, scalable way to handle global states such as scheduled interviews and user data.

### UI/UX:
The UI is simple, clean, and user-friendly, with a focus on accessibility. Tailwind CSS is used for styling, providing a responsive and modern design, while React Toastify gives real-time feedback to users.

### Time Management:
Time slots are handled with a custom date picker to avoid overlaps and ensure that interview scheduling is precise. The app prevents users from selecting invalid time slots, ensuring a seamless experience.

### Notifications:
React Toastify is used for providing immediate feedback to users. Notifications are shown when an interview is successfully scheduled or when any errors occur.
## 🧮 Challenges Faced

- **Handling Conflicting Slots:** Ensuring that time slots selected by one user do not overlap with others required managing interview slots efficiently.
- **Date and Time Formatting:** Handling different time formats and managing time zones was challenging, especially with user inputs from multiple regions.
- **State Synchronization:** Managing global state across multiple components (like interviews, candidates, and interviewers) required careful handling to avoid data inconsistencies.
- **Error Handling & User Feedback:** Providing meaningful notifications for different scenarios (e.g., conflicting interview schedules, successful scheduling) required careful attention to ensure smooth user interactions.



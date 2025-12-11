import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Home from "./Pages/Home";
import InterviewPrep from "./Pages/InterviewPrep";
import Internship from "./Pages/Internship";
import Notes from "./Pages/Notes";
import About from "./Pages/About";
import Jobs from "./Pages/Jobs";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/internships" element={<Internship />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Chatbot />
    </div>
  );
}

export default App;
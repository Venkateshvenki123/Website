import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import InterviewPrep from './components/InterviewPrep';
import Notes from './components/Notes';
import Projects from './components/Projects';
import Internship from './components/Internship';
import Login from './components/Login';
import Register from './components/Register';
import NoteUpload from './components/NoteUpload';
import AuthTabs from './components/AuthTabs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<NoteUpload />} />
        <Route path="/auth" element={<AuthTabs />} />
      </Routes>
    </Router>
  );
}
export default App;


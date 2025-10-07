import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/interview-prep">Interview Prep</Link>
      <Link to="/notes">NotesViewer</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/internship">Internship</Link>
      <Link to="/upload">Upload Note</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}
export default Navbar;

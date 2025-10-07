import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notes() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/notes').then(res => setNotes(res.data));
  }, []);
  return (
    <div>
      <h2>All Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <a href={`http://localhost:5000/uploads/${note.filename}`} target="_blank" rel="noopener noreferrer">Download</a>
            <span>Uploaded by: {note.uploader?.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Notes;

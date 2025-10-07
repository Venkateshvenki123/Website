import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InternshipUpload() {
  const [internshipName, setInternshipName] = useState('');
  const [internships, setInternships] = useState([]);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingInternships, setLoadingInternships] = useState(true);

  // Fetch internships on component mount
  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = () => {
    setLoadingInternships(true);
    axios.get('http://localhost:5000/api/internships')
      .then(res => {
        setInternships(res.data);
        setLoadingInternships(false);
      })
      .catch(() => {
        setError('Failed to load internships.');
        setLoadingInternships(false);
      });
  };

  const handleChange = (e) => {
    setInternshipName(e.target.value);
    setError('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!internshipName.trim()) {
      setError('Internship name is required.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/internships/upload', { name: internshipName });
      setSuccessMsg('Internship uploaded successfully!');
      setInternshipName('');
      fetchInternships(); // Refresh list after upload
    } catch {
      setError('Failed to upload internship. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: '3rem auto',
      fontFamily: "'Inter', sans-serif",
      color: '#2d3748',
      padding: 16,
      textAlign: 'center',
    }}>
      <h1 style={{ fontWeight: 800, color: '#667eea', marginBottom: 24 }}>
        Upload Internship Name
      </h1>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          type="text"
          placeholder="Enter internship name"
          value={internshipName}
          onChange={handleChange}
          disabled={loading}
          style={{
            padding: 12,
            fontSize: 16,
            borderRadius: 20,
            border: error ? '2px solid #e53e3e' : '2px solid #cbd5e0',
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'border-color 0.3s ease',
          }}
        />
        {error && <p style={{ color: '#e53e3e', fontWeight: 600 }}>{error}</p>}
        {successMsg && <p style={{ color: '#38a169', fontWeight: 600 }}>{successMsg}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 16,
            fontSize: 18,
            fontWeight: 700,
            color: 'white',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            border: 'none',
            borderRadius: 30,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {/* View Existing Internships */}
      <section style={{ marginTop: 40, textAlign: 'left' }}>
        <h2 style={{ color: '#667eea', fontWeight: 700, marginBottom: 20 }}>
          Already Uploaded Internships
        </h2>

        {loadingInternships ? (
          <p>Loading internships...</p>
        ) : internships.length === 0 ? (
          <p>No internships uploaded yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {internships.map(({ _id, name }) => (
              <li
                key={_id}
                style={{
                  background: '#f7fafc',
                  marginBottom: 12,
                  padding: '10px 20px',
                  borderRadius: 12,
                  boxShadow: '0 4px 12px rgba(102,126,234,0.1)',
                  fontWeight: 600,
                  color: '#2d3748'
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default InternshipUpload;

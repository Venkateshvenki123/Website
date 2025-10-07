import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    demoUrl: '',
    sourceCodeUrl: '',
  });
  const [file, setFile] = useState(null);

  // Fetch projects when component mounts or after upload success
  const fetchProjects = () => {
    setLoadingProjects(true);
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        setProjects(res.data);
        setLoadingProjects(false);
      })
      .catch(() => {
        setLoadingProjects(false);
        setUploadError('Failed to load projects.');
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(s => ({ ...s, [name]: value }));
    setUploadError('');
    setUploadSuccess('');
  };

  // File input change handler
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadError('');
    setUploadSuccess('');
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.description.trim()) {
      setUploadError('Title and Description are required.');
      return;
    }

    setUploading(true);

    try {
      const uploadPayload = new FormData();
      uploadPayload.append('title', formData.title);
      uploadPayload.append('description', formData.description);
      uploadPayload.append('techStack', formData.techStack);
      uploadPayload.append('demoUrl', formData.demoUrl);
      uploadPayload.append('sourceCodeUrl', formData.sourceCodeUrl);
      if (file) uploadPayload.append('projectFile', file);

      await axios.post('http://localhost:5000/api/projects/upload', uploadPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setUploadSuccess('Project uploaded successfully!');
      setFormData({
        title: '',
        description: '',
        techStack: '',
        demoUrl: '',
        sourceCodeUrl: '',
      });
      setFile(null);

      // Refresh projects after upload
      fetchProjects();

    } catch {
      setUploadError('Failed to upload project. Please try again.');
    }

    setUploading(false);
  };

  return (
    <div className="projects-page-container">

      {/* Existing Projects */}
      <section className="projects-gallery">
        <h1>Existing Projects</h1>
        {loadingProjects ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects uploaded yet.</p>
        ) : (
          <div className="projects-grid">
            {projects.map(({ _id, title, description, techStack, demoUrl, sourceCodeUrl }) => (
              <div key={_id} className="project-card">
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="tech-stack">
                  {techStack && techStack.split(',').map((tech) => (
                    <span key={tech.trim()} className="tech-tag">{tech.trim()}</span>
                  ))}
                </div>
                <div className="project-links">
                  {demoUrl && <a href={demoUrl} target="_blank" rel="noreferrer" className="btn-link">Demo</a>}
                  {sourceCodeUrl && <a href={sourceCodeUrl} target="_blank" rel="noreferrer" className="btn-link">Source</a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Project Upload Form */}
      <section className="project-upload-section">
        <h2>Upload Your Project</h2>
        <form onSubmit={handleSubmit} className="project-upload-form" encType="multipart/form-data">

          <label>
            Title*:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={uploading}
              required
            />
          </label>

          <label>
            Description*:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={uploading}
              required
              rows={4}
            />
          </label>

          <label>
            Technologies (comma separated):
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleInputChange}
              disabled={uploading}
              placeholder="React, Node.js, MongoDB"
            />
          </label>

          <label>
            Demo URL:
            <input
              type="url"
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleInputChange}
              disabled={uploading}
              placeholder="https://yourprojectdemo.com"
            />
          </label>

          <label>
            Source Code URL:
            <input
              type="url"
              name="sourceCodeUrl"
              value={formData.sourceCodeUrl}
              onChange={handleInputChange}
              disabled={uploading}
              placeholder="https://github.com/username/project"
            />
          </label>

          <label>
            Upload Project File:
            <input
              type="file"
              onChange={handleFileChange}
              disabled={uploading}
              accept=".zip,.rar,.7z,.tar,.gz,.pdf,.doc,.docx"
            />
          </label>

          {uploadError && <p className="upload-error">{uploadError}</p>}
          {uploadSuccess && <p className="upload-success">{uploadSuccess}</p>}

          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Project'}
          </button>
        </form>
      </section>

    </div>
  );
}

export default Projects;

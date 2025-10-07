import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './NoteUpload.css';

function NoteUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    difficulty: '',
    company: '',
    isPublic: true
  });

  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadComplete, setUploadComplete] = useState(false);

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const categories = [
    'Data Structures',
    'Algorithms',
    'System Design',
    'Database',
    'Behavioral',
    'Frontend',
    'Backend',
    'Mobile Development',
    'DevOps',
    'Machine Learning',
    'Other'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    // Add animation classes after component mounts
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * 200);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (files.length === 0) {
      newErrors.files = 'At least one file is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      difficulty: '',
      company: '',
      isPublic: true
    });
    setFiles([]);
    setUploadProgress(0);
    setUploadComplete(false);
    setErrors({});
  };

  if (uploadComplete) {
    return (
      <div className="upload-page">
        <div className="upload-background">
          <div className="floating-shapes-upload">
            <div className="shape-upload shape-1"></div>
            <div className="shape-upload shape-2"></div>
            <div className="shape-upload shape-3"></div>
          </div>
        </div>
        
        <div className="upload-container">
          <div className="success-container animate-on-load">
            <div className="success-icon">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h1 className="success-title">Upload Successful! 🎉</h1>
            <p className="success-message">
              Your notes have been uploaded successfully and are now available to the community.
            </p>
            <div className="success-buttons">
              <button onClick={resetForm} className="btn-upload-another">
                Upload Another Note
              </button>
              <Link to="/notes" className="btn-view-notes">
                View All Notes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-page">
      {/* Background Elements */}
      <div className="upload-background">
        <div className="floating-shapes-upload">
          <div className="shape-upload shape-1"></div>
          <div className="shape-upload shape-2"></div>
          <div className="shape-upload shape-3"></div>
        </div>
      </div>

      <div className="upload-container">
        {/* Header Section */}
        <div className="upload-header animate-on-load">
          <h1 className="upload-title">
            Share Your <span className="accent-text">Knowledge</span>
          </h1>
          <p className="upload-subtitle">
            Upload your interview preparation notes and help thousands of aspiring professionals
          </p>
        </div>

        {/* Main Upload Form */}
        <div className="upload-form-container animate-on-load">
          <form onSubmit={handleSubmit} className="upload-form">
            {/* Basic Information Section */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">📝</span>
                Basic Information
              </h2>
              
              <div className="form-grid">
                {/* Title */}
                <div className="form-group full-width">
                  <label htmlFor="title" className="form-label">Note Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`form-input ${errors.title ? 'error' : ''}`}
                    placeholder="e.g., Binary Tree Traversal Questions"
                  />
                  {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                {/* Description */}
                <div className="form-group full-width">
                  <label htmlFor="description" className="form-label">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`form-textarea ${errors.description ? 'error' : ''}`}
                    placeholder="Provide a detailed description of your notes..."
                    rows={4}
                  />
                  {errors.description && <span className="error-message">{errors.description}</span>}
                </div>

                {/* Category */}
                <div className="form-group">
                  <label htmlFor="category" className="form-label">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`form-select ${errors.category ? 'error' : ''}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && <span className="error-message">{errors.category}</span>}
                </div>

                {/* Difficulty */}
                <div className="form-group">
                  <label htmlFor="difficulty" className="form-label">Difficulty Level</label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select difficulty</option>
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div className="form-group">
                  <label htmlFor="tags" className="form-label">Tags</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., arrays, sorting, recursion"
                  />
                  <small className="form-hint">Separate tags with commas</small>
                </div>

                {/* Company */}
                <div className="form-group">
                  <label htmlFor="company" className="form-label">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., Google, Amazon, Microsoft"
                  />
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">📎</span>
                Upload Files
              </h2>
              
              {/* Drop Zone */}
              <div
                ref={dropZoneRef}
                className={`drop-zone ${dragActive ? 'drag-active' : ''} ${errors.files ? 'error' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="file-input"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                />
                
                <div className="drop-zone-content">
                  <div className="upload-icon">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                  </div>
                  <h3 className="drop-zone-title">
                    {dragActive ? 'Drop your files here' : 'Drag & drop files here'}
                  </h3>
                  <p className="drop-zone-subtitle">
                    or <span className="browse-link">browse files</span>
                  </p>
                  <p className="file-formats">
                    Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, GIF
                  </p>
                </div>
              </div>
              {errors.files && <span className="error-message">{errors.files}</span>}

              {/* File List */}
              {files.length > 0 && (
                <div className="file-list">
                  <h3 className="file-list-title">Uploaded Files ({files.length})</h3>
                  {files.map(file => (
                    <div key={file.id} className="file-item">
                      <div className="file-info">
                        <div className="file-icon">
                          {file.type.startsWith('image/') ? (
                            <img src={file.preview} alt={file.name} className="file-preview" />
                          ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                          )}
                        </div>
                        <div className="file-details">
                          <p className="file-name">{file.name}</p>
                          <p className="file-size">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="remove-file-btn"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Settings Section */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">⚙️</span>
                Settings
              </h2>
              
              <div className="settings-group">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <label htmlFor="isPublic" className="checkbox-label">
                    <span className="checkbox-title">Make this note public</span>
                    <span className="checkbox-description">
                      Allow other users to view and download your notes
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="upload-progress-section">
                <div className="progress-info">
                  <span className="progress-text">Uploading... {uploadProgress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className={`btn-submit ${isUploading ? 'uploading' : ''}`}
              >
                {isUploading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <span>Upload Notes</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NoteUpload;

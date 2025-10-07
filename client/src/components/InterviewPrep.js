import React, { useState, useEffect } from 'react';
import './InterviewPrep.css';

const categories = [
  'Data Structures',
  'Algorithms',
  'System Design',
  'Behavioral',
  'Databases',
  'Networking',
  'Operating Systems',
  'Coding Challenges',
  'Soft Skills',
  'Company-specific'
];

const popularQuestions = [
  {
    id: 1,
    title: 'Explain the time complexity of QuickSort',
    category: 'Algorithms',
    difficulty: 'Intermediate'
  },
  {
    id: 2,
    title: 'Design a URL shortening service',
    category: 'System Design',
    difficulty: 'Advanced'
  },
  {
    id: 3,
    title: 'Tell me about a challenging team conflict you resolved',
    category: 'Behavioral',
    difficulty: 'Beginner'
  },
  {
    id: 4,
    title: 'Explain ACID properties in databases',
    category: 'Databases',
    difficulty: 'Intermediate'
  }
];

function InterviewPrep() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState(popularQuestions);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    let filtered = popularQuestions;

    if (activeCategory) {
      filtered = filtered.filter(q => q.category === activeCategory);
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  }, [searchTerm, activeCategory]);

  return (
    <div className="interview-prep-page">
      <header className="prep-header">
        <h1 className="page-title">Interview Preparation</h1>
        <p className="page-description">
          Browse or search interview questions by category, difficulty, or popular topics.
        </p>
      </header>

      <div className="prep-controls">
        <input
          type="search"
          placeholder="Search questions..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search interview questions"
        />

        <div className="category-filters">
          <button
            className={`category-btn ${activeCategory === null ? 'active' : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="question-list-section" aria-live="polite">
        {filteredQuestions.length === 0 ? (
          <p className="no-results-text">No questions found. Try a different search or filter.</p>
        ) : (
          <ul className="question-list">
            {filteredQuestions.map(({ id, title, category, difficulty }) => (
              <li key={id} className="question-card">
                <h3 className="question-title">{title}</h3>
                <div className="question-meta">
                  <span className="question-category">{category}</span>
                  <span className={`difficulty difficulty-${difficulty.toLowerCase()}`}>
                    {difficulty}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default InterviewPrep;

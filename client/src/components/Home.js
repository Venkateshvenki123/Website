import React, { useEffect } from 'react';
import './Home.css';

function Home() {
  useEffect(() => {
    // Add animation classes after component mounts
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * 200);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="max-w-7xl mx-auto text-center px-4 hero-content">
          <h1 className="hero-title animate-on-scroll">
            Ace Your Interviews with
            <span className="hero-accent"> PrepHub</span>
          </h1>
          <p className="hero-subtitle animate-on-scroll">
            Access comprehensive interview preparation materials, share your notes, and connect with a community of aspiring professionals.
          </p>
          <div className="hero-buttons animate-on-scroll">
            <button className="btn-primary-custom">
              <span>Explore Notes</span>
              <div className="btn-glow"></div>
            </button>
            <button className="btn-secondary-custom">
              <span>Join Community</span>
            </button>
          </div>
        </div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title animate-on-scroll">
            Why Choose PrepHub?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card-custom animate-on-scroll">
              <div className="feature-icon-custom">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Comprehensive Notes</h3>
              <p className="feature-description">Access thousands of interview preparation notes shared by successful candidates.</p>
            </div>

            <div className="feature-card-custom animate-on-scroll">
              <div className="feature-icon-custom">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Community Driven</h3>
              <p className="feature-description">Learn from peers and share your knowledge with the community.</p>
            </div>

            <div className="feature-card-custom animate-on-scroll">
              <div className="feature-icon-custom">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Secure Upload</h3>
              <p className="feature-description">Share your notes securely and help others in their interview journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Notes Section */}
      <section className="notes-section">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title-dark animate-on-scroll">
            Popular Interview Notes
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="note-card-custom animate-on-scroll">
              <div className="note-card-inner">
                <div className="note-category">Programming</div>
                <h3 className="note-title">Data Structures</h3>
                <p className="note-description">Comprehensive notes on arrays, linked lists, trees, and graphs.</p>
                <div className="note-meta">
                  <span className="note-author">By: John Doe</span>
                  <span className="note-date">2 days ago</span>
                </div>
                <div className="note-stats">
                  <span className="stat">👍 234</span>
                  <span className="stat">💬 45</span>
                  <span className="stat">⭐ 4.8</span>
                </div>
              </div>
            </div>

            <div className="note-card-custom animate-on-scroll">
              <div className="note-card-inner">
                <div className="note-category">System Design</div>
                <h3 className="note-title">System Design</h3>
                <p className="note-description">Complete guide to system design interview questions and patterns.</p>
                <div className="note-meta">
                  <span className="note-author">By: Sarah Chen</span>
                  <span className="note-date">1 week ago</span>
                </div>
                <div className="note-stats">
                  <span className="stat">👍 189</span>
                  <span className="stat">💬 32</span>
                  <span className="stat">⭐ 4.9</span>
                </div>
              </div>
            </div>

            <div className="note-card-custom animate-on-scroll">
              <div className="note-card-inner">
                <div className="note-category">Behavioral</div>
                <h3 className="note-title">Behavioral Questions</h3>
                <p className="note-description">STAR method and common behavioral interview questions.</p>
                <div className="note-meta">
                  <span className="note-author">By: Mike Johnson</span>
                  <span className="note-date">3 days ago</span>
                </div>
                <div className="note-stats">
                  <span className="stat">👍 156</span>
                  <span className="stat">💬 28</span>
                  <span className="stat">⭐ 4.7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-on-scroll">
            <button className="btn-view-all">
              View All Notes
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="upload-card animate-on-scroll">
            <h2 className="upload-title">
              Ready to Share Your Knowledge?
            </h2>
            <p className="upload-subtitle">
              Upload your interview preparation notes and help thousands of aspiring candidates.
            </p>
            <div className="upload-content">
              <div className="upload-icon">📚</div>
              <h3 className="upload-card-title">Upload Notes</h3>
              <p className="upload-card-description">Register now to start sharing your valuable notes with the community.</p>
              <div className="upload-buttons">
                <button className="btn-upload-primary">
                  Register Now
                </button>
                <button className="btn-upload-secondary">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
 <footer className="footer-custom">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-on-scroll">
              <h3 className="footer-logo">
                <span className="logo-icon">🚀</span>
                PrepHub
              </h3>
              <p className="footer-description">Your ultimate interview preparation platform.</p>
            </div>
            <div className="animate-on-scroll">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Home</a></li>
                <li><a href="#" className="footer-link">Interview Prep</a></li>
                <li><a href="#" className="footer-link">Notes</a></li>
                <li><a href="#" className="footer-link">Projects</a></li>
              </ul>
            </div>
            <div className="animate-on-scroll">
              <h4 className="footer-heading">Resources</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Internship</a></li>
                <li><a href="#" className="footer-link">Upload Notes</a></li>
                <li><a href="#" className="footer-link">Login</a></li>
                <li><a href="#" className="footer-link">Register</a></li>
              </ul>
            </div>
            <div className="animate-on-scroll">
              <h4 className="footer-heading">Contact</h4>
              <p className="footer-contact">Email: support@prephub.com</p>
              <p className="footer-contact">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© 2024 PrepHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

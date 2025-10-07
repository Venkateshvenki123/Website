import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/interview-prep', label: 'Interview Prep' },
    { path: '/notes', label: 'Notes' },
    { path: '/projects', label: 'Projects' },
    { path: '/internship', label: 'Internship' },
    { path: '/upload', label: 'Upload Notes' }
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo Section */}
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <div className="logo-icon">🚀</div>
            <span className="logo-text">PrepHub</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="nav-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="nav-auth">
            <Link to="/login" className="btn-login">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 0a4 4 0 01-4 4H3a2 2 0 01-2-2V7a2 2 0 012-2h1m9 0a4 4 0 014 4v6a4 4 0 01-4 4H11"></path>
              </svg>
              Login
            </Link>
            <Link to="/register" className="btn-register">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Register
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-toggle ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            {/* Mobile Navigation Links */}
            <div className="mobile-nav-links">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={closeMenu}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="mobile-auth">
              <Link 
                to="/login" 
                className="mobile-btn-login"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="mobile-btn-register"
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>

            {/* Mobile Menu Footer */}
            <div className="mobile-menu-footer">
              <p>Ready to ace your interviews? 🎯</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
    </>
  );
}

export default Navbar;

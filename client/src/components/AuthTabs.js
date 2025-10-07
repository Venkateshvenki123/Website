import React, { useState } from 'react';
import './AuthTabs.css';

function AuthTabs() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: '',
    adminUsername: '',
    adminPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
    if (errors[name]) setErrors(errs => ({ ...errs, [name]: '' }));
  };

  const validateLogin = () => {
    const errs = {};
    if (!formData.loginEmail) errs.loginEmail = 'Email required';
    if (!formData.loginPassword) errs.loginPassword = 'Password required';
    return errs;
  };

  const validateRegister = () => {
    const errs = {};
    if (!formData.registerEmail) errs.registerEmail = 'Email required';
    if (!formData.registerPassword) errs.registerPassword = 'Password required';
    if (formData.registerPassword !== formData.registerConfirmPassword) errs.registerConfirmPassword = 'Passwords do not match';
    return errs;
  };

  const validateAdmin = () => {
    const errs = {};
    if (!formData.adminUsername) errs.adminUsername = 'Username required';
    if (!formData.adminPassword) errs.adminPassword = 'Password required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let errs = {};
    if (activeTab === 'login') errs = validateLogin();
    else if (activeTab === 'register') errs = validateRegister();
    else if (activeTab === 'admin') errs = validateAdmin();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} successful!`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-tabs-container">
      <nav className="tab-header">
        {['login', 'register', 'admin'].map(tab => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              setErrors({});
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <form onSubmit={handleSubmit} className="auth-form" noValidate>

        {activeTab === 'login' && (
          <>
            <label>
              Email
              <input
                type="email"
                name="loginEmail"
                value={formData.loginEmail}
                onChange={handleChange}
                disabled={loading}
                className={errors.loginEmail ? 'error' : ''}
                placeholder="you@example.com"
              />
              {errors.loginEmail && <span className="error-msg">{errors.loginEmail}</span>}
            </label>

            <label>
              Password
              <input
                type="password"
                name="loginPassword"
                value={formData.loginPassword}
                onChange={handleChange}
                disabled={loading}
                className={errors.loginPassword ? 'error' : ''}
                placeholder="Your password"
              />
              {errors.loginPassword && <span className="error-msg">{errors.loginPassword}</span>}
            </label>
          </>
        )}

        {activeTab === 'register' && (
          <>
            <label>
              Email
              <input
                type="email"
                name="registerEmail"
                value={formData.registerEmail}
                onChange={handleChange}
                disabled={loading}
                className={errors.registerEmail ? 'error' : ''}
                placeholder="you@example.com"
              />
              {errors.registerEmail && <span className="error-msg">{errors.registerEmail}</span>}
            </label>

            <label>
              Password
              <input
                type="password"
                name="registerPassword"
                value={formData.registerPassword}
                onChange={handleChange}
                disabled={loading}
                className={errors.registerPassword ? 'error' : ''}
                placeholder="Create password"
              />
              {errors.registerPassword && <span className="error-msg">{errors.registerPassword}</span>}
            </label>

            <label>
              Confirm Password
              <input
                type="password"
                name="registerConfirmPassword"
                value={formData.registerConfirmPassword}
                onChange={handleChange}
                disabled={loading}
                className={errors.registerConfirmPassword ? 'error' : ''}
                placeholder="Confirm password"
              />
              {errors.registerConfirmPassword && <span className="error-msg">{errors.registerConfirmPassword}</span>}
            </label>
          </>
        )}

        {activeTab === 'admin' && (
          <>
            <label>
              Admin Username
              <input
                type="text"
                name="adminUsername"
                value={formData.adminUsername}
                onChange={handleChange}
                disabled={loading}
                className={errors.adminUsername ? 'error' : ''}
                placeholder="Admin username"
              />
              {errors.adminUsername && <span className="error-msg">{errors.adminUsername}</span>}
            </label>

            <label>
              Password
              <input
                type="password"
                name="adminPassword"
                value={formData.adminPassword}
                onChange={handleChange}
                disabled={loading}
                className={errors.adminPassword ? 'error' : ''}
                placeholder="Admin password"
              />
              {errors.adminPassword && <span className="error-msg">{errors.adminPassword}</span>}
            </label>
          </>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Processing...' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </button>
      </form>
    </div>
  );
}

export default AuthTabs;

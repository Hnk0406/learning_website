import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

// src/components/Navbar.jsx
const navItems = [
  { label: 'Courses', path: '/courses' },
  { label: 'Super Batch', path: '/super-batch' },
  { label: 'Focus Mode', path: '/focus-mode' },
  { label: 'AI Assistant', path: '/ai-assistant' } 
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.style.background = '#000000';
      document.body.style.color = '#ffffff';
    }
  }, []);

  // Hide navbar on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.style.background = '#000000';
      document.body.style.color = '#ffffff';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.style.background = '';
      document.body.style.color = '';
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    
    // Redirect to login page
    navigate('/login');
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  return (
    <header
      style={{
        height: 'var(--nav-height)',
        borderBottom: `1px solid ${isDarkMode ? '#333' : 'var(--border-subtle)'}`,
        background: isDarkMode ? '#000000' : '#ffffff',
        boxShadow: '0 1px 0 rgba(15, 23, 42, 0.02)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        transition: 'all 0.3s ease'
      }}
    >
      <div
        className="screen-max-width"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32
        }}
      >
        {/* Logo */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          <img
            src="/assets/extracted/logo-upanishad.png"
            alt="UPANISHAD logo"
            style={{ 
              height: 40,
              filter: isDarkMode ? 'invert(1) brightness(2)' : 'none'
            }}
          />
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: isDarkMode ? '#ffffff' : 'var(--primary)',
                transition: 'color 0.3s ease'
              }}
            >
              UPANISHAD
            </div>
            <div
              style={{
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: isDarkMode ? '#ffffff' : 'var(--text-muted)',
                transition: 'color 0.3s ease'
              }}
            >
              Learning Platform
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                fontSize: 13,
                color: isDarkMode ? '#ffffff' : (isActive ? 'var(--primary)' : 'var(--text-muted)'),
                fontWeight: isActive ? 600 : 500,
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                background: isDarkMode ? (isActive ? '#333' : 'transparent') : (isActive ? 'var(--primary-light)' : 'transparent'),
                border: isDarkMode && isActive ? '1px solid #fff' : 'none',
                transition: 'all 0.3s ease'
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: `1px solid ${isDarkMode ? '#fff' : 'var(--border-subtle)'}`,
              background: isDarkMode ? '#000000' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 16,
              color: isDarkMode ? '#ffffff' : '#000000',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? '#333' : '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isDarkMode ? '#000000' : '#ffffff';
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Profile Button */}
          <button
            type="button"
            onClick={handleEditProfile}
            style={{
              border: `1px solid ${isDarkMode ? '#fff' : 'transparent'}`,
              background: isDarkMode ? '#000000' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? '#333' : 'var(--background-light)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isDarkMode ? '#000000' : 'transparent';
            }}
          >
            <img
              src="/assets/extracted/icon-user.svg"
              alt="User"
              style={{ 
                width: 24, 
                height: 24,
                filter: isDarkMode ? 'invert(1)' : 'none'
              }}
            />
            <span style={{ 
              fontSize: 13, 
              color: isDarkMode ? '#ffffff' : 'var(--text-dark)',
              fontWeight: 500
            }}>
              {currentUser.username || 'User'}
            </span>
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: '6px 12px',
              border: `1px solid ${isDarkMode ? '#fff' : 'var(--border-subtle)'}`,
              background: isDarkMode ? '#000000' : 'transparent',
              color: isDarkMode ? '#ffffff' : 'var(--text-muted)',
              fontSize: 12,
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? '#333' : '#fef2f2';
              e.target.style.color = isDarkMode ? '#ffffff' : '#dc2626';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isDarkMode ? '#000000' : 'transparent';
              e.target.style.color = isDarkMode ? '#ffffff' : 'var(--text-muted)';
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
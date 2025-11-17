import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← Make sure this import exists

function ProofHome() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // ADD THIS FUNCTION - Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  // ADD THIS FUNCTION - Real API login
  const handleLogin = async () => {
  if (!formData.username.trim() || !formData.password.trim()) {
    setError('Please enter both username and password');
    return;
  }

  try {
    setError('');
    
    // MAKE SURE THIS URL IS CORRECT - should be port 5000
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,  // Use 'username' not 'email'
        password: formData.password
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Store authentication data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      console.log('Login successful:', data.user);
      navigate('/dashboard');
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('Network error. Please check if backend is running.');
  }
};

  // ADD THIS FUNCTION - Handle register navigation
  const handleRegister = () => {
    navigate('/register');
  };

  // ADD THIS FUNCTION - Enter key support
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--background-light)',
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* Left brand panel */}
      <div
        style={{
          flex: 1,
          padding: '0 8vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <img
            src="/assets/extracted/logo-upanishad.png"
            alt="UPANISHAD logo"
            style={{ height: 72, marginRight: 16 }}
          />
          <div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: 'var(--primary)'
              }}
            >
              UPANISHAD
            </div>
            <div
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--text-muted)'
              }}
            >
              Learning Platform
            </div>
          </div>
        </div>

        <p
          style={{
            maxWidth: 420,
            marginTop: 32,
            fontSize: 14,
            lineHeight: 1.7,
            color: 'var(--text-muted)'
          }}
        >
          Empowering learners with knowledge and wisdom.
        </p>
      </div>

      {/* Right login panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10vw'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 380,
            background: 'rgba(255,255,255,0.9)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.06)',
            padding: 32
          }}
        >
          <h2
            style={{
              margin: 0,
              marginBottom: 24,
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--text-dark)'
            }}
          >
            Login
          </h2>

          {/* ADD ERROR DISPLAY */}
          {error && (
            <div
              style={{
                background: '#fee2e2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                fontSize: 12,
                marginBottom: 16
              }}
            >
              {error}
            </div>
          )}

          <label style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Username
            <input
              type="text"
              name="username" // ← ADD name attribute
              value={formData.username} // ← ADD value binding
              onChange={handleInputChange} // ← ADD onChange
              onKeyPress={handleKeyPress} // ← ADD Enter key support
              style={{
                marginTop: 6,
                marginBottom: 16,
                width: '100%',
                height: 44,
                borderRadius: 'var(--radius-md)',
                border: error ? '1px solid #dc2626' : '1px solid var(--border-subtle)',
                background: '#f8f8fb',
                padding: '0 14px',
                fontSize: 13,
                outline: 'none'
              }}
            />
          </label>

          <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block' }}>
            Password
            <div
              style={{
                marginTop: 6,
                marginBottom: 16,
                position: 'relative'
              }}
            >
              <input
                type="password"
                name="password" // ← ADD name attribute
                value={formData.password} // ← ADD value binding
                onChange={handleInputChange} // ← ADD onChange
                onKeyPress={handleKeyPress} // ← ADD Enter key support
                style={{
                  width: '100%',
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  border: error ? '1px solid #dc2626' : '1px solid var(--border-subtle)',
                  background: '#f8f8fb',
                  padding: '0 40px 0 14px',
                  fontSize: 13,
                  outline: 'none'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 11,
                  color: 'var(--text-muted)'
                }}
              >
                👁
              </span>
            </div>
          </label>

          {/* UPDATE LOGIN BUTTON */}
          <button
            type="button"
            onClick={handleLogin} // ← CHANGE to handleLogin
            style={{
              width: '100%',
              height: 44,
              borderRadius: 'var(--radius-md)',
              border: 'none',
              marginTop: 4,
              background: 'var(--primary)',
              color: 'var(--text-light)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Login
          </button>

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
              color: 'var(--text-muted)'
            }}
          >
            <span>Forgot password?</span>
            <span>
              Don&apos;t have an account?{' '}
              <span 
                style={{ color: 'var(--primary)', fontWeight: 500, cursor: 'pointer' }}
                onClick={handleRegister} // ← CHANGE to handleRegister
              >
                Register
              </span>
            </span>
          </div>

          {/* ADD DEMO CREDENTIALS HINT */}
          <div
            style={{
              marginTop: 24,
              padding: 12,
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: 'var(--radius-md)',
              fontSize: 11,
              color: '#0369a1'
            }}
          >
            <strong>Demo credentials:</strong><br />
            Username: admin | Password: password123<br />
            Username: user | Password: user123
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProofHome;
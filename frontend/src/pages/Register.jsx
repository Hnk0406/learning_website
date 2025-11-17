import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,      // Use 'name' not 'fullName'
          email: formData.email,
          username: formData.username,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background-light)',
        fontFamily: 'var(--font-sans)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          padding: 32
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 24, fontSize: 20 }}>Create account</h2>
        
        {/* Error Display */}
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Full name', field: 'fullName', type: 'text' },
            { label: 'Email', field: 'email', type: 'email' },
            { label: 'Username', field: 'username', type: 'text' },
            { label: 'Password', field: 'password', type: 'password' }
          ].map((item) => (
            <label key={item.field} style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {item.label}
              <input
                type={item.type}
                value={formData[item.field]}
                onChange={(e) => handleInputChange(e, item.field)}
                style={{
                  marginTop: 6,
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
          ))}
        </div>
        
        {/* Connect the button to handleRegister */}
        <button
          type="button"
          onClick={handleRegister}
          style={{
            marginTop: 20,
            width: '100%',
            height: 44,
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: 'var(--primary)',
            color: 'var(--text-light)',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          Register
        </button>
        
        <p style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
          Already have an account? <span 
            style={{ color: 'var(--primary)', fontWeight: 500, cursor: 'pointer' }}
            onClick={handleLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
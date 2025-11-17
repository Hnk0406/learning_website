import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    bio: '',
    phone: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Load current user data on component mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setFormData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      username: currentUser.username || '',
      bio: currentUser.bio || '',
      phone: currentUser.phone || '',
      location: currentUser.location || ''
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (message) setMessage('');
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // For now, update localStorage (replace with API call later)
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const updatedUser = {
        ...currentUser,
        ...formData
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      setMessage('Profile updated successfully!');
      
      // Show success message for 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <Navbar />
      <main className="screen-max-width" style={{ padding: '24px 16px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: '8px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 16,
              color: 'var(--text-muted)'
            }}
          >
            ←
          </button>
          <h1 style={{ fontSize: 18, margin: 0 }}>Edit Profile</h1>
        </div>

        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            background: '#ffffff',
            boxShadow: 'var(--shadow-card)',
            padding: 24,
            maxWidth: 600
          }}
        >
          {/* Success/Error Messages */}
          {message && (
            <div
              style={{
                background: '#dcfce7',
                border: '1px solid #bbf7d0',
                color: '#166534',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                fontSize: 12,
                marginBottom: 16
              }}
            >
              {message}
            </div>
          )}

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

          {/* Profile Header */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 32, alignItems: 'center' }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: '#e5edff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 600,
                color: 'var(--primary)',
                flexShrink: 0
              }}
            >
              {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                {formData.name || 'User Name'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {formData.email || 'user@example.com'}
              </div>
              <button
                type="button"
                style={{
                  marginTop: 8,
                  padding: '6px 12px',
                  border: '1px solid var(--border-subtle)',
                  background: 'transparent',
                  fontSize: 11,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer'
                }}
              >
                Change Avatar
              </button>
            </div>
          </div>

          {/* Edit Form */}
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { label: 'Full Name', name: 'name', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Username', name: 'username', type: 'text' },
              { label: 'Bio', name: 'bio', type: 'textarea' },
              { label: 'Phone', name: 'phone', type: 'tel' },
              { label: 'Location', name: 'location', type: 'text' }
            ].map((field) => (
              <label key={field.name} style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {field.label}
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    rows={3}
                    style={{
                      marginTop: 6,
                      width: '100%',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      background: '#f8f8fb',
                      padding: '12px 14px',
                      fontSize: 13,
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    style={{
                      marginTop: 6,
                      width: '100%',
                      height: 44,
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      background: '#f8f8fb',
                      padding: '0 14px',
                      fontSize: 13,
                      outline: 'none'
                    }}
                  />
                )}
              </label>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: '#ffffff',
                color: 'var(--text-dark)',
                fontSize: 13,
                cursor: 'pointer',
                flex: 1
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: loading ? '#ccc' : 'var(--primary)',
                color: '#ffffff',
                fontSize: 13,
                fontWeight: 500,
                cursor: loading ? 'not-allowed' : 'pointer',
                flex: 1,
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
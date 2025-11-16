import React from 'react';
import Navbar from '../components/Navbar.jsx';

export default function EditProfile() {
  return (
    <div>
      <Navbar />
      <main className="screen-max-width" style={{ padding: '24px 16px 40px' }}>
        <h1 style={{ fontSize: 18, marginBottom: 16 }}>Edit Profile</h1>
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            background: '#ffffff',
            boxShadow: 'var(--shadow-card)',
            padding: 24,
            maxWidth: 600
          }}
        >
          <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: '#e5edff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 600,
                color: 'var(--primary)'
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Aryabhatta</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>aryabhatta@gmail.com</div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            {['Full name', 'Email', 'Username'].map((label) => (
              <label key={label} style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {label}
                <input
                  type="text"
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
              </label>
            ))}
          </div>

          <button
            type="button"
            style={{
              marginTop: 24,
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'var(--primary)',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}

import React from 'react';

export default function Register() {
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Full name', 'Email', 'Username', 'Password'].map((label) => (
            <label key={label} style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {label}
              <input
                type={label === 'Password' ? 'password' : 'text'}
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
          Already have an account? <span style={{ color: 'var(--primary)', fontWeight: 500 }}>Login</span>
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom'; // ← ADD THIS IMPORT

function ProofHome() {
  const navigate = useNavigate(); // ← ADD THIS HOOK

  const handleLogin = () => {
    // For now, just navigate to dashboard
    // Later you'll add actual authentication logic here
    navigate('/dashboard');
  };

  const handleRegister = () => {
    navigate('/register');
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
            src="/assets/extracted/logo.png"
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

          <label style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Username
            <input
              type="text"
              style={{
                marginTop: 6,
                marginBottom: 16,
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
                style={{
                  width: '100%',
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
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

          {/* UPDATED LOGIN BUTTON */}
          <button
            type="button"
            onClick={handleLogin} // ← ADD THIS
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
            {/* UPDATED REGISTER LINK */}
            <span>
              Don&apos;t have an account?{' '}
              <span 
                style={{ color: 'var(--primary)', fontWeight: 500, cursor: 'pointer' }}
                onClick={handleRegister} // ← ADD THIS
              >
                Register
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProofHome;
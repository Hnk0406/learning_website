import React from 'react';
import Navbar from '../components/Navbar.jsx';

export default function CodingTests() {
  const tests = [
    ['DSA Mock Test', '60 min'],
    ['Web Dev Challenge', '45 min'],
    ['ML Coding Round', '90 min']
  ];

  return (
    <div>
      <Navbar />
      <main className="screen-max-width" style={{ padding: '24px 16px 40px' }}>
        <h1 style={{ fontSize: 18, marginBottom: 16 }}>Coding Tests</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 16
          }}
        >
          {tests.map(([name, duration]) => (
            <div
              key={name}
              style={{
                borderRadius: 'var(--radius-lg)',
                background: '#ffffff',
                boxShadow: 'var(--shadow-soft)',
                padding: 16,
                fontSize: 13
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{name}</div>
              <div style={{ color: 'var(--text-muted)' }}>Duration: {duration}</div>
              <button
                type="button"
                style={{
                  marginTop: 12,
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: 'var(--primary)',
                  color: '#ffffff',
                  fontSize: 12,
                  cursor: 'pointer'
                }}
              >
                Start Test
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

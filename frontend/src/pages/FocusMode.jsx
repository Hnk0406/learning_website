import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';

export default function FocusMode() {
  const [mode, setMode] = useState('Timer');

  return (
    <div>
      <Navbar />
      <main
        style={{
          minHeight: 'calc(100vh - var(--nav-height))',
          background: 'var(--gradient-focus-dark)',
          padding: '24px 16px 40px'
        }}
      >
        <div className="screen-max-width" style={{ color: '#ffffff' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 18 }}>Focus Mode</h1>
              <p style={{ margin: '4px 0 0', fontSize: 12, opacity: 0.8 }}>
                Stay focused with pomodoro timer, stopwatch and alarms.
              </p>
            </div>
            <div
              style={{
                display: 'inline-flex',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(15, 23, 42, 0.6)',
                padding: 4
              }}
            >
              {['Timer', 'Stopwatch', 'Alarms'].map((label) => {
                const isActive = mode === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setMode(label)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-pill)',
                      border: 'none',
                      background: isActive ? '#ffffff' : 'transparent',
                      color: isActive ? '#111827' : '#e5e7eb',
                      fontSize: 12,
                      cursor: 'pointer'
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </header>

          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr)',
              gap: 24,
              alignItems: 'stretch'
            }}
          >
            <div
              style={{
                borderRadius: 20,
                background: 'rgba(15, 23, 42, 0.8)',
                padding: 32,
                boxShadow: 'var(--shadow-elevated)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>{mode}</div>
              <div style={{ fontSize: 48, letterSpacing: '0.08em', marginBottom: 16 }}>25:00</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                <button
                  type="button"
                  style={{
                    padding: '10px 24px',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    background: '#22c55e',
                    color: '#0b1120',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Start
                </button>
                <button
                  type="button"
                  style={{
                    padding: '10px 24px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid rgba(148, 163, 184, 0.6)',
                    background: 'transparent',
                    color: '#e5e7eb',
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            <div
              style={{
                borderRadius: 20,
                background: 'rgba(15, 23, 42, 0.8)',
                padding: 24,
                boxShadow: 'var(--shadow-elevated)'
              }}
            >
              <h2 style={{ margin: '0 0 12px', fontSize: 14 }}>Session Stats</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12 }}>
                <li style={{ marginBottom: 6 }}>Today focus time: 2h 30m</li>
                <li style={{ marginBottom: 6 }}>Completed pomodoros: 5</li>
                <li style={{ marginBottom: 6 }}>Longest streak: 45 min</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

export default function Learn() {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--nav-height))' }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            background: '#f5f7fb'
          }}
        >
          <section
            style={{
              flex: '0 0 auto',
              borderRadius: 16,
              background: '#111827',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src="/assets/extracted/placeholder-video.svg"
              alt="Video player placeholder"
              style={{ width: '100%', maxWidth: 640, borderRadius: 16 }}
            />
          </section>

          <section
            style={{
              borderRadius: 'var(--radius-lg)',
              background: '#ffffff',
              padding: 16,
              boxShadow: 'var(--shadow-soft)'
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Introduction to HTML</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Course Progress</div>
            <div
              style={{
                marginTop: 8,
                height: 6,
                borderRadius: 999,
                background: '#e5e7eb',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: '40%',
                  height: '100%',
                  borderRadius: 999,
                  background: 'var(--primary)'
                }}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

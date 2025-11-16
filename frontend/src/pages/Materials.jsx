import React from 'react';
import Navbar from '../components/Navbar.jsx';

export default function Materials() {
  const rows = [
    ['Lecture Slides', 'PDF', '12 MB'],
    ['Practice Problems', 'PDF', '2 MB'],
    ['Cheat Sheet', 'PDF', '500 KB']
  ];

  return (
    <div>
      <Navbar />
      <main className="screen-max-width" style={{ padding: '24px 16px 40px' }}>
        <h1 style={{ fontSize: 18, marginBottom: 16 }}>Materials</h1>
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            background: '#ffffff',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden'
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 500 }}>Name</th>
                <th style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 500 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 500 }}>Size</th>
                <th style={{ textAlign: 'right', padding: '10px 16px', fontWeight: 500 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([name, type, size]) => (
                <tr key={name} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '10px 16px' }}>{name}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>{type}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>{size}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                    <button
                      type="button"
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        background: '#ffffff',
                        fontSize: 12,
                        cursor: 'pointer'
                      }}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

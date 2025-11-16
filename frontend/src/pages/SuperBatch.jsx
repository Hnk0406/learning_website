import React from 'react';
import Navbar from '../components/Navbar.jsx';

export default function SuperBatch() {
  const perks = [
    'Live doubt-solving with mentors',
    'Structured study plan & schedules',
    'Premium practice questions',
    'Dedicated discussion groups'
  ];

  return (
    <div>
      <Navbar />
      <main className="screen-max-width" style={{ padding: '24px 16px 40px' }}>
        <section
          style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--gradient-banner)',
            padding: 24,
            marginBottom: 24,
            color: '#ffffff',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Super Batch 2025</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>Premium preparation program with limited seats.</div>
          </div>
          <button
            type="button"
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: '#ffffff',
              color: 'var(--primary)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Apply Now
          </button>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 20
          }}
        >
          {perks.map((perk) => (
            <div
              key={perk}
              style={{
                borderRadius: 'var(--radius-lg)',
                background: '#ffffff',
                boxShadow: 'var(--shadow-soft)',
                padding: 20,
                fontSize: 13
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{perk}</div>
              <div style={{ color: 'var(--text-muted)' }}>Detailed description placeholder.</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

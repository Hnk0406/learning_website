import React from 'react';
import Navbar from '../components/Navbar.jsx';
import CourseCard from '../components/CourseCard.jsx';
import CategoryTabs from '../components/CategoryTabs.jsx';
import SearchBar from '../components/SearchBar.jsx';

export default function StyleGuide() {
  return (
    <div>
      <Navbar />
      <main className="screen-max-width" style={{ padding: '24px 16px 40px', fontSize: 13 }}>
        <h1 style={{ fontSize: 20, marginBottom: 16 }}>Style Guide</h1>

        {/* Buttons */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Buttons</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              type="button"
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: 'var(--primary)',
                color: '#ffffff',
                fontSize: 13,
                fontWeight: 500
              }}
            >
              Primary
            </button>
            <button
              type="button"
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: '#ffffff',
                color: 'var(--text-dark)',
                fontSize: 13
              }}
            >
              Secondary
            </button>
          </div>
        </section>

        {/* Inputs */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Inputs</h2>
          <label style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Label
            <input
              type="text"
              style={{
                marginTop: 6,
                width: 260,
                height: 44,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: '#f8f8fb',
                padding: '0 14px',
                fontSize: 13
              }}
            />
          </label>
        </section>

        {/* Cards & Tabs */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Cards & Tabs</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <CourseCard
              title="Sample Course"
              subtitle="Subtitle here"
              author="Instructor Name"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <CategoryTabs tabs={['All', 'DSA', 'Web']} active="All" onChange={() => {}} />
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Typography */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Typography</h2>
          <p style={{ fontSize: 20, fontWeight: 600 }}>Heading 1</p>
          <p style={{ fontSize: 16, fontWeight: 600 }}>Heading 2</p>
          <p style={{ fontSize: 14 }}>Body text</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Muted text</p>
        </section>

        {/* Gradients & spacing samples */}
        <section>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Gradients & Spacing</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div
              style={{
                width: 160,
                height: 64,
                borderRadius: 'var(--radius-lg)',
                background: 'var(--gradient-hero)'
              }}
            />
            <div
              style={{
                width: 160,
                height: 64,
                borderRadius: 'var(--radius-lg)',
                background: 'var(--gradient-banner)'
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

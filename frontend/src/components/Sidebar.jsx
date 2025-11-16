import React, { useState } from 'react';

const defaultSections = [
  {
    title: 'HTML Basics',
    lessons: ['Introduction to HTML', 'HTML Elements & Tags', 'Forms & Input Elements']
  },
  {
    title: 'CSS Fundamentals',
    lessons: ['Selectors & Cascade', 'Flexbox & Grid']
  },
  {
    title: 'JavaScript Essentials',
    lessons: ['Variables & Types', 'Functions & Scope']
  }
];

function Sidebar({ sections = defaultSections }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeLesson, setActiveLesson] = useState('Introduction to HTML');

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        background: '#ffffff',
        borderRight: '1px solid var(--border-subtle)',
        padding: 16,
        overflowY: 'auto'
      }}
    >
      <h3
        style={{
          margin: '0 0 12px',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--text-muted)'
        }}
      >
        Course Content
      </h3>

      {sections.map((section, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={section.title} style={{ marginBottom: 8 }}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: isOpen ? 'rgba(47, 85, 212, 0.06)' : 'transparent',
                color: 'var(--text-dark)',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              {section.title}
            </button>
            {isOpen && (
              <ul style={{ listStyle: 'none', padding: '4px 0 4px 8px', margin: 0 }}>
                {section.lessons.map((lesson) => {
                  const isActive = activeLesson === lesson;
                  return (
                    <li key={lesson} style={{ marginBottom: 2 }}>
                      <button
                        type="button"
                        onClick={() => setActiveLesson(lesson)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-md)',
                          border: 'none',
                          background: isActive ? '#f4f4f8' : 'transparent',
                          fontSize: 11,
                          color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                          cursor: 'pointer'
                        }}
                      >
                        {lesson}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </aside>
  );
}

export default Sidebar;

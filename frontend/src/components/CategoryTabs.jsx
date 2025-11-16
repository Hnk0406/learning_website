import React from 'react';

function CategoryTabs({ tabs, active, onChange }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        borderRadius: 'var(--radius-pill)',
        background: '#f3f4f6',
        padding: 4
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            style={{
              minWidth: 80,
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              fontSize: 11,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'var(--text-muted)',
              background: isActive ? 'var(--primary)' : 'transparent',
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;

import React from 'react';

function SearchBar({ placeholder = 'Search...', width = '100%' }) {
  return (
    <div
      style={{
        position: 'relative',
        width,
        maxWidth: 360
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <img
          src="/assets/extracted/icon-search.svg"
          alt="Search"
          style={{ width: 16, height: 16, opacity: 0.65 }}
        />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        style={{
          width: '100%',
          height: 40,
          padding: '0 12px 0 34px',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--border-subtle)',
          background: '#ffffff',
          fontSize: 13,
          outline: 'none'
        }}
      />
    </div>
  );
}

export default SearchBar;

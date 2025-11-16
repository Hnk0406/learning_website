import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Courses', path: '/courses' },
  { label: 'Super Batch', path: '/super-batch' },
  { label: 'Focus Mode', path: '/focus-mode' }
];

function Navbar() {
  const location = useLocation();

  return (
    <header
      style={{
        height: 'var(--nav-height)',
        borderBottom: '1px solid var(--border-subtle)',
        background: '#ffffff',
        boxShadow: '0 1px 0 rgba(15, 23, 42, 0.02)',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}
    >
      <div
        className="screen-max-width"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src="/assets/extracted/logo-upanishad.png"
            alt="UPANISHAD logo"
            style={{ height: 40 }}
          />
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'var(--primary)'
              }}
            >
              UPANISHAD
            </div>
            <div
              style={{
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--text-muted)'
              }}
            >
              Learning Platform
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                fontSize: 13,
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 500,
                textDecoration: 'none'
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            type="button"
            aria-label="Toggle theme"
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              border: '1px solid var(--border-subtle)',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            

          </button>
          <button
            type="button"
            style={{
              border: 'none',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer'
            }}
          >
            <img
              src="/assets/extracted/icon-user.svg"
              alt="User"
              style={{ width: 24, height: 24 }}
            />
            <span style={{ fontSize: 13, color: 'var(--text-dark)' }}>Aryabhatta</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

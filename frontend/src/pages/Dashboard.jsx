import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CourseCard from '../components/CourseCard.jsx';

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user exists in localStorage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    } else {
      // If no user exists, set default user (for demo purposes)
      const defaultUser = {
        name: 'Aryabhatta',
        email: 'aryabhatta@gmail.com'
      };
      localStorage.setItem('currentUser', JSON.stringify(defaultUser));
      setCurrentUser(defaultUser);
    }
  }, []);

  // Show loading state while user data is being fetched
  if (!currentUser) {
    return (
      <div>
        <Navbar />
        <main className="screen-max-width" style={{ padding: '24px 16px 40px' }}>
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="screen-max-width" style={{ padding: '24px 16px 40px' }}>
        {/* Profile summary row */}
        <section
          style={{
            borderRadius: 'var(--radius-lg)',
            background: '#ffffff',
            boxShadow: 'var(--shadow-card)',
            padding: 24,
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24
          }}
        >
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#e5edff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                color: 'var(--primary)'
              }}
            >
              {currentUser.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{currentUser.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{currentUser.email}</div>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: 'minmax(80px,auto)',
              gap: 24
            }}
          >
            {[
              ['Enrolled Courses', '3'],
              ['Completed', '1'],
              ['Learning Time', '45h'],
              ['Day Streak', '7']
            ].map(([label, value]) => (
              <div key={label} style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--primary)' }}>{value}</div>
                <div>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest news banner + search */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontSize: 14 }}>Latest News & Trending</h2>
            <SearchBar width={260} />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 16
            }}
          >
            {['JEE 2025 Batch', 'Crash Course', 'Bootcamp Update', 'AI & ML Masterclass'].map((title) => (
              <div
                key={title}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-soft)',
                  padding: 16,
                  fontSize: 12
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
                <div style={{ color: 'var(--text-muted)' }}>Short description goes here.</div>
              </div>
            ))}
          </div>
        </section>

        {/* Continue learning cards */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontSize: 14 }}>Continue Learning</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 20
            }}
          >
            <CourseCard
              title="Full Stack Web Development"
              subtitle="HTML, CSS, JavaScript, React"
              author="Rajesh Kumar"
            />
            <CourseCard
              title="Complete DSA Bootcamp"
              subtitle="Data Structures & Algorithms"
              author="Priya Sharma"
            />
            <CourseCard
              title="Machine Learning A-Z"
              subtitle="Complete ML & Data Science"
              author="Amit Singh"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
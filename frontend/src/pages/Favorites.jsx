import React from 'react';
import Navbar from '../components/Navbar.jsx';
import CourseCard from '../components/CourseCard.jsx';

export default function Favorites() {
  return (
    <div>
      <Navbar />
      <main className="screen-max-width" style={{ padding: '24px 16px 40px' }}>
        <h1 style={{ fontSize: 18, marginBottom: 16 }}>Favorites</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 20
          }}
        >
          <CourseCard
            title="Complete DSA Bootcamp"
            subtitle="Master Data Structures & Algorithms"
            author="Rajesh Kumar"
          />
          <CourseCard
            title="Full Stack Web Development"
            subtitle="HTML, CSS, JavaScript, React"
            author="Priya Sharma"
          />
          <CourseCard
            title="Machine Learning A-Z"
            subtitle="Complete ML & Data Science"
            author="Amit Singh"
          />
        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CategoryTabs from '../components/CategoryTabs.jsx';
import CourseCard from '../components/CourseCard.jsx';

const COURSE_TABS = ['All Courses', 'Learn', 'Materials', 'Coding Tests'];
const FILTER_TABS = ['All', 'DSA', 'Web', 'ML', 'Dev-Tools', 'Others'];

export default function Courses() {
  const [activeTab, setActiveTab] = useState('All Courses');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div>
      <Navbar />
      <main className="screen-max-width" style={{ padding: '24px 16px 40px' }}>
        {/* Hero banner */}
        <section
          style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--gradient-hero)',
            padding: 24,
            marginBottom: 24,
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div>
            <div style={{ fontSize: 14, opacity: 0.9 }}>Master DSA, Web Dev, ML & more</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Browse curated courses across all domains.</div>
          </div>
          <SearchBar placeholder="Search courses" width={280} />
        </section>

        {/* Tabs */}
        <section style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CategoryTabs tabs={COURSE_TABS} active={activeTab} onChange={setActiveTab} />
            <CategoryTabs tabs={FILTER_TABS} active={activeFilter} onChange={setActiveFilter} />
          </div>
        </section>

        {/* Course grid */}
        <section
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
          <CourseCard
            title="Git & GitHub Masterclass"
            subtitle="Version Control for Developers"
            author="Neha Verma"
          />
          <CourseCard
            title="Python Programming"
            subtitle="Beginner to Advanced"
            author="Rahul Gupta"
          />
          <CourseCard
            title="React Complete Guide"
            subtitle="Build Modern Web Apps"
            author="Sneha Patel"
          />
        </section>
      </main>
    </div>
  );
}

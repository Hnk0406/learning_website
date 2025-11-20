import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Learn from "./Learn.jsx";
import Materials from "./Materials.jsx";
import CodingTests from "./CodingTests.jsx";
import CategoryTabs from "../components/CategoryTabs.jsx";
import CourseCard from "../components/CourseCard.jsx";
import { courseService } from "../services/api.js";

export default function Courses() {
  const [tab, setTab] = useState("All Courses");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const TAB_LIST = ["All Courses", "Learn", "Materials", "Coding Tests"];
  const FILTER_TABS = ["All", "DSA", "Web", "ML", "Dev-Tools", "Others"];

  // Load courses from MongoDB
  useEffect(() => {
    loadCourses();
  }, [activeFilter, tab]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading courses with filter:', activeFilter);
      
      // Only fetch from API for "All Courses" tab
      if (tab === "All Courses") {
        const response = await courseService.getCourses({
          category: activeFilter !== 'All' ? activeFilter : undefined
        });
        
        console.log('Courses API response:', response);
        setCourses(response.data || []);
      } else {
        // For other tabs, you can set empty or handle differently
        setCourses([]);
      }
    } catch (error) {
      console.error('Failed to load courses:', error);
      setError(error.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Fallback sample data in case API fails
  const sampleCourses = [
    {
      _id: '1',
      title: "Complete C Programming",
      subtitle: "Basics to Advanced",
      author: "Upanishad Academy",
      rating: 4.8,
      hours: 32,
      category: "Others"
    },
    {
      _id: '2',
      title: "Data Structures & Algorithms",
      subtitle: "With C Language",
      author: "Upanishad Academy",
      rating: 4.9,
      hours: 45,
      category: "DSA"
    },
    {
      _id: '3',
      title: "Web Development Bootcamp",
      subtitle: "HTML, CSS, JS, MERN",
      author: "Upanishad Academy",
      rating: 4.7,
      hours: 50,
      category: "Web"
    },
  ];

  const displayCourses = courses.length > 0 ? courses : sampleCourses;
  
  // Filter courses based on active filter
  const filteredCourses = activeFilter === 'All' 
    ? displayCourses 
    : displayCourses.filter(course => course.category === activeFilter);

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh" }}>
      <Navbar />

      {/* ----- TOP TABS BAR ----- */}
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
        <CategoryTabs tabs={TAB_LIST} active={tab} onChange={setTab} />
      </div>

      {/* ----- FILTER TABS ----- */}
      {tab === "All Courses" && (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
          {FILTER_TABS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                background: activeFilter === filter ? "#3b82f6" : "transparent",
                color: activeFilter === filter ? "white" : "#64748b",
                fontSize: "14px",
                cursor: "pointer",
                border: activeFilter === filter ? "none" : "1px solid #cbd5e1"
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* ----- CONTENT AREA ----- */}
      <div style={{ padding: "20px" }}>
        {tab === "All Courses" && (
          <div>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Available Courses {activeFilter !== 'All' && `- ${activeFilter}`}
            </h2>

            {/* Loading State */}
            {loading && (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <div>Loading courses from database...</div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div style={{ 
                background: "#fef2f2", 
                border: "1px solid #fecaca", 
                borderRadius: "8px", 
                padding: "16px", 
                margin: "20px auto",
                maxWidth: "500px",
                textAlign: "center",
                color: "#dc2626"
              }}>
                <strong>Database Connection Issue</strong>
                <div style={{ fontSize: "14px", marginTop: "8px" }}>
                  {error}. Showing sample data.
                </div>
                <button 
                  onClick={loadCourses}
                  style={{
                    marginTop: "12px",
                    padding: "8px 16px",
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Courses Grid */}
            {!loading && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "24px",
                  padding: "10px",
                }}
              >
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course._id || course.id}
                    title={course.title}
                    subtitle={course.subtitle}
                    author={course.author}
                    rating={course.rating}
                    hours={course.hours}
                    category={course.category}
                    courseId={course._id || course.id}
                  />
                ))}
              </div>
            )}

            {/* No Courses Found */}
            {!loading && filteredCourses.length === 0 && !error && (
              <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                No courses found for the selected filter.
              </div>
            )}
          </div>
        )}

        {tab === "Learn" && <Learn />}
        {tab === "Materials" && <Materials />}
        {tab === "Coding Tests" && <CodingTests />}
      </div>
    </div>
  );
}
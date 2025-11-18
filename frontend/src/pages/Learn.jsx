import React, { useState } from "react";

export default function Learn() {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeLesson, setActiveLesson] = useState("Introduction to HTML");

  const sections = [
    {
      title: "HTML Basics",
      lessons: ["Introduction to HTML", "Elements & Tags", "Forms"],
    },
    {
      title: "CSS Fundamentals",
      lessons: ["Selectors", "Flexbox", "Grid"],
    },
    {
      title: "JavaScript",
      lessons: ["Variables", "Functions", "Scope"],
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        display: "flex",
        gap: "24px",
      }}
    >
      {/* LEFT CONTENT NAVIGATION (Original Sidebar restored) */}
      <div
        style={{
          width: "260px",
          background: "#fff",
          borderRadius: "12px",
          padding: "16px",
          height: "fit-content",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <h3>Course Content</h3>

        {sections.map((section, i) => {
          const open = openIndex === i;
          return (
            <div key={i} style={{ marginBottom: "10px" }}>
              <button
                onClick={() => setOpenIndex(open ? -1 : i)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  background: open ? "var(--primary-light)" : "transparent",
                  borderRadius: "8px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                {section.title}
              </button>

              {open && (
                <ul style={{ paddingLeft: "12px", listStyle: "none", marginTop: "8px" }}>
                  {section.lessons.map((lesson) => {
                    const active = lesson === activeLesson;

                    return (
                      <li key={lesson}>
                        <button
                          onClick={() => setActiveLesson(lesson)}
                          style={{
                            padding: "8px 10px",
                            width: "100%",
                            border: "none",
                            borderRadius: "6px",
                            textAlign: "left",
                            background: active ? "#e6e9ff" : "transparent",
                            color: active ? "var(--primary)" : "#555",
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
      </div>

      {/* RIGHT: VIDEO + COURSE INFO */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* VIDEO */}
        <div
          style={{
            height: "350px",
            background: "#111",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/extracted/placeholder-video.svg"
            alt="video"
            style={{ width: "90%", maxWidth: "700px" }}
          />
        </div>

        {/* PROGRESS BOX */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <h2>{activeLesson}</h2>
          <p style={{ color: "#999" }}>Course Progress</p>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "#e5e7eb",
              borderRadius: "10px",
              marginTop: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "40%",
                height: "100%",
                background: "var(--primary)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
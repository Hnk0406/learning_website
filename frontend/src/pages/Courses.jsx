import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Learn from "./Learn.jsx";
import Materials from "./Materials.jsx";
import CodingTests from "./CodingTests.jsx";

export default function Courses() {
  const [tab, setTab] = useState("all");

  return (
    <div>
      <Navbar />

      {/* ----- TOP TABS BAR ----- */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          padding: "20px 0",
          background: "#f5f7fb",
          position: "sticky",
          top: "var(--nav-height)",
          zIndex: 10,
        }}
      >
        <TabButton label="All Courses" value="all" tab={tab} setTab={setTab} />
        <TabButton label="Learn" value="learn" tab={tab} setTab={setTab} />
        <TabButton label="Materials" value="materials" tab={tab} setTab={setTab} />
        <TabButton label="Coding Tests" value="tests" tab={tab} setTab={setTab} />
      </div>

      {/* ----- CONTENT AREA ----- */}
      <div style={{ padding: "20px", background: "#f5f7fb" }}>
        {tab === "all" && (
          <div>
            {/* Your existing course cards stay here */}
            <h2 style={{ textAlign: "center" }}>All Course Cards Go Here</h2>
          </div>
        )}

        {tab === "learn" && <Learn />}
        {tab === "materials" && <Materials />}
        {tab === "tests" && <CodingTests />}
      </div>
    </div>
  );
}

function TabButton({ label, value, tab, setTab }) {
  const active = tab === value;

  return (
    <button
      onClick={() => setTab(value)}
      style={{
        padding: "8px 16px",
        borderRadius: "20px",
        border: "none",
        fontSize: "14px",
        cursor: "pointer",
        background: active ? "var(--primary)" : "#e5e7eb",
        color: active ? "#fff" : "#555",
      }}
    >
      {label}
    </button>
  );
}
import React from "react";

export default function Materials() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <h2>Study Materials</h2>

      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <a href="#" download style={materialStyle}>📄 HTML Notes.pdf</a>
        <a href="#" download style={materialStyle}>📄 CSS Guide.pdf</a>
        <a href="#" download style={materialStyle}>📄 JavaScript Handbook.pdf</a>
      </div>
    </div>
  );
}

const materialStyle = {
  padding: "12px",
  background: "#f4f4f4",
  borderRadius: "8px",
  textDecoration: "none",
  color: "#333",
};
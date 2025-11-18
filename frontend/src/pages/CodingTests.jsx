import React from "react";

export default function CodingTests() {
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
      <h2>Coding Tests</h2>

      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={testCard}>🧠 Test 1 – HTML Basics</div>
        <div style={testCard}>🧠 Test 2 – CSS Selectors</div>
        <div style={testCard}>🧠 Test 3 – JS Variables</div>
      </div>
    </div>
  );
}

const testCard = {
  padding: "16px",
  background: "#f4f4f4",
  borderRadius: "8px",
};
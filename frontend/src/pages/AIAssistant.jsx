// src/pages/AIAssistant.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PromptFun from "../components/PromptFun";
import './AIAssistant.css';

function AIAssistant() {
  const [prompts, setPrompts] = useState([]); // Removed TypeScript syntax
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim()) {
      addPrompt(input.trim());
    }
  };

  const addPrompt = (promptText) => {
    setIsLoading(true);
    setPrompts(prev => [...prev, promptText]);
    setInput("");
    // Small delay to show loading state
    setTimeout(() => setIsLoading(false), 500);
  };

  const clearPrompts = () => {
    setPrompts([]);
  };

  const removePrompt = (index) => {
    setPrompts(prev => prev.filter((_, i) => i !== index));
  };

  // Predefined educational prompts
  const quickPrompts = [
    "Explain quantum computing for beginners",
    "What are the best study techniques for exams?",
    "How does machine learning work in simple terms?",
    "Explain the concept of blockchain technology",
    "What are the benefits of spaced repetition in learning?",
    "How to improve problem-solving skills in programming?"
  ];

  return (
    <div>
      <Navbar />
      <main className="ai-assistant-container">
        {/* Header Section */}
        <section className="ai-hero">
          <div className="ai-hero-content">
            <h1>AI Learning Assistant</h1>
            <p>Get instant explanations, study tips, and learning support powered by Gemini AI</p>
            <div className="ai-features">
              <div className="feature">
                <span>⚡</span>
                <span>Instant Responses</span>
              </div>
              <div className="feature">
                <span>🎯</span>
                <span>Study Focused</span>
              </div>
              <div className="feature">
                <span>🔄</span>
                <span>Auto-Refresh</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="ai-main-content">
          <div className="ai-input-section">
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask anything about learning, technology, or studies..."
                className="prompt-input"
                disabled={isLoading}
              />
              <button 
                onClick={() => input.trim() && addPrompt(input.trim())}
                className="submit-btn"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? "Adding..." : "Ask AI"}
              </button>
            </div>
           </div>

          {/* Active Prompts Management */}
          {prompts.length > 0 && (
            <div className="prompts-management">
              <div className="management-header">
                <h2>Your Questions ({prompts.length})</h2>
                <button onClick={clearPrompts} className="clear-all-btn">
                  Clear All
                </button>
              </div>
              
              <div className="active-prompts-list">
                {prompts.map((promptText, index) => (
                  <div key={index} className="active-prompt-item">
                    <span className="prompt-number">{index + 1}.</span>
                    <span className="prompt-content">"{promptText}"</span>
                    <button 
                      onClick={() => removePrompt(index)}
                      className="remove-prompt-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Responses */}
          <div className="ai-responses-section">
            {prompts.length > 0 ? (
              <PromptFun prompts={prompts} interval={45000} />
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🤖</div>
                <h3>No questions yet</h3>
                <p>Ask a question above or click on one of the quick questions to get started!</p>
                <div className="empty-features">
                  <div className="empty-feature">
                    <strong>Perfect for:</strong>
                    <ul>
                      <li>Homework help</li>
                      <li>Concept explanations</li>
                      <li>Study techniques</li>
                      <li>Technology concepts</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AIAssistant;
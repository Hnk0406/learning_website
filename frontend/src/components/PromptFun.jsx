// src/components/PromptFun.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";

const Api_key = import.meta.env.VITE_API_KEY;

export default function PromptFun({ prompts, interval = 45000 }) {
  const [responses, setResponses] = useState([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);

  // Initialize responses state when prompts change
  useEffect(() => {
    const initialResponses = prompts.map(prompt => ({
      prompt,
      response: "",
      error: null,
      isLoading: true
    }));
    setResponses(initialResponses);
  }, [prompts]);

  async function getPromptResponse(prompt, index) {
    try {
      // Update loading state for this specific prompt
      setResponses(prev => prev.map((item, i) => 
        i === index ? { ...item, isLoading: true, error: null } : item
      ));

      const ai = new GoogleGenerativeAI(Api_key);
      const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      // Update response for this specific prompt
      setResponses(prev => prev.map((item, i) => 
        i === index ? { ...item, response: text, isLoading: false } : item
      ));
    } catch (err) {
      // Update error for this specific prompt
      setResponses(prev => prev.map((item, i) => 
        i === index ? { ...item, error: err.message, isLoading: false } : item
      ));
    }
  }

  async function getAllPrompts() {
    setIsLoadingAll(true);
    
    // Process all prompts in parallel
    const promises = prompts.map((prompt, index) => 
      getPromptResponse(prompt, index)
    );
    
    await Promise.allSettled(promises);
    setIsLoadingAll(false);
  }

  // Get single prompt response
  const getSinglePrompt = (index) => {
    getPromptResponse(prompts[index], index);
  };

  // Get all prompts on mount and at intervals
  useEffect(() => {
    if (prompts.length > 0) {
      getAllPrompts();
      const intervalId = setInterval(getAllPrompts, interval);
      return () => clearInterval(intervalId);
    }
  }, [prompts, interval]);

  // If no prompts provided
  if (!prompts || prompts.length === 0) {
    return (
      <div className="response-box error">
        No prompts provided. Please provide an array of prompts.
      </div>
    );
  }

  return (
    <div className="multiple-responses-container">
      {/* Global loading indicator */}
      {isLoadingAll && (
        <div className="global-loading">
          Loading all responses...
        </div>
      )}
      
      {/* Individual response boxes */}
      {responses.map((item, index) => (
        <div key={index} className="prompt-response-item">
          {/* Prompt header */}
          <div className="prompt-header">
            <h4>Prompt {index + 1}:</h4>
            <button 
              onClick={() => getSinglePrompt(index)}
              disabled={item.isLoading}
              className="refresh-btn"
            >
              {item.isLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          
          {/* Original prompt */}
          <div className="original-prompt">
            "{item.prompt}"
          </div>
          
          {/* Response box */}
          <div className={`response-box ${item.error ? "error" : ""} ${item.isLoading ? "loading" : ""}`}>
            {item.isLoading ? (
              <div className="loading-spinner">Loading response...</div>
            ) : item.error ? (
              <div className="error-message">Error: {item.error}</div>
            ) : (
              <div className="response-content">{item.response}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
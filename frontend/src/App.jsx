import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProofHome from './pages/ProofHome.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EditProfile from './pages/EditProfile.jsx';
import Courses from './pages/Courses.jsx';
import Learn from './pages/Learn.jsx';
import Materials from './pages/Materials.jsx';
import CodingTests from './pages/CodingTests.jsx';
import Favorites from './pages/Favorites.jsx';
import SuperBatch from './pages/SuperBatch.jsx';
import FocusMode from './pages/FocusMode.jsx';
import StyleGuide from './pages/StyleGuide.jsx';

function App() {
  return (
    <Router> 
    <div className="app-shell">
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main app */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/edit" element={<EditProfile />} />

        {/* Courses */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/learn" element={<Learn />} />
        <Route path="/courses/materials" element={<Materials />} />
        <Route path="/courses/coding-tests" element={<CodingTests />} />

        {/* Other sections */}
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/super-batch" element={<SuperBatch />} />
        <Route path="/focus-mode" element={<FocusMode />} />

        {/* Style guide for verification */}
        <Route path="/style-guide" element={<StyleGuide />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;

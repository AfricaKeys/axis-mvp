import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { JourneyLog, UsePageTracker } from './journeys';

// Simple Visuals Gallery
const VisualGallery = () => (
  <div>
    <h1>Axis Visuals</h1>
    <img src="/visuals/tenant.png" alt="Tenant" />
    <img src="/visuals/dashboard.png" alt="Dashboard" />
    <img src="/visuals/landlord.png" alt="Landlord" />
    <img src="/visuals/ai-assistant.png" alt="AI Assistant" />
    <img src="/visuals/logs.png" alt="Logs" />
  </div>
);

function App() {
  return (
    <Router>
      {/* 🧠 Tracker must be inside Router */}
      <UsePageTracker />

      <nav>
        <Link to="/visuals">Visuals</Link> | <Link to="/journeys">Journeys</Link>
      </nav>

      <Routes>
        <Route path="/visuals" element={<VisualGallery />} />
        <Route path="/journeys" element={<JourneyLog />} />
      </Routes>
    </Router>
  );
}

export default App;

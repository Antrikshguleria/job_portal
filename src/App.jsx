import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Keep your Navbar component
import JobPage from "./components/JobPage";
import CandidatesPage from "./components/CandidatesPage";
import CandidateDetailPage from "./components/CandidateDetailPage";
import AssessmentPage from "./components/AssessmentPage"; // Import the new AssessmentPage

// Main App component
const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Keeps the navbar intact */}
        <Routes>
          {/* Existing routes */}
          <Route path="/" element={<JobPage />} />
          <Route path="/job" element={<JobPage />} />
          <Route path="/candidates" element={<CandidatesPage />} />

          {/* New route for candidate details */}
          <Route path="/candidate-detail-page/:jobId" element={<CandidateDetailPage />} />

          {/* New route for Take Assessment with jobTitle parameter */}
          <Route path="/assessment/:jobTitle" element={<AssessmentPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
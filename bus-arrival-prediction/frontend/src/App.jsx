import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Result from './pages/Result';
import History from './pages/History';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Prediction />} />
            <Route path="/result" element={<Result />} />
            <Route path="/history" element={<History />} />
            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer" id="app-footer">
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <strong>BUS ARRIVAL TIME PREDICTION SYSTEM</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                College-Level Full Stack Machine Learning Application • Random Forest Regression
              </p>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Stack: React.js • Node.js • Express • Python ML • MongoDB
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import PredictionCard from '../components/PredictionCard';
import { Clock, History as HistoryIcon, ArrowLeft, RotateCcw } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve prediction object from navigation state
  const prediction = location.state?.prediction;

  if (!prediction) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', maxWidth: '600px', margin: '2rem auto' }}>
        <Clock size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>No Active Prediction Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Please submit transit journey details through the prediction form first.
        </p>
        <Link to="/predict" className="btn btn-primary" id="btn-no-prediction-redirect">
          <ArrowLeft size={16} />
          Go to Prediction Form
        </Link>
      </div>
    );
  }

  return (
    <div id="result-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Prediction Outcome
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Random Forest model computation results for your bus route.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => navigate('/predict')}
            className="btn btn-secondary"
            id="btn-recalculate"
          >
            <RotateCcw size={16} />
            <span>New Prediction</span>
          </button>
          <Link to="/history" className="btn btn-primary" id="btn-view-history-from-result">
            <HistoryIcon size={16} />
            <span>View All Logs</span>
          </Link>
        </div>
      </div>

      {/* Prediction Details Component */}
      <PredictionCard prediction={prediction} />
    </div>
  );
};

export default Result;

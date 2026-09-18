import React from 'react';
import PredictionForm from '../components/PredictionForm';
import { Info, HelpCircle } from 'lucide-react';

const Prediction = () => {
  return (
    <div id="prediction-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Bus Arrival Time Prediction
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Provide the transit features below to execute the Machine Learning inference model.
        </p>
      </div>

      {/* Main Prediction Form Component */}
      <PredictionForm />

      {/* Info Card */}
      <div
        className="card"
        style={{
          background: '#f8fafc',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
          fontSize: '0.875rem',
          color: 'var(--secondary)'
        }}
      >
        <Info size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>
            How the Prediction Engine Works
          </strong>
          The backend feeds the distance, traffic index (Low=1, Medium=2, High=3), departure time,
          and frequency headway into a trained <strong>Random Forest Regressor</strong>. The model factors in non-linear
          peak rush hours (07:30–09:45 and 16:45–19:30) and calculates expected transit time plus arrival headway.
        </div>
      </div>
    </div>
  );
};

export default Prediction;

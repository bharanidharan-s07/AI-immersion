import React from 'react';
import { Bus, MapPin, Navigation, Clock, Activity, CheckCircle, ArrowRight, Calendar, Sparkles } from 'lucide-react';

const PredictionCard = ({ prediction }) => {
  if (!prediction) {
    return null;
  }

  const {
    busNumber,
    source,
    destination,
    distance,
    traffic,
    time,
    busFrequency,
    predictedArrival,
    createdAt
  } = prediction;

  // Calculate projected arrival clock time
  const calculateArrivalClock = () => {
    try {
      if (!time || !predictedArrival) return '--:--';
      const [hours, minutes] = time.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + Math.round(predictedArrival);
      const newHours = Math.floor((totalMinutes / 60) % 24);
      const newMinutes = Math.floor(totalMinutes % 60);
      return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
    } catch {
      return '--:--';
    }
  };

  const getTrafficBadgeClass = (t) => {
    const val = String(t).toLowerCase();
    if (val === 'low' || val === '1') return 'badge-low';
    if (val === 'high' || val === '3') return 'badge-high';
    return 'badge-medium';
  };

  return (
    <div className="card" id="prediction-result-card" style={{ maxWidth: '800px', margin: '0 auto', boxShadow: 'var(--shadow-lg)' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.6rem', borderRadius: '10px' }}>
            <Bus size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {busNumber || 'Bus Service'}
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Random Forest Regression Inference
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className={`badge ${getTrafficBadgeClass(traffic)}`}>
            {traffic} Traffic
          </span>
          <span className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>
            <Sparkles size={12} style={{ marginRight: '4px' }} />
            ML Verified
          </span>
        </div>
      </div>

      {/* Main Big Result Highlight */}
      <div
        style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderRadius: '12px',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          marginBottom: '2rem',
          border: '1px solid #bfdbfe'
        }}
        id="result-highlight-box"
      >
        <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: '#1e40af', textTransform: 'uppercase' }}>
          Estimated Arrival Time
        </span>
        <div style={{ fontSize: '3.25rem', fontWeight: 800, color: '#1e3a8a', lineHeight: 1.1, margin: '0.5rem 0' }}>
          {predictedArrival} <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>minutes</span>
        </div>
        <p style={{ color: '#3b82f6', fontSize: '0.95rem', fontWeight: 500 }}>
          Approximate arrival at destination at <strong>{calculateArrivalClock()}</strong> (based on start time {time})
        </p>
      </div>

      {/* Journey Detail Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Source & Destination */}
        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Route Path
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              <MapPin size={16} style={{ color: '#059669' }} />
              <span>{source}</span>
            </div>
            <div style={{ marginLeft: '7px', borderLeft: '2px dashed #cbd5e1', height: '14px' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              <Navigation size={16} style={{ color: '#dc2626' }} />
              <span>{destination}</span>
            </div>
          </div>
        </div>

        {/* Distance & Traffic */}
        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Distance & Road State
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {distance} km
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Traffic Level: <strong style={{ color: 'var(--text-main)' }}>{traffic}</strong>
          </div>
        </div>

        {/* Departure Time & Frequency */}
        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Schedule & Headway
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {time}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Bus Frequency: Every <strong>{busFrequency} mins</strong>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <CheckCircle size={14} style={{ color: 'var(--success)' }} />
          Saved to MongoDB Prediction History
        </span>
        {createdAt && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} />
            {new Date(createdAt).toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default PredictionCard;

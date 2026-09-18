import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Clock, Cpu, Database, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';

const Home = () => {
  return (
    <div id="home-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          color: 'white',
          borderRadius: '16px',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}
        id="home-hero-section"
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1.25rem',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Cpu size={16} />
            <span>COLLEGE FULL STACK MACHINE LEARNING PROJECT</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '1.25rem'
            }}
            id="home-main-title"
          >
            BUS ARRIVAL TIME PREDICTION SYSTEM
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              color: '#e0e7ff',
              lineHeight: 1.6,
              maxWidth: '660px',
              margin: '0 auto 2rem'
            }}
          >
            An intelligent transportation system forecasting public transit travel times using
            Random Forest Regression, real-time traffic condition weighting, route distances,
            and bus dispatch frequencies.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/predict"
              className="btn"
              id="hero-predict-btn"
              style={{
                background: 'white',
                color: '#1e3a8a',
                fontSize: '1rem',
                padding: '0.85rem 1.75rem',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <Clock size={18} />
              <span>Predict Bus Arrival</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/history"
              className="btn"
              id="hero-history-btn"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.85rem 1.5rem',
                fontWeight: 600
              }}
            >
              <span>View History Log</span>
            </Link>
          </div>
        </div>
      </section>

      {/* System Architecture 4-Tier Cards */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
            System Architecture & Flow
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Seamless pipeline bridging React, Node.js REST API, Python Random Forest Regressor, and MongoDB.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {/* Frontend */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bus size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>1. React Frontend</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Interactive Single Page App with input validation, journey presets, and dynamic ETA presentation.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>React • Axios • React Router</div>
          </div>

          {/* Backend */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#e0e7ff', color: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>2. Node.js & Express</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              REST API controllers validating payloads and executing the Python ML child process.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#4338ca', fontWeight: 600 }}>Express • CORS • Child Process</div>
          </div>

          {/* Machine Learning */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>3. Python ML Model</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Random Forest Regression ensemble trained on distance, traffic levels, rush hour time, and headway.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 600 }}>Scikit-learn • Pandas • Joblib</div>
          </div>

          {/* Database */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Database size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>4. MongoDB Storage</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Persistent document storage capturing each prediction record, timestamps, and route history.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>Mongoose • MongoDB • Schema Validation</div>
          </div>
        </div>
      </section>

      {/* Input Features Summary Box */}
      <section className="card" style={{ background: '#f8fafc', border: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Core Machine Learning Features
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
          <div><strong>1. Bus Number:</strong> Identifier for the route line</div>
          <div><strong>2. Source:</strong> Starting departure bus stop/station</div>
          <div><strong>3. Destination:</strong> Arrival terminus terminal</div>
          <div><strong>4. Distance:</strong> Route travel distance in km</div>
          <div><strong>5. Traffic:</strong> Categorized as Low (1), Medium (2), High (3)</div>
          <div><strong>6. Current Time:</strong> Evaluates morning/evening congestion</div>
          <div><strong>7. Bus Frequency:</strong> Dispatch interval in minutes</div>
          <div><strong>Target:</strong> Predicted Arrival Time (in minutes)</div>
        </div>
      </section>
    </div>
  );
};

export default Home;

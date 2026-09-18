import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  History as HistoryIcon,
  RefreshCw,
  Search,
  Trash2,
  Clock,
  MapPin,
  Navigation,
  Bus,
  AlertCircle,
  Loader2
} from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [clearing, setClearing] = useState(false);

  // Fetch prediction history from MongoDB via backend
  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/history');
      if (response.data && response.data.success) {
        setHistory(response.data.data || []);
      } else {
        setError(response.data?.message || 'Failed to load prediction history.');
      }
    } catch (err) {
      console.error('History Fetch Error:', err);
      setError(
        err.response?.data?.message || 'Could not connect to backend server to load history.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Clear history
  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all prediction history?')) {
      return;
    }
    setClearing(true);
    try {
      await axios.delete('/api/history');
      setHistory([]);
    } catch (err) {
      alert('Failed to clear history from server.');
    } finally {
      setClearing(false);
    }
  };

  // Filter based on search query
  const filteredHistory = history.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      (item.busNumber && item.busNumber.toLowerCase().includes(q)) ||
      (item.source && item.source.toLowerCase().includes(q)) ||
      (item.destination && item.destination.toLowerCase().includes(q)) ||
      (item.traffic && item.traffic.toLowerCase().includes(q))
    );
  });

  const getTrafficBadge = (t) => {
    const val = String(t).toLowerCase();
    if (val === 'low' || val === '1') return 'badge badge-low';
    if (val === 'high' || val === '3') return 'badge badge-high';
    return 'badge badge-medium';
  };

  return (
    <div id="history-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Prediction History
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            All previous bus arrival predictions retrieved from MongoDB database.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={fetchHistory}
            className="btn btn-secondary"
            disabled={loading}
            id="btn-refresh-history"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="btn btn-secondary"
              disabled={clearing}
              style={{ color: 'var(--danger)', borderColor: '#fecaca' }}
              id="btn-clear-history"
            >
              <Trash2 size={16} />
              <span>Clear History</span>
            </button>
          )}

          <Link to="/predict" className="btn btn-primary" id="btn-new-prediction-from-history">
            <Clock size={16} />
            <span>New Prediction</span>
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      {history.length > 0 && (
        <div className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by Bus Number, Source, Destination or Traffic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', background: 'transparent' }}
            id="input-search-history"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            padding: '1rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
          <Loader2 size={36} className="animate-spin" style={{ color: 'var(--primary)', margin: '0 auto 1rem' }} />
          <p style={{ color: 'var(--text-muted)' }}>Retrieving prediction records from database...</p>
        </div>
      ) : filteredHistory.length === 0 ? (
        /* Empty State */
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
          <HistoryIcon size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {searchTerm ? 'No Matching Records Found' : 'No Prediction History Yet'}
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            {searchTerm
              ? 'Try modifying your search keywords.'
              : 'Run your first bus arrival prediction to log records into the system.'}
          </p>
          <Link to="/predict" className="btn btn-primary">
            Make First Prediction
          </Link>
        </div>
      ) : (
        /* Data Table */
        <div className="table-container" id="history-table-container">
          <table className="custom-table" id="history-data-table">
            <thead>
              <tr>
                <th>Bus Details</th>
                <th>Route (Source → Dest)</th>
                <th>Distance</th>
                <th>Traffic</th>
                <th>Departure Time</th>
                <th>Frequency</th>
                <th>Predicted Arrival</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, index) => (
                <tr key={item._id || index}>
                  <td>
                    <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Bus size={15} style={{ color: 'var(--primary)' }} />
                      <span>{item.busNumber}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                      <span style={{ color: '#059669', fontWeight: 600 }}>{item.source}</span>
                      <span style={{ color: '#94a3b8' }}>→</span>
                      <span style={{ color: '#dc2626', fontWeight: 600 }}>{item.destination}</span>
                    </div>
                  </td>
                  <td>
                    <strong>{item.distance}</strong> km
                  </td>
                  <td>
                    <span className={getTrafficBadge(item.traffic)}>{item.traffic}</span>
                  </td>
                  <td>{item.time}</td>
                  <td>Every {item.busFrequency} min</td>
                  <td>
                    <span
                      style={{
                        background: '#dbeafe',
                        color: '#1e40af',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.9rem'
                      }}
                    >
                      {item.predictedArrival} mins
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bus, MapPin, Navigation, Activity, Clock, Timer, AlertCircle, Loader2 } from 'lucide-react';

const PredictionForm = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    busNumber: '',
    source: '',
    destination: '',
    distance: '',
    traffic: 'Medium',
    time: '08:30',
    busFrequency: '15'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation Logic
  const validate = () => {
    const newErrors = {};

    if (!formData.busNumber.trim()) {
      newErrors.busNumber = 'Bus Number is required';
    }

    if (!formData.source.trim()) {
      newErrors.source = 'Source location is required';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.distance) {
      newErrors.distance = 'Distance is required';
    } else if (isNaN(formData.distance) || Number(formData.distance) <= 0) {
      newErrors.distance = 'Distance must be a positive number';
    }

    if (!formData.traffic) {
      newErrors.traffic = 'Please select a traffic condition';
    }

    if (!formData.time) {
      newErrors.time = 'Current Time is required';
    }

    if (!formData.busFrequency) {
      newErrors.busFrequency = 'Bus Frequency is required';
    } else if (isNaN(formData.busFrequency) || Number(formData.busFrequency) <= 0) {
      newErrors.busFrequency = 'Bus Frequency must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // Send prediction request via Axios
      const response = await axios.post('/api/predict', {
        busNumber: formData.busNumber.trim(),
        source: formData.source.trim(),
        destination: formData.destination.trim(),
        distance: Number(formData.distance),
        traffic: formData.traffic,
        time: formData.time,
        busFrequency: Number(formData.busFrequency)
      });

      if (response.data && response.data.success) {
        // Navigate to Result Page passing prediction data in state
        navigate('/result', {
          state: {
            prediction: response.data.data
          }
        });
      } else {
        setServerError(response.data?.message || 'Failed to predict arrival time.');
      }
    } catch (err) {
      console.error('API Error:', err);
      setServerError(
        err.response?.data?.message || 'Server error occurred while predicting bus arrival.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Preset fill for quick demo
  const handleQuickPreset = (preset) => {
    setFormData(preset);
    setErrors({});
  };

  return (
    <div className="card" id="prediction-form-card">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Enter Journey & Traffic Parameters
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Fill in the details below to trigger the Random Forest Regression model.
          </p>
        </div>

        {/* Demo Preset Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
            onClick={() =>
              handleQuickPreset({
                busNumber: 'Route 101 - Express',
                source: 'Central Metro Terminal',
                destination: 'Tech Innovation Park',
                distance: '14.5',
                traffic: 'Medium',
                time: '08:45',
                busFrequency: '12'
              })
            }
          >
            Demo Route A
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
            onClick={() =>
              handleQuickPreset({
                busNumber: 'Route 42 - Campus Line',
                source: 'University North Gate',
                destination: 'Downtown Library',
                distance: '7.2',
                traffic: 'High',
                time: '17:30',
                busFrequency: '10'
              })
            }
          >
            Demo Route B (Peak)
          </button>
        </div>
      </div>

      {serverError && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            padding: '0.85rem 1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
          id="prediction-server-error"
        >
          <AlertCircle size={18} />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate id="bus-prediction-form">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* 1. Bus Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="busNumber">
              <Bus size={15} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
              1. Bus Number / Route Name *
            </label>
            <input
              type="text"
              id="busNumber"
              name="busNumber"
              className="form-control"
              placeholder="e.g., Bus 304A or City Line"
              value={formData.busNumber}
              onChange={handleChange}
            />
            {errors.busNumber && <span className="form-error">{errors.busNumber}</span>}
          </div>

          {/* 2. Source */}
          <div className="form-group">
            <label className="form-label" htmlFor="source">
              <MapPin size={15} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
              2. Source Location *
            </label>
            <input
              type="text"
              id="source"
              name="source"
              className="form-control"
              placeholder="e.g., Central Station"
              value={formData.source}
              onChange={handleChange}
            />
            {errors.source && <span className="form-error">{errors.source}</span>}
          </div>

          {/* 3. Destination */}
          <div className="form-group">
            <label className="form-label" htmlFor="destination">
              <Navigation size={15} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
              3. Destination Location *
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              className="form-control"
              placeholder="e.g., Tech Park South"
              value={formData.destination}
              onChange={handleChange}
            />
            {errors.destination && <span className="form-error">{errors.destination}</span>}
          </div>

          {/* 4. Distance */}
          <div className="form-group">
            <label className="form-label" htmlFor="distance">
              <Activity size={15} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
              4. Distance in Kilometers (km) *
            </label>
            <input
              type="number"
              step="0.1"
              id="distance"
              name="distance"
              className="form-control"
              placeholder="e.g., 12.5"
              value={formData.distance}
              onChange={handleChange}
            />
            {errors.distance && <span className="form-error">{errors.distance}</span>}
          </div>

          {/* 5. Traffic Condition */}
          <div className="form-group">
            <label className="form-label" htmlFor="traffic">
              <Activity size={15} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
              5. Traffic Condition *
            </label>
            <select
              id="traffic"
              name="traffic"
              className="form-control"
              value={formData.traffic}
              onChange={handleChange}
            >
              <option value="Low">Low Traffic (Smooth Flow)</option>
              <option value="Medium">Medium Traffic (Moderate Congestion)</option>
              <option value="High">High Traffic (Heavy Rush)</option>
            </select>
            {errors.traffic && <span className="form-error">{errors.traffic}</span>}
          </div>

          {/* 6. Current Time */}
          <div className="form-group">
            <label className="form-label" htmlFor="time">
              <Clock size={15} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
              6. Current Time (HH:MM) *
            </label>
            <input
              type="time"
              id="time"
              name="time"
              className="form-control"
              value={formData.time}
              onChange={handleChange}
            />
            {errors.time && <span className="form-error">{errors.time}</span>}
          </div>

          {/* 7. Bus Frequency */}
          <div className="form-group">
            <label className="form-label" htmlFor="busFrequency">
              <Timer size={15} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
              7. Bus Frequency (minutes interval) *
            </label>
            <input
              type="number"
              id="busFrequency"
              name="busFrequency"
              className="form-control"
              placeholder="e.g., 15"
              value={formData.busFrequency}
              onChange={handleChange}
            />
            {errors.busFrequency && <span className="form-error">{errors.busFrequency}</span>}
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            type="reset"
            className="btn btn-secondary"
            onClick={() => {
              setFormData({
                busNumber: '',
                source: '',
                destination: '',
                distance: '',
                traffic: 'Medium',
                time: '08:30',
                busFrequency: '15'
              });
              setErrors({});
            }}
          >
            Reset Fields
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            id="btn-predict-arrival"
            style={{ minWidth: '180px' }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Running ML Model...</span>
              </>
            ) : (
              <>
                <Clock size={18} />
                <span>Predict Arrival</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictionForm;

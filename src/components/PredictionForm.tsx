import React, { useState } from 'react';
import axios from 'axios';
import { Bus, MapPin, Navigation, Activity, Clock, Timer, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { PredictionData } from '../types';

interface PredictionFormProps {
  onSuccess: (prediction: PredictionData) => void;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    busNumber: '',
    source: '',
    destination: '',
    distance: '',
    traffic: 'Medium',
    time: '08:30',
    busFrequency: '15'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.busNumber.trim()) newErrors.busNumber = 'Bus Number is required';
    if (!formData.source.trim()) newErrors.source = 'Source location is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';

    if (!formData.distance) {
      newErrors.distance = 'Distance is required';
    } else if (isNaN(Number(formData.distance)) || Number(formData.distance) <= 0) {
      newErrors.distance = 'Distance must be a positive number';
    }

    if (!formData.traffic) newErrors.traffic = 'Traffic condition is required';
    if (!formData.time) newErrors.time = 'Current Time is required';

    if (!formData.busFrequency) {
      newErrors.busFrequency = 'Bus Frequency is required';
    } else if (isNaN(Number(formData.busFrequency)) || Number(formData.busFrequency) <= 0) {
      newErrors.busFrequency = 'Bus frequency must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await axios.post('/api/predict', {
        busNumber: formData.busNumber.trim(),
        source: formData.source.trim(),
        destination: formData.destination.trim(),
        distance: Number(formData.distance),
        traffic: formData.traffic,
        time: formData.time,
        busFrequency: Number(formData.busFrequency)
      });

      if (response.data?.success && response.data.data) {
        onSuccess(response.data.data);
      } else {
        setServerError(response.data?.message || 'Failed to predict arrival time.');
      }
    } catch (err: any) {
      console.error('API Error:', err);
      setServerError(
        err.response?.data?.message || 'Failed to communicate with backend prediction API.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (preset: typeof formData) => {
    setFormData(preset);
    setErrors({});
    setServerError('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8" id="prediction-form-container">
      {/* Header & Preset Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Input Journey Parameters</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Random Forest ML
            </span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Specify distance, road traffic density, departure hour, and bus headway frequency.
          </p>
        </div>

        {/* Quick Fill Demo Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Presets:
          </span>
          <button
            type="button"
            onClick={() =>
              loadPreset({
                busNumber: 'Route 101 - Express',
                source: 'Central Terminal',
                destination: 'Tech City Campus',
                distance: '14.5',
                traffic: 'Medium',
                time: '08:45',
                busFrequency: '12'
              })
            }
            className="text-xs px-3 py-1.5 rounded-md font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            Route 101 (Medium)
          </button>
          <button
            type="button"
            onClick={() =>
              loadPreset({
                busNumber: 'Route 42 - Campus Shuttle',
                source: 'University North Gate',
                destination: 'Downtown Library',
                distance: '7.2',
                traffic: 'High',
                time: '17:30',
                busFrequency: '10'
              })
            }
            className="text-xs px-3 py-1.5 rounded-md font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            Route 42 (Peak Rush)
          </button>
          <button
            type="button"
            onClick={() =>
              loadPreset({
                busNumber: 'Route 8 - Coastal Express',
                source: 'Harbor Station',
                destination: 'Suburban Plaza',
                distance: '22.0',
                traffic: 'Low',
                time: '10:15',
                busFrequency: '20'
              })
            }
            className="text-xs px-3 py-1.5 rounded-md font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            Route 8 (Low Traffic)
          </button>
        </div>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Bus Number */}
          <div>
            <label htmlFor="busNumber" className="block text-sm font-semibold text-slate-800 mb-1.5">
              <Bus className="w-4 h-4 inline-block mr-1.5 text-blue-600" />
              1. Bus Number / Route Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="busNumber"
              name="busNumber"
              value={formData.busNumber}
              onChange={handleChange}
              placeholder="e.g., Route 101 or City Link 5A"
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm focus:outline-none transition-shadow ${
                errors.busNumber
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {errors.busNumber && <p className="text-xs text-red-600 mt-1">{errors.busNumber}</p>}
          </div>

          {/* 2. Source */}
          <div>
            <label htmlFor="source" className="block text-sm font-semibold text-slate-800 mb-1.5">
              <MapPin className="w-4 h-4 inline-block mr-1.5 text-emerald-600" />
              2. Source Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="e.g., Central Station / South Gate"
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm focus:outline-none transition-shadow ${
                errors.source
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {errors.source && <p className="text-xs text-red-600 mt-1">{errors.source}</p>}
          </div>

          {/* 3. Destination */}
          <div>
            <label htmlFor="destination" className="block text-sm font-semibold text-slate-800 mb-1.5">
              <Navigation className="w-4 h-4 inline-block mr-1.5 text-red-600" />
              3. Destination Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Tech Park South Terminus"
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm focus:outline-none transition-shadow ${
                errors.destination
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {errors.destination && <p className="text-xs text-red-600 mt-1">{errors.destination}</p>}
          </div>

          {/* 4. Distance */}
          <div>
            <label htmlFor="distance" className="block text-sm font-semibold text-slate-800 mb-1.5">
              <Activity className="w-4 h-4 inline-block mr-1.5 text-indigo-600" />
              4. Distance in Kilometers (km) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              id="distance"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              placeholder="e.g., 14.5"
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm focus:outline-none transition-shadow ${
                errors.distance
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {errors.distance && <p className="text-xs text-red-600 mt-1">{errors.distance}</p>}
          </div>

          {/* 5. Traffic Condition */}
          <div>
            <label htmlFor="traffic" className="block text-sm font-semibold text-slate-800 mb-1.5">
              <Activity className="w-4 h-4 inline-block mr-1.5 text-amber-600" />
              5. Traffic Condition <span className="text-red-500">*</span>
            </label>
            <select
              id="traffic"
              name="traffic"
              value={formData.traffic}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="Low">Low Traffic (Smooth Flow - Level 1)</option>
              <option value="Medium">Medium Traffic (Moderate Congestion - Level 2)</option>
              <option value="High">High Traffic (Peak Rush / Heavy Congestion - Level 3)</option>
            </select>
            {errors.traffic && <p className="text-xs text-red-600 mt-1">{errors.traffic}</p>}
          </div>

          {/* 6. Current Time */}
          <div>
            <label htmlFor="time" className="block text-sm font-semibold text-slate-800 mb-1.5">
              <Clock className="w-4 h-4 inline-block mr-1.5 text-blue-600" />
              6. Current Departure Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
            {errors.time && <p className="text-xs text-red-600 mt-1">{errors.time}</p>}
          </div>

          {/* 7. Bus Frequency */}
          <div className="md:col-span-2">
            <label htmlFor="busFrequency" className="block text-sm font-semibold text-slate-800 mb-1.5">
              <Timer className="w-4 h-4 inline-block mr-1.5 text-purple-600" />
              7. Bus Frequency (Headway in minutes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="busFrequency"
              name="busFrequency"
              value={formData.busFrequency}
              onChange={handleChange}
              placeholder="e.g., 15 (interval between consecutive buses)"
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm focus:outline-none transition-shadow ${
                errors.busFrequency
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {errors.busFrequency && <p className="text-xs text-red-600 mt-1">{errors.busFrequency}</p>}
            <p className="text-xs text-slate-400 mt-1">
              Represents dispatch frequency. Typical city buses range from 5 to 30 minutes.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
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
              setServerError('');
            }}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Clear Form
          </button>

          <button
            type="submit"
            disabled={loading}
            id="btn-submit-predict"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Executing Random Forest Model...</span>
              </>
            ) : (
              <>
                <Clock className="w-4 h-4" />
                <span>Predict Arrival Time</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

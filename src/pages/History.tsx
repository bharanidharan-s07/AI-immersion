import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PredictionData, PageView } from '../types';
import {
  History as HistoryIcon,
  RefreshCw,
  Search,
  Trash2,
  Bus,
  Clock,
  MapPin,
  Navigation,
  Download,
  AlertCircle,
  Loader2,
  Calendar
} from 'lucide-react';

interface HistoryProps {
  onNavigate: (page: PageView) => void;
}

export const History: React.FC<HistoryProps> = ({ onNavigate }) => {
  const [history, setHistory] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [clearing, setClearing] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/history');
      if (response.data?.success) {
        setHistory(response.data.data || []);
      } else {
        setError(response.data?.message || 'Failed to retrieve history records.');
      }
    } catch (err: any) {
      console.error('History fetch error:', err);
      setError(
        err.response?.data?.message || 'Could not connect to backend server to load prediction history.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClear = async () => {
    if (!window.confirm('Are you sure you want to clear all prediction history?')) return;
    setClearing(true);
    try {
      await axios.delete('/api/history');
      setHistory([]);
    } catch (err) {
      alert('Failed to clear prediction history.');
    } finally {
      setClearing(false);
    }
  };

  const exportCSV = () => {
    if (history.length === 0) return;
    const headers = ['Bus Number', 'Source', 'Destination', 'Distance (km)', 'Traffic', 'Departure Time', 'Frequency (min)', 'Predicted Arrival (min)', 'Timestamp'];
    const rows = history.map((item) => [
      `"${item.busNumber}"`,
      `"${item.source}"`,
      `"${item.destination}"`,
      item.distance,
      item.traffic,
      item.time,
      item.busFrequency,
      item.predictedArrival,
      `"${item.createdAt || ''}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bus_prediction_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = history.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.busNumber.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q) ||
      item.destination.toLowerCase().includes(q) ||
      item.traffic.toLowerCase().includes(q)
    );
  });

  const getTrafficBadge = (t: string) => {
    const val = String(t).toLowerCase();
    if (val === 'low' || val === '1') return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (val === 'high' || val === '3') return 'bg-red-50 text-red-800 border-red-200';
    return 'bg-amber-50 text-amber-800 border-amber-200';
  };

  return (
    <div className="space-y-6" id="history-view-container">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Prediction History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Historical records persisted in MongoDB database.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={fetchHistory}
            disabled={loading}
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            id="btn-refresh-history-records"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          {history.length > 0 && (
            <>
              <button
                onClick={exportCSV}
                className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Export history table as CSV file"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleClear}
                disabled={clearing}
                className="px-3.5 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </>
          )}

          <button
            onClick={() => onNavigate('predict')}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Clock className="w-4 h-4" />
            <span>New Prediction</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      {history.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3 shadow-xs">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by bus number, source, destination, traffic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-sm text-slate-500">Querying prediction records from MongoDB...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
          <HistoryIcon className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            {searchTerm ? 'No Matching Records Found' : 'No History Records Yet'}
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {searchTerm
              ? 'Try adjusting your search criteria.'
              : 'Submit journey parameters on the prediction page to log entries into MongoDB.'}
          </p>
          <button
            onClick={() => onNavigate('predict')}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            Make First Prediction
          </button>
        </div>
      ) : (
        /* Data Table */
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Bus Service</th>
                  <th className="px-5 py-3.5">Route</th>
                  <th className="px-5 py-3.5">Distance</th>
                  <th className="px-5 py-3.5">Traffic</th>
                  <th className="px-5 py-3.5">Time</th>
                  <th className="px-5 py-3.5">Frequency</th>
                  <th className="px-5 py-3.5 text-right">Predicted ETA</th>
                  <th className="px-5 py-3.5">Recorded At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Bus className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{item.busNumber}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-emerald-700 font-medium">{item.source}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-red-700 font-medium">{item.destination}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {item.distance} km
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getTrafficBadge(item.traffic)}`}>
                        {item.traffic}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {item.time}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      Every {item.busFrequency}m
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold text-sm">
                        {item.predictedArrival} mins
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400 whitespace-nowrap">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

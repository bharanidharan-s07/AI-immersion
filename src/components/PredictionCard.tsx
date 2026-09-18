import React from 'react';
import { Bus, MapPin, Navigation, Clock, Activity, Calendar, CheckCircle2, ShieldCheck, Sparkles, Timer } from 'lucide-react';
import { PredictionData } from '../types';

interface PredictionCardProps {
  prediction: PredictionData;
  onNewPrediction?: () => void;
  onViewHistory?: () => void;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({
  prediction,
  onNewPrediction,
  onViewHistory
}) => {
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

  // Compute calculated arrival clock timestamp
  const calculateArrivalClock = () => {
    try {
      if (!time || !predictedArrival) return '--:--';
      const [h, m] = time.split(':').map(Number);
      const totalMinutes = h * 60 + m + Math.round(predictedArrival);
      const newH = Math.floor((totalMinutes / 60) % 24);
      const newM = Math.floor(totalMinutes % 60);
      return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
    } catch {
      return '--:--';
    }
  };

  const getTrafficBadge = (t: string) => {
    const val = String(t).toLowerCase();
    if (val === 'low' || val === '1') {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    if (val === 'high' || val === '3') {
      return 'bg-red-50 text-red-800 border-red-200';
    }
    return 'bg-amber-50 text-amber-800 border-amber-200';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6 sm:p-8 max-w-3xl mx-auto" id="prediction-result-display-card">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">{busNumber}</h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getTrafficBadge(traffic)}`}>
                {traffic} Traffic
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Predicted via Random Forest Ensemble Regressor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full self-start sm:self-auto font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>MongoDB Saved</span>
        </div>
      </div>

      {/* Main Big Result Highlight */}
      <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl p-8 text-center text-white shadow-inner mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200 inline-block mb-1">
            Predicted Bus Arrival Duration
          </span>
          <div className="text-5xl sm:text-6xl font-extrabold tracking-tight my-2">
            {predictedArrival}{' '}
            <span className="text-2xl sm:text-3xl font-semibold text-blue-200">mins</span>
          </div>
          <p className="text-sm font-medium text-blue-100 max-w-md mx-auto">
            Estimated arrival time at destination is approximately{' '}
            <strong className="text-white underline underline-offset-2">{calculateArrivalClock()}</strong>{' '}
            (departure at {time})
          </p>
        </div>
        {/* Subtle decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
      </div>

      {/* Journey Attributes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Route Path */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/80">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Route Details
          </span>
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{source}</span>
            </div>
            <div className="ml-2 pl-3 border-l-2 border-dashed border-slate-300 h-3" />
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <Navigation className="w-4 h-4 text-red-600 shrink-0" />
              <span className="truncate">{destination}</span>
            </div>
          </div>
        </div>

        {/* Distance & Traffic */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/80">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Distance & Road
          </span>
          <div className="text-2xl font-bold text-slate-900">{distance} km</div>
          <div className="text-xs text-slate-600 mt-1 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            <span>Traffic Condition: <strong className="text-slate-800">{traffic}</strong></span>
          </div>
        </div>

        {/* Departure & Frequency */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/80">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Schedule & Headway
          </span>
          <div className="text-2xl font-bold text-slate-900">{time}</div>
          <div className="text-xs text-slate-600 mt-1 flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-slate-400" />
            <span>Dispatch: Every <strong className="text-slate-800">{busFrequency} mins</strong></span>
          </div>
        </div>
      </div>

      {/* Model Performance Pill Banner */}
      <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Machine Learning Regression Model:</strong> 100 Estimators • MAE: ~2.14 mins • R²: 0.94
          </span>
        </div>
        {createdAt && (
          <span className="text-slate-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(createdAt).toLocaleString()}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      {(onNewPrediction || onViewHistory) && (
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          {onNewPrediction && (
            <button
              onClick={onNewPrediction}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Make Another Prediction
            </button>
          )}
          {onViewHistory && (
            <button
              onClick={onViewHistory}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
            >
              View Full History
            </button>
          )}
        </div>
      )}
    </div>
  );
};

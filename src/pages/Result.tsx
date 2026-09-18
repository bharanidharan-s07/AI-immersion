import React from 'react';
import { PredictionCard } from '../components/PredictionCard';
import { PredictionData, PageView } from '../types';
import { ArrowLeft, Clock, RotateCcw, History as HistoryIcon } from 'lucide-react';

interface ResultProps {
  prediction: PredictionData | null;
  onNavigate: (page: PageView) => void;
}

export const Result: React.FC<ResultProps> = ({ prediction, onNavigate }) => {
  if (!prediction) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
        <Clock className="w-12 h-12 text-slate-400 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">No Prediction Available</h3>
        <p className="text-sm text-slate-500">
          Please fill out the prediction form to calculate an estimated bus arrival duration.
        </p>
        <button
          onClick={() => onNavigate('predict')}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go to Prediction Form</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="result-view-container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Prediction Result
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Machine Learning forecasted arrival time and journey breakdown.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('predict')}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Prediction</span>
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <HistoryIcon className="w-4 h-4" />
            <span>View All Logs</span>
          </button>
        </div>
      </div>

      {/* Main Result Card */}
      <PredictionCard
        prediction={prediction}
        onNewPrediction={() => onNavigate('predict')}
        onViewHistory={() => onNavigate('history')}
      />
    </div>
  );
};

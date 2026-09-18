import React from 'react';
import { PredictionForm } from '../components/PredictionForm';
import { PredictionData } from '../types';
import { Info, Sparkles } from 'lucide-react';

interface PredictionPageProps {
  onSuccess: (prediction: PredictionData) => void;
}

export const Prediction: React.FC<PredictionPageProps> = ({ onSuccess }) => {
  return (
    <div className="space-y-6" id="prediction-view-container">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Bus Arrival Time Prediction
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Provide the journey parameters to trigger the Random Forest ML prediction pipeline.
        </p>
      </div>

      {/* Prediction Form */}
      <PredictionForm onSuccess={onSuccess} />

      {/* Info Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-start gap-3.5 text-xs text-slate-600">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-800 text-sm block font-semibold">
            How the Random Forest Prediction Works
          </strong>
          <p className="leading-relaxed">
            When you click &ldquo;Predict Arrival Time&rdquo;, the React frontend validates all entries and transmits the data
            to the Express backend via Axios. Node.js executes Python&rsquo;s <code>predict.py</code> as a child process.
            The ML model applies 100 ensemble decision trees to calculate transit duration adjusted for traffic severity
            and rush-hour time windows. The prediction record is persisted in MongoDB, and the result is returned to the UI.
          </p>
        </div>
      </div>
    </div>
  );
};

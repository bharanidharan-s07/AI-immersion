import React from 'react';
import { Bus, Clock, Cpu, Database, ArrowRight, ShieldCheck, Zap, Activity, CheckCircle2, Navigation, MapPin } from 'lucide-react';
import { PageView } from '../types';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12" id="home-view-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-8 sm:p-14 shadow-lg text-center">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-xs border border-white/10">
            <Cpu className="w-3.5 h-3.5 text-blue-300" />
            <span>COLLEGE FULL STACK MACHINE LEARNING PROJECT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            BUS ARRIVAL TIME PREDICTION SYSTEM
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
            An intelligent, end-to-end transportation forecasting system predicting public transit
            arrival times using Random Forest Regression, live traffic metrics, route distance,
            and bus dispatch headway.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('predict')}
              id="hero-btn-predict-cta"
              className="px-6 py-3 rounded-xl bg-white text-blue-900 font-bold text-sm sm:text-base hover:bg-blue-50 shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-blue-700" />
              <span>Predict Bus Arrival</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('history')}
              id="hero-btn-history-cta"
              className="px-5 py-3 rounded-xl bg-blue-800/60 border border-blue-400/30 text-white font-semibold text-sm sm:text-base hover:bg-blue-800 transition-colors cursor-pointer"
            >
              View History Log
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* System Architecture 4-Tier Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            End-to-End System Architecture
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Data flows seamlessly from React UI to Express REST API, Python ML model, and MongoDB database.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Frontend */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bus className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">1. React.js Frontend</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Interactive single-page application handling input validation, journey presets, and dynamic ETA presentation.
            </p>
            <div className="pt-2 text-xs font-semibold text-blue-600">React • Axios • React Router</div>
          </div>

          {/* Card 2: Backend */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">2. Node.js & Express</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              RESTful API controllers validating payloads and managing Python ML child-processes.
            </p>
            <div className="pt-2 text-xs font-semibold text-indigo-600">Express.js • CORS • child_process</div>
          </div>

          {/* Card 3: Machine Learning */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">3. Python ML Model</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ensemble Random Forest Regression model trained on 100 decision trees to forecast arrival durations.
            </p>
            <div className="pt-2 text-xs font-semibold text-amber-600">Scikit-learn • Pandas • Joblib</div>
          </div>

          {/* Card 4: Database */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">4. MongoDB Database</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Persistent document storage retaining complete route parameters and historical predictions.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-600">MongoDB • Mongoose ODM</div>
          </div>
        </div>
      </section>

      {/* Input Features Summary Box */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <span>7 Machine Learning Input Features & Target</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block mb-0.5">1. Bus Number</span>
            <span className="text-slate-500">Route identifier e.g. Route 101 Express</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block mb-0.5">2. Source</span>
            <span className="text-slate-500">Origin station / starting bus stop</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block mb-0.5">3. Destination</span>
            <span className="text-slate-500">Target terminus location</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block mb-0.5">4. Distance</span>
            <span className="text-slate-500">Total route distance in kilometers</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block mb-0.5">5. Traffic Condition</span>
            <span className="text-slate-500">Categorized as Low (1), Medium (2), High (3)</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block mb-0.5">6. Current Time</span>
            <span className="text-slate-500">Evaluates peak rush hour congestion (HH:MM)</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block mb-0.5">7. Bus Frequency</span>
            <span className="text-slate-500">Interval headway between buses in minutes</span>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-950">
            <span className="font-bold block mb-0.5 text-blue-800">Target: Arrival Time</span>
            <span className="text-blue-600 font-semibold">Predicted transit duration in minutes</span>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Prediction } from './pages/Prediction';
import { Result } from './pages/Result';
import { History } from './pages/History';
import { MLInspectorModal } from './components/MLInspectorModal';
import { PageView, PredictionData } from './types';
import { Bus, Github, Cpu, Database } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [latestPrediction, setLatestPrediction] = useState<PredictionData | null>(null);

  const handlePredictionSuccess = (prediction: PredictionData) => {
    setLatestPrediction(prediction);
    setCurrentPage('result');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Navbar */}
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}

        {currentPage === 'predict' && (
          <Prediction onSuccess={handlePredictionSuccess} />
        )}

        {currentPage === 'result' && (
          <Result
            prediction={latestPrediction}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'history' && <History onNavigate={setCurrentPage} />}

        {currentPage === 'ml-explorer' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Machine Learning Model & Project Codebase
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Inspect Random Forest parameters, training evaluation metrics, and full file-by-file source code.
              </p>
            </div>
            <MLInspectorModal />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Bus className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-800 block">
                BUS ARRIVAL TIME PREDICTION SYSTEM
              </span>
              <span>College Capstone Full Stack Web Application</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500 flex-wrap justify-center">
            <span>React.js</span>
            <span>•</span>
            <span>Node.js Express</span>
            <span>•</span>
            <span>Python Random Forest</span>
            <span>•</span>
            <span>MongoDB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

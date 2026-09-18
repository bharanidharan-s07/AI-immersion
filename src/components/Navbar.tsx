import React from 'react';
import { Bus, Clock, History as HistoryIcon, Home as HomeIcon, Cpu, Code2 } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          id="nav-brand-button"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
              BUS ARRIVAL TIME
            </div>
            <div className="text-xs font-semibold text-blue-600 tracking-wider">
              PREDICTION SYSTEM
            </div>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onNavigate('home')}
            id="nav-btn-home"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'home'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </button>

          <button
            onClick={() => onNavigate('predict')}
            id="nav-btn-predict"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'predict' || currentPage === 'result'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Predict Arrival</span>
          </button>

          <button
            onClick={() => onNavigate('history')}
            id="nav-btn-history"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'history'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HistoryIcon className="w-4 h-4" />
            <span>History</span>
          </button>

          <button
            onClick={() => onNavigate('ml-explorer')}
            id="nav-btn-ml-explorer"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'ml-explorer'
                ? 'bg-amber-50 text-amber-800 font-semibold border border-amber-200'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
            title="View Machine Learning model metrics and full college project code files"
          >
            <Cpu className="w-4 h-4 text-amber-600" />
            <span className="hidden md:inline">ML & Project Code</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import QuizPage from './features/quizzes/pages/QuizPage';
import { Shield, GraduationCap } from 'lucide-react';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Header / Portal Navbar */}
      <header className="glass-panel border-b border-slate-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-indigo-500/20 font-outfit">
              L
            </div>
            <div>
              <h1 className="font-outfit font-bold text-lg tracking-tight text-white">LMS Portal</h1>
              <p className="text-xs text-indigo-400 font-medium font-outfit">Slot 5 - Shared Progress</p>
            </div>
          </div>

          {/* Toggle Switches for Admin vs Learner Mode */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/60">
            <button
              onClick={() => setIsAdmin(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !isAdmin 
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/10' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap size={16} />
              Learner Portal
            </button>
            <button
              onClick={() => setIsAdmin(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isAdmin 
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md shadow-purple-500/10' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield size={16} />
              Admin Portal
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuizPage isAdmin={isAdmin} />
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-950 text-center text-xs text-slate-500">
        © 2026 Learning Management System. Built with React & PostgreSQL.
      </footer>
    </div>
  );
}

export default App;

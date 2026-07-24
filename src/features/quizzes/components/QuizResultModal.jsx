import React from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Award } from 'lucide-react';

export default function QuizResultModal({ result, onRetry }) {
  const { score, is_passed, officialScore, scoreRule, remainingRetries, canRetry } = result;

  return (
    <div className="glass-panel rounded-3xl p-8 max-w-md mx-auto border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
      
      {/* Decorative Glow Background */}
      <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full blur-3xl opacity-20 ${
        is_passed ? 'bg-emerald-500' : 'bg-rose-500'
      }`} />

      {/* Dynamic Status Icon Header */}
      <div className="space-y-3">
        <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-lg ${
          is_passed 
            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-emerald-500/5' 
            : 'bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-rose-500/5'
        }`}>
          {is_passed ? <Trophy size={40} /> : <XCircle size={40} />}
        </div>
        
        <div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-outfit uppercase tracking-wider ${
            is_passed 
              ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/20' 
              : 'bg-rose-950/50 text-rose-400 border border-rose-500/20'
          }`}>
            {is_passed ? 'Passed' : 'Failed'}
          </span>
        </div>
      </div>

      {/* Score Indicators */}
      <div className="space-y-1">
        <div className="text-sm font-semibold text-slate-400">Attempt Score</div>
        <div className="text-5xl font-extrabold font-outfit text-white tracking-tight">{score}%</div>
      </div>

      {/* D-08 Decision Mapping Card */}
      <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 text-left space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 border-b border-slate-900 pb-2">
          <Award size={16} />
          <span className="text-xs font-bold uppercase tracking-wider font-outfit">Decision D-08 Evaluation</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Official Score</span>
            <span className="text-base font-extrabold text-white">{officialScore}%</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Calculation Rule</span>
            <span className="text-xs font-semibold text-slate-300 capitalize">{scoreRule} Score Counts</span>
          </div>
        </div>
      </div>

      {/* Retries Limit Indicator */}
      <div className="text-sm font-medium text-slate-300">
        {remainingRetries > 0 ? (
          <span>You have <strong className="text-indigo-400">{remainingRetries}</strong> retries remaining.</span>
        ) : (
          <span className="text-rose-400 font-semibold">No retries left. Attempt limit reached.</span>
        )}
      </div>

      {/* Retry Action Trigger */}
      {canRetry && (
        <button
          onClick={onRetry}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all text-sm"
        >
          <RotateCcw size={16} /> Retry Quiz
        </button>
      )}

    </div>
  );
}

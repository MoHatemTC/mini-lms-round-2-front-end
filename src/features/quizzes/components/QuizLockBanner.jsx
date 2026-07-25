import React from 'react';
import { Lock, BookOpen, AlertCircle } from 'lucide-react';

export default function QuizLockBanner({ requiredMaterialId, onSimulateUnlock }) {
  return (
    <div className="glass-panel rounded-3xl p-8 max-w-xl mx-auto border border-rose-500/20 shadow-xl shadow-rose-950/10 text-center space-y-6">
      
      {/* Padlock Icon Indicator */}
      <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
        <Lock size={32} />
      </div>

      <div className="space-y-2">
        <h3 className="font-outfit font-bold text-xl text-white">Quiz is Locked</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          To maintain structured learning progress, this quiz unlocks only after completing the required prerequisite materials.
        </p>
      </div>

      {/* Prerequisite Detail Card */}
      <div className="bg-slate-950/80 rounded-xl p-4 flex items-center gap-3 border border-slate-900 justify-start max-w-md mx-auto">
        <BookOpen className="text-indigo-400 shrink-0" size={20} />
        <div className="text-left">
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Required Material</span>
          <code className="text-xs text-indigo-300 font-mono font-medium">{requiredMaterialId}</code>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
        {/* Simulate Complete Prerequisite Button */}
        <button
          onClick={onSimulateUnlock}
          className="flex-grow flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-500/15"
        >
          Mark Prerequisite Completed
        </button>
      </div>

      <div className="flex items-center gap-1.5 justify-center text-xs text-rose-400 font-medium">
        <AlertCircle size={14} />
        <span>Prerequisite check depends on Slot 4 Completed Materials signal.</span>
      </div>

    </div>
  );
}

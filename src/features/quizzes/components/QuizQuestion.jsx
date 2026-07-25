import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function QuizQuestion({ 
  question, 
  qIndex, 
  selectedChoiceId, 
  onSelectChoice, 
  isValidationWarning 
}) {
  return (
    <div className={`glass-panel rounded-2xl p-6 transition-all duration-300 ${
      isValidationWarning 
        ? 'border-rose-500/50 shadow-lg shadow-rose-950/20 ring-1 ring-rose-500/30' 
        : 'border-slate-800/80 hover:border-indigo-500/25'
    }`}>
      
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-indigo-400 font-outfit uppercase tracking-wider">
            Question #{qIndex + 1}
          </span>
          <h4 className="text-base font-semibold text-white leading-relaxed">
            {question.question_text}
          </h4>
        </div>
        <span className="shrink-0 text-xs font-bold font-mono px-2.5 py-1 bg-slate-900 border border-slate-800 text-indigo-300 rounded-lg">
          {question.points} pts
        </span>
      </div>

      {/* Choice Buttons List */}
      <div className="space-y-2.5">
        {question.choices.map((choice) => {
          const isSelected = selectedChoiceId === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => onSelectChoice(question.id, choice.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200 flex items-center gap-3 ${
                isSelected
                  ? 'bg-indigo-600/15 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/5'
                  : 'bg-slate-950/40 border-slate-900/60 hover:bg-slate-900/60 text-slate-300 hover:text-slate-100 hover:border-slate-800'
              }`}
            >
              {/* Radio Indicator */}
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                isSelected 
                  ? 'border-indigo-500 bg-indigo-500 text-white' 
                  : 'border-slate-700 bg-slate-950'
              }`}>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
              <span>{choice.choice_text}</span>
            </button>
          );
        })}
      </div>

      {/* Missing Answer Alert */}
      {isValidationWarning && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
          <AlertCircle size={14} />
          <span>This question is required before submitting.</span>
        </div>
      )}

    </div>
  );
}

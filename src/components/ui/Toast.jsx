import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export function Toast({ message, onClose }) {
  if (!message || !message.text) return null;

  const isError = message.type === 'error';

  return (
    <div 
      role={isError ? 'alert' : 'status'} 
      aria-live={isError ? 'assertive' : 'polite'} 
      className="fixed bottom-6 right-6 z-50 animate-fade-in"
    >
      <div className={`px-4 py-3 rounded-xl flex items-center gap-3 shadow-xl border ${
        isError 
          ? 'bg-white border-red-100 text-red-700' 
          : 'bg-gray-900 border-gray-800 text-white'
      }`}>
        {isError ? (
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" aria-hidden="true" />
        ) : (
          <CheckCircle className="w-5 h-5 shrink-0 text-green-400" aria-hidden="true" />
        )}
        
        <div className="font-medium text-sm">{message.text}</div>
        
        <button 
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Dismiss message"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

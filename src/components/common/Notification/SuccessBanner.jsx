import React, { useState, useEffect } from 'react';

const SuccessBanner = ({ title = 'Success!', message, onDismiss, actionText, onAction }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 300); 
  };

  const getStateClasses = () => {
    if (!isMounted) return 'opacity-0 -translate-y-4 scale-95 h-0 overflow-hidden py-0 border-0 mb-0';
    if (isClosing) return 'opacity-0 -translate-y-2 scale-95 h-0 overflow-hidden py-0 border-0 mb-0';
    return 'opacity-100 translate-y-0 scale-100 mb-6';
  };

  return (
    <div className={`bg-green-50/80 border border-green-200 rounded-xl p-4 sm:p-5 shadow-sm transition-all duration-300 transform origin-top w-full max-w-4xl mx-auto ${getStateClasses()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <svg className="h-6 w-6 text-green-500 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div className="ml-3.5 w-0 flex-1">
          <p className="text-sm font-extrabold text-green-800 tracking-tight">{title}</p>
          {message && <p className="mt-1 text-sm text-green-700 font-medium leading-relaxed">{message}</p>}
          
          {actionText && onAction && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onAction}
                className="text-sm font-bold text-green-800 hover:text-green-900 bg-green-100 hover:bg-green-200 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-green-50 shadow-sm active:scale-95"
              >
                {actionText}
              </button>
            </div>
          )}
        </div>
        
        {onDismiss && (
          <div className="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              onClick={handleDismiss}
              className="inline-flex rounded-lg p-1.5 text-green-600 hover:bg-green-100 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 focus:ring-offset-green-50 transition-colors"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessBanner;

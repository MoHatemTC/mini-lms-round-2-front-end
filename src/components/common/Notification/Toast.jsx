import React, { useEffect, useState } from 'react';

const Toast = ({ toast, onDismiss }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animation safely after mount
    requestAnimationFrame(() => setIsMounted(true));

    const timer = setTimeout(() => {
      handleClose();
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onDismiss();
    }, 300); // match Tailwind duration-300
  };

  const getIcon = () => {
    if (toast.type === 'success') {
      return (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      );
    }
    if (toast.type === 'error') {
      return (
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    );
  };

  const getStateClasses = () => {
    if (!isMounted) return 'opacity-0 translate-y-4 scale-95';
    if (isClosing) return 'opacity-0 translate-y-2 scale-95';
    return 'opacity-100 translate-y-0 scale-100';
  };

  return (
    <div 
      className={`pointer-events-auto w-full max-w-sm bg-white border border-gray-100 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden transition-all duration-300 transform origin-bottom-right ${getStateClasses()}`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {getIcon()}
          </div>
          <div className="ml-3.5 w-0 flex-1">
            <p className="text-sm font-bold text-gray-900 tracking-tight">{toast.title}</p>
            <p className="mt-1 text-sm text-gray-500 font-medium leading-relaxed">{toast.message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={handleClose}
              className="bg-gray-50 rounded-lg p-1.5 inline-flex text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;

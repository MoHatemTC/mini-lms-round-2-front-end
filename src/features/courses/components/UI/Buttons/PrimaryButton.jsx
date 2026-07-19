import React from 'react';

const PrimaryButton = ({ children, isLoading, disabled, onClick, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`relative px-8 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 w-full sm:w-auto text-center active:scale-95 flex items-center justify-center min-w-[140px] ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;

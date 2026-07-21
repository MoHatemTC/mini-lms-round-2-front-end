import React from 'react';

const SecondaryButton = ({ children, disabled, onClick, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:text-gray-900 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-100 w-full sm:w-auto text-center active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;

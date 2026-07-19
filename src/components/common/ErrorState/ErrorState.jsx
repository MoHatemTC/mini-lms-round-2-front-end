import React from 'react';

const ErrorState = ({
  icon,
  title,
  description,
  onRetry,
  retryText = "Try Again",
  secondaryAction,
  secondaryActionText,
  variant = 'danger' 
}) => {
  const getTheme = () => {
    switch (variant) {
      case 'warning':
        return {
          bg: 'bg-orange-50/50',
          iconBox: 'bg-orange-100',
          text: 'text-orange-600',
          button: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500'
        };
      case 'info':
        return {
          bg: 'bg-blue-50/50',
          iconBox: 'bg-blue-100',
          text: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        };
      default:
        return {
          bg: 'bg-red-50/50',
          iconBox: 'bg-red-100',
          text: 'text-red-600',
          button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
        };
    }
  };

  const theme = getTheme();

  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-gray-200 shadow-sm w-full max-w-2xl mx-auto transition-colors ${theme.bg}`}>
      <div className={`flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full ${theme.iconBox} mb-6 shadow-sm`}>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${theme.text}`}>
          {icon || (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          )}
        </div>
      </div>
      
      <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">{title}</h3>
      
      <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-lg leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
        {onRetry && (
          <button
            onClick={onRetry}
            className={`inline-flex items-center justify-center px-6 py-2.5 rounded-lg shadow-sm text-sm font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 w-full sm:w-auto ${theme.button}`}
          >
            {retryText}
          </button>
        )}
        {secondaryAction && secondaryActionText && (
          <button
            onClick={secondaryAction}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 active:scale-95 w-full sm:w-auto"
          >
            {secondaryActionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;

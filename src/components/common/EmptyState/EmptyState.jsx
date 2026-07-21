import React from 'react';

const EmptyState = ({ 
  icon, 
  title, 
  description, 
  actionText, 
  onAction,
  secondaryActionText,
  onSecondaryAction,
  type = 'default' 
}) => {
  const getColors = () => {
    switch (type) {
      case 'success': 
        return { 
          bg: 'bg-green-50', 
          iconBox: 'bg-green-100',
          text: 'text-green-600', 
          button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
        };
      case 'error': 
        return { 
          bg: 'bg-red-50', 
          iconBox: 'bg-red-100',
          text: 'text-red-600', 
          button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
        };
      default: 
        return { 
          bg: 'bg-white', 
          iconBox: 'bg-blue-50',
          text: 'text-blue-600', 
          button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
        };
    }
  };
  
  const colors = getColors();

  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-gray-200 shadow-sm max-w-2xl mx-auto w-full transition-colors ${colors.bg}`}>
      <div className={`flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full ${colors.iconBox} mb-6 shadow-inner`}>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.text}`}>
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">{title}</h3>
      
      <p className="text-sm sm:text-base text-gray-500 mb-8 max-w-md leading-relaxed">
        {description}
      </p>

      {(actionText || secondaryActionText) && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          {actionText && (
            <button
              onClick={onAction}
              className={`inline-flex items-center justify-center px-6 py-2.5 rounded-lg shadow-sm text-sm font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 w-full sm:w-auto ${colors.button}`}
            >
              {actionText}
            </button>
          )}
          {secondaryActionText && (
            <button
              onClick={onSecondaryAction}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 active:scale-95 w-full sm:w-auto"
            >
              {secondaryActionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;

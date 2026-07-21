import React from 'react';

const ProgressBar = ({ progress, status }) => {
  let colorClass = 'bg-blue-600';
  if (status === 'Completed') colorClass = 'bg-green-500';
  if (status === 'Failed') colorClass = 'bg-red-500';

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
      <div 
        className={`${colorClass} h-1.5 rounded-full transition-all duration-300 ease-out`} 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

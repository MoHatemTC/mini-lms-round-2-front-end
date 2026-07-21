import React from 'react';

const CourseInfoGrid = ({ details }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {details.map((item, index) => (
        <div key={index} className="flex flex-col gap-1.5 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-colors">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.label}</span>
          <span className="text-sm font-semibold text-gray-900">{item.value || 'Not specified'}</span>
        </div>
      ))}
    </div>
  );
};

export default CourseInfoGrid;

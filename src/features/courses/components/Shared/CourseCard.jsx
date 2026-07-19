import React from 'react';

const CourseCard = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default CourseCard;

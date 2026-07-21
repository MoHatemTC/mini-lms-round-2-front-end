import React from 'react';

const CourseStatusBadge = ({ status, className = '' }) => {
  let color = 'bg-gray-100 text-gray-800';
  if (status === 'Published') color = 'bg-green-100 text-green-800';
  if (status === 'Draft') color = 'bg-yellow-100 text-yellow-800';
  if (status === 'Archived') color = 'bg-red-100 text-red-800';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${color} ${className}`}>
      {status}
    </span>
  );
};

export default CourseStatusBadge;

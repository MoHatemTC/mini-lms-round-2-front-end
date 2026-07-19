import React from 'react';

const SectionTitle = ({ title, description }) => {
  return (
    <div className="mb-6 border-b border-gray-100 pb-4">
      <h2 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
      {description && <p className="mt-1.5 text-sm text-gray-500 font-medium">{description}</p>}
    </div>
  );
};

export default SectionTitle;

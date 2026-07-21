import React from 'react';

const CourseFormSkeleton = () => (
  <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 animate-pulse flex flex-col gap-8 w-full">
    <div className="space-y-5">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
      <div className="h-28 bg-gray-100 rounded-lg w-full"></div>
    </div>
    
    <div className="space-y-5">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-12 bg-gray-100 rounded-lg"></div>
        <div className="h-12 bg-gray-100 rounded-lg"></div>
        <div className="h-12 bg-gray-100 rounded-lg"></div>
        <div className="h-12 bg-gray-100 rounded-lg"></div>
      </div>
    </div>

    <div className="mt-4 pt-6 border-t border-gray-100 flex justify-end gap-4">
      <div className="h-11 w-24 bg-gray-200 rounded-lg"></div>
      <div className="h-11 w-32 bg-blue-200 rounded-lg"></div>
    </div>
  </div>
);

export default CourseFormSkeleton;

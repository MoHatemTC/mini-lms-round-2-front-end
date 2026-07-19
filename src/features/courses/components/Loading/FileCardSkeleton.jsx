import React from 'react';

const FileCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm animate-pulse w-full">
    <div className="w-full h-36 bg-gray-200 rounded-xl"></div>
    <div className="mt-4 px-2 pb-1 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="flex items-center justify-between mt-2">
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/5"></div>
      </div>
    </div>
  </div>
);

export default FileCardSkeleton;

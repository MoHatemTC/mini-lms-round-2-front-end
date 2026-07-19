import React from 'react';

const CourseListSkeleton = ({ rows = 5 }) => (
  <div className="w-full overflow-hidden border border-gray-200 rounded-b-2xl animate-pulse bg-white">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <th key={i} className="px-6 py-4">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[1, 2, 3, 4, 5, 6, 7].map(colIndex => (
              <td key={colIndex} className="px-6 py-5 whitespace-nowrap">
                <div className="h-4 bg-gray-100 rounded w-full"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CourseListSkeleton;

import React, { memo } from 'react';
import { Link } from 'react-router'; 
import CourseStatusBadge from '../Shared/CourseStatusBadge';

const CourseTable = ({ courses, isLoading, onDelete }) => {
  if (isLoading) {
    return (
      <div className="w-full overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[1, 2, 3, 4, 5, 6, 7].map(i => (
                <th key={i} className="px-6 py-4"><div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div></th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row}>
                {[1, 2, 3, 4, 5, 6, 7].map(col => (
                  <td key={col} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        <h3 className="text-sm font-medium text-gray-900">No courses found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Track</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course.id} className="hover:bg-primary/5 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">{course.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{course.track}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{course.level}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{course.duration}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <CourseStatusBadge status={course.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-4 opacity-100 sm:opacity-80 group-hover:opacity-100 transition-opacity">
                  <button disabled className="text-gray-400 cursor-not-allowed flex items-center gap-1 focus-visible:outline-none rounded px-1" title="View requires backend integration" aria-label={`View ${course.title} (Disabled)`}>View</button>
                  <button disabled className="text-gray-400 cursor-not-allowed flex items-center gap-1 focus-visible:outline-none rounded px-1" title="Edit requires backend integration" aria-label={`Edit ${course.title} (Disabled)`}>Edit</button>
                  <button 
                    onClick={() => onDelete(course.id)} 
                    className="text-red-600 hover:text-red-900 transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none rounded px-1"
                    aria-label={`Delete ${course.title}`}
                  >
                    Delete
                  </button>
                  <button 
                    disabled
                    className="text-gray-400 cursor-not-allowed flex items-center gap-1"
                    title="Publishing requires backend integration"
                    aria-label={`Publish ${course.title} (Disabled)`}
                  >
                    Publish
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(CourseTable);

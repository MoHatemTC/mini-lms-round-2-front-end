import React from 'react';
import FileCard from '../UI/Files/FileCard';

const CoursePreviewFiles = ({ files }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900 border-l-4 border-blue-500 pl-3">Uploaded Files</h3>
        <span className="text-xs font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm">
          {files.length} {files.length === 1 ? 'File' : 'Files'}
        </span>
      </div>
      
      {files.length === 0 ? (
        <div className="text-center py-16 px-4 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p className="text-sm text-gray-500 font-semibold">No files uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {files.map((file, index) => (
            <FileCard key={index} file={file} isPreviewMode={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursePreviewFiles;

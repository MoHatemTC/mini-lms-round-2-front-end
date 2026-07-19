import React from 'react';

const FileIcon = ({ type, name }) => {
  const ext = name.split('.').pop().toLowerCase();
  
  let colorClass = 'text-gray-500 bg-gray-100';
  let IconSVG = null;

  if (['mp4', 'mov', 'webm'].includes(ext) || type.startsWith('video/')) {
    colorClass = 'text-purple-600 bg-purple-50';
    IconSVG = (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
  } else if (['pdf'].includes(ext) || type === 'application/pdf') {
    colorClass = 'text-red-600 bg-red-50';
    IconSVG = (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    );
  } else if (['png', 'jpg', 'jpeg'].includes(ext) || type.startsWith('image/')) {
    colorClass = 'text-blue-600 bg-blue-50';
    IconSVG = (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  } else {
    colorClass = 'text-green-600 bg-green-50';
    IconSVG = (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  }

  return (
    <div className={`flex items-center justify-center p-2.5 rounded-lg flex-shrink-0 ${colorClass}`}>
      {IconSVG}
    </div>
  );
};

export default FileIcon;

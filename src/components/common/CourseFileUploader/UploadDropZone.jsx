import React, { useRef, useState } from 'react';

const UploadDropZone = ({ onFilesSelected, acceptedTypes, multiple }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      // Reset so same file can be selected again if removed
      e.target.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isDragActive ? 'border-blue-500 bg-blue-50 scale-[1.01]' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileDialog}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openFileDialog();
        }
      }}
      role="button"
      aria-label="Upload file area"
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={acceptedTypes}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
      />
      <div className="mb-4 bg-white p-4 rounded-full shadow-sm text-blue-500">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 text-center">
        Drag files here
      </h3>
      <p className="text-sm text-gray-500 mt-2 text-center">
        or <span className="text-blue-600 font-medium hover:underline">Click to browse</span>
      </p>
      <p className="text-xs text-gray-400 mt-4 text-center max-w-md leading-relaxed">
        Supported formats: Video (.mp4, .mov, .webm), PDF, Image, Document (.docx, .pptx, .zip)<br />
        Max file size: 200 MB
      </p>
    </div>
  );
};

export default UploadDropZone;

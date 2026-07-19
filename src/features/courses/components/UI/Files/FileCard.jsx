import React from 'react';

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const FileCard = ({ file, onRemove, onRetry, onOpen, isPreviewMode = false }) => {
  const { name, size, status, progress, type, url, previewUrl } = file;
  const extension = name ? name.split('.').pop().toUpperCase() : 'FILE';
  const fileType = type || '';
  const fileUrl = url || previewUrl;

  // Render static media preview if in preview mode
  if (isPreviewMode) {
    if (fileType.includes('video')) {
      return (
        <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="w-full h-36 bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden border border-gray-900 shadow-inner">
            {fileUrl ? (
              <video src={fileUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
            ) : (
              <div className="absolute inset-0 bg-gray-800"></div>
            )}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                 <svg className="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
               </div>
            </div>
          </div>
          <div className="mt-4 px-2 pb-1">
            <p className="text-sm font-bold text-gray-900 truncate" title={name}>{name || 'Unknown File'}</p>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span className="font-medium text-gray-600">Video</span>
              <span className="font-bold bg-gray-100/80 px-2 py-0.5 rounded text-gray-600">{formatBytes(size || 0)}</span>
            </div>
          </div>
        </div>
      );
    }

    if (fileType.includes('image')) {
      return (
        <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center shadow-inner">
            {fileUrl ? (
              <img 
                src={fileUrl} 
                alt="Preview" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'/%3E%3C/svg%3E";
                  e.target.className = "w-10 h-10 object-contain text-gray-400";
                }}
              />
            ) : (
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            )}
          </div>
          <div className="mt-4 px-2 pb-1">
            <p className="text-sm font-bold text-gray-900 truncate" title={name}>{name}</p>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span className="font-medium text-gray-600">Image</span>
              <span className="font-bold bg-gray-100/80 px-2 py-0.5 rounded text-gray-600">{formatBytes(size || 0)}</span>
            </div>
          </div>
        </div>
      );
    }
  }

  // Active Upload / Standard Document Card layout
  const getStatusBadge = () => {
    switch (status) {
      case 'Completed':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] uppercase font-bold rounded">Completed</span>;
      case 'Uploading':
        return <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] uppercase font-bold rounded">Uploading</span>;
      case 'Failed':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] uppercase font-bold rounded">Failed</span>;
      default:
        return <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] uppercase font-bold rounded">Ready</span>;
    }
  };

  return (
    <div className={`flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:border-gray-300 transition-colors ${isPreviewMode ? 'w-full' : ''}`}>
      
      {/* Icon based on type */}
      <div className={`w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center shadow-inner border ${fileType.includes('pdf') ? 'bg-red-50 border-red-100 text-red-500' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
         {fileType.includes('pdf') ? (
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
         ) : (
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
         )}
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-semibold text-gray-900 truncate pr-4" title={name}>
            {name}
          </h4>
          {!isPreviewMode && (
            <div className="flex-shrink-0 flex items-center">
               {getStatusBadge()}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2.5 text-xs text-gray-500 font-medium">
          <span className="uppercase tracking-wider">{extension}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>{formatBytes(size)}</span>
          {status === 'Uploading' && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="text-primary font-medium">{progress}%</span>
            </>
          )}
        </div>

        {status === 'Uploading' && (
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 mt-2 overflow-hidden">
            <div className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>

      {!isPreviewMode && onRemove && (
        <div className="flex items-center gap-1.5 ml-2 border-l border-gray-100 pl-4">
           {!isPreviewMode && onOpen && (status === 'Completed' || file.url || file.previewUrl) && (
             <button type="button" onClick={() => onOpen(file.id)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title="Open File">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </button>
           )}
           <button type="button" onClick={() => onRemove(file.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileCard;

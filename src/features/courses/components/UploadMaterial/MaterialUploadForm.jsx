import React, { useState, useRef } from 'react';
import { UploadCloud, X, File as FileIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Label } from '../../../../components/ui/Label';
import { Button } from '../../../../components/ui/Button';
import courseService from '../../../../services/courseService';

const materialTypes = [
  { value: 'Video', label: 'Video' },
  { value: 'PDF', label: 'PDF Document' },
  { value: 'Image', label: 'Image' },
  { value: 'Audio', label: 'Audio' },
  { value: 'Document', label: 'Other Document' }
];

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function MaterialUploadForm({ courseId, onUploadSuccess, onCancel }) {
  const [materialType, setMaterialType] = useState('Video');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage({ type: '', text: '' });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadProgress(0);
    setMessage({ type: '', text: '' });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Please select a file to upload.' });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setMessage({ type: '', text: '' });

    try {
      const metadata = { materialType };
      const response = await courseService.uploadCourseFile(courseId, selectedFile, metadata, (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      setMessage({ type: 'success', text: 'File uploaded successfully!' });
      
      onUploadSuccess(response);

      setTimeout(() => {
        handleRemoveFile();
      }, 3000);

    } catch (error) {
      setMessage({ type: 'error', text: error?.message || 'Failed to upload file. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Material Type Selector */}
      <div className="space-y-2">
        <Label htmlFor="materialType">Material Type</Label>
        <select
          id="materialType"
          value={materialType}
          onChange={(e) => {
            setMaterialType(e.target.value);
            handleRemoveFile();
          }}
          className="flex h-10 w-full rounded-[20px] border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all cursor-pointer"
        >
          {materialTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* File Uploader */}
      <div className="space-y-2">
        <Label>Select File</Label>
        
        {!selectedFile ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50/50 hover:border-primary/50 transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Click to browse for a file"
          >
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Click to upload</h3>
            <p className="text-xs text-gray-500">Video, PDF, Image, or Audio (max. 100MB)</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4 overflow-hidden">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                <FileIcon className="w-5 h-5" />
              </div>
              <div className="truncate">
                <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <span>{formatFileSize(selectedFile.size)}</span>
                  <span>&bull;</span>
                  <span className="uppercase font-semibold tracking-wider">{selectedFile.name.split('.').pop()}</span>
                </p>
              </div>
            </div>
            {!isUploading && (
              <button 
                onClick={handleRemoveFile}
                className="text-gray-400 hover:text-red-500 p-2 transition-colors shrink-0 rounded-full hover:bg-red-50"
                aria-label="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept={
            materialType === 'Video' ? 'video/*' : 
            materialType === 'Image' ? 'image/*' : 
            materialType === 'Audio' ? 'audio/*' : 
            materialType === 'PDF' ? 'application/pdf' : 
            '*/*'
          }
        />
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2 animate-fade-in" aria-live="polite">
          <div className="flex justify-between text-xs text-gray-600 font-medium">
            <span className="flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" /> Uploading...
            </span>
            <span>{uploadProgress}%</span>
          </div>
          <div 
            className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner"
            role="progressbar"
            aria-valuenow={uploadProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Messages */}
      {message.text && (
        <div 
          role={message.type === 'error' ? 'alert' : 'status'}
          aria-live={message.type === 'error' ? 'assertive' : 'polite'}
          className={`p-4 rounded-xl flex items-start gap-3 text-sm animate-fade-in shadow-sm border ${
            message.type === 'error' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'
          }`}
        >
          {message.type === 'error' ? (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <div>
            <span className="font-medium">{message.type === 'error' ? 'Error: ' : 'Success: '}</span>
            {message.text}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
        <Button 
          variant="ghost" 
          onClick={onCancel}
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="min-w-[140px]"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading
            </>
          ) : (
            <>
              <UploadCloud className="w-4 h-4 mr-2" />
              Upload File
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import UploadDropZone from './UploadDropZone';
import FileCard from '../../features/courses/components/UI/Files/FileCard';
import courseService from '../../../../services/courseService';

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200 MB
const DEFAULT_ACCEPTED_TYPES = '.mp4,.mov,.webm,.pdf,.png,.jpg,.jpeg,.docx,.pptx,.zip';

const generateId = () => Math.random().toString(36).substring(2, 9);

const CourseFileUploader = ({ 
  courseId,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES, 
  maxSize = MAX_FILE_SIZE, 
  multiple = true,
  onFilesChange 
}) => {
  const [files, setFiles] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // Notify parent on change
  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files);
    }
  }, [files, onFilesChange]);

  const simulateUpload = async (fileId, rawFile, courseId) => {
    try {
      if (!courseId) {
        // If course is not yet created, we can't upload to a specific course.
        // For now, simulate success or error gracefully.
        setTimeout(() => {
          setFiles(prevFiles => prevFiles.map(f => 
            f.id === fileId ? { ...f, progress: 100, status: 'Completed' } : f
          ));
        }, 1000);
        return;
      }
      
      const response = await courseService.uploadCourseFile(courseId, rawFile, (progressEvent) => {
         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
         setFiles(prevFiles => prevFiles.map(f => 
           f.id === fileId ? { ...f, progress: percentCompleted } : f
         ));
      });
      
      // The backend returns an ApiResponse where data is the updated course.
      // We find our file in the course.files array by original_name
      const updatedCourse = response?.data;
      const uploadedFileMeta = updatedCourse?.files?.find(f => f.original_name === rawFile.name);
      
      const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';
      const fileUrl = uploadedFileMeta ? `${apiBase}/uploads/${uploadedFileMeta.id}/preview` : null;
      
      setFiles(prevFiles => prevFiles.map(f => 
        f.id === fileId ? { ...f, progress: 100, status: 'Completed', url: fileUrl } : f
      ));
    } catch (error) {
      setFiles(prevFiles => prevFiles.map(f => 
        f.id === fileId ? { ...f, status: 'Failed', error: error.message } : f
      ));
    }
  };

  const handleFilesSelected = (selectedFiles) => {
    setErrorMessages([]);
    
    const newValidFiles = [];
    const newErrors = [];
    
    // Parse accepted extensions (e.g., [".mp4", ".mov", ".pdf"])
    const acceptedExts = acceptedTypes.split(',').map(ext => ext.trim().toLowerCase());

    selectedFiles.forEach((file) => {
      // Size check
      if (file.size > maxSize) {
        newErrors.push(`"${file.name}" exceeds the maximum size of ${maxSize / (1024 * 1024)} MB.`);
        return;
      }
      
      // Duplicate check (by name and size)
      const isDuplicate = files.some(f => f.name === file.name && f.size === file.size);
      if (isDuplicate) {
        newErrors.push(`"${file.name}" is already selected.`);
        return;
      }
      
      // Type/Extension check
      const fileExt = '.' + file.name.split('.').pop().toLowerCase();
      // Allow if the extension is in accepted list OR if it's broadly allowed (like image/* which we don't have here, but good practice)
      if (!acceptedExts.includes(fileExt) && !acceptedExts.includes(file.type)) {
        newErrors.push(`"${file.name}" has an unsupported file type. Supported types: ${acceptedTypes}`);
        return;
      }
      
      const fileId = generateId();
      
      newValidFiles.push({
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'Uploading', // Begin uploading right away
        previewUrl: null,
        rawFile: file 
      });
    });

    if (newErrors.length > 0) {
      setErrorMessages(newErrors);
    }

    if (newValidFiles.length > 0) {
      setFiles(prevFiles => {
        const updatedFiles = multiple ? [...prevFiles, ...newValidFiles] : [...newValidFiles];
        return updatedFiles;
      });

      // Start upload simulation
      newValidFiles.forEach(f => {
        simulateUpload(f.id, f.rawFile, courseId);
      });
    }
  };

  const handleRemove = (fileId) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
  };

  const handleRetry = (fileId) => {
    // TODO: Implement retry logic when Axios is integrated
    // Reset file status to 'Uploading', progress to 0, and call simulateUpload/Axios
  };

  const handleOpen = (fileId) => {
    const file = files.find(f => f.id === fileId);
    const fileUrl = file?.url || file?.previewUrl;
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else if (file?.rawFile) {
      const objectUrl = URL.createObjectURL(file.rawFile);
      window.open(objectUrl, '_blank');
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <UploadDropZone 
        onFilesSelected={handleFilesSelected} 
        acceptedTypes={acceptedTypes}
        multiple={multiple} 
      />
      
      {errorMessages.length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-red-800 font-semibold mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Upload Errors</span>
          </div>
          <ul className="list-disc list-inside text-sm text-red-600 space-y-1 ml-1">
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Uploaded Files
            <span className="bg-gray-200 text-gray-700 py-0.5 px-2.5 rounded-full text-xs font-bold">
              {files.length}
            </span>
          </h4>
          <div className="flex flex-col gap-3">
            {files.map(file => (
              <FileCard 
                key={file.id} 
                file={file} 
                onRemove={handleRemove}
                onRetry={handleRetry}
                onOpen={handleOpen}
                isPreviewMode={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseFileUploader;

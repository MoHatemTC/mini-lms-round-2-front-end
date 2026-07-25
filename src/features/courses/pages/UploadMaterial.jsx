import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import courseService from '../../../services/courseService';
import MaterialUploadForm from '../components/UploadMaterial/MaterialUploadForm';
import MaterialList from '../components/UploadMaterial/MaterialList';

export default function UploadMaterial() {
  const { courseId } = useParams();
  
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const fetchMaterials = useCallback(async () => {
    try {
      setIsLoading(true);
      setFetchError('');
      const course = await courseService.getCourseById(courseId);
      setMaterials(course.files || course.materials || []);
    } catch (error) {
      console.error("Failed to fetch course details:", error);
      setFetchError('Failed to load materials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const handleUploadSuccess = (response) => {
    if (response && response.file) {
      setMaterials(prev => [...prev, response.file]);
    } else if (response && response.id) {
      setMaterials(prev => [...prev, response]);
    } else {
      fetchMaterials();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300 animate-fade-in">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/admin" className="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 font-medium">
                Admin
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mx-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link to="/admin/courses" className="hover:text-blue-600 transition-colors ml-1 md:ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 font-medium">
                  Courses
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mx-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-bold ml-1 md:ml-2">
                  Upload Material
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            Upload Course Material
          </h1>
          <p className="text-text-secondary mt-1">
            Add new learning resources to your course.
          </p>
        </div>

        <Card className="p-6 md:p-8 shadow-sm animate-slide-up">
          <MaterialUploadForm 
            courseId={courseId} 
            onUploadSuccess={handleUploadSuccess}
            onCancel={() => window.history.back()}
          />
        </Card>

        {/* Uploaded Materials List */}
        <Card className="p-6 md:p-8 shadow-sm animate-slide-up" style={{ animationDelay: '100ms' }}>
          <MaterialList 
            courseId={courseId}
            materials={materials}
            setMaterials={setMaterials}
            isLoading={isLoading}
            fetchError={fetchError}
            onRetry={fetchMaterials}
          />
        </Card>
      </div>
    </div>
  );
}

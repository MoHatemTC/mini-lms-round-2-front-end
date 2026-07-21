import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CourseForm from '../components/CreateCourse/CourseForm';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = useState(true);

  // Simulate initial page load for the skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm text-gray-500 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/admin" className="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 font-medium">
                Admin Dashboard
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
                  Create Course
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Section Title */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Create New Course</h1>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed">
            Fill in the details below to draft a new course for the learning management system. Fields marked with <span className="text-red-500 font-bold">*</span> are required.
          </p>
        </div>

        {/* Form Container */}
        <CourseForm onCancel={handleCancel} isLoadingSkeleton={initialLoading} />

      </div>
    </div>
  );
};

export default CreateCourse;

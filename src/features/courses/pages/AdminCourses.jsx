import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseFilters from '../components/AdminCourses/CourseFilters';
import CourseTable from '../components/AdminCourses/CourseTable';
import PublishCourseModal from '../components/AdminCourses/PublishCourseModal';
import UnpublishCourseModal from '../components/AdminCourses/UnpublishCourseModal';
import { Card } from '../../../components/ui/Card';
import { Toast } from '../../../components/ui/Toast';
import courseService from '../../../services/courseService';

export default function AdminCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [error, setError] = useState(null);
  
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [courseToPublish, setCourseToPublish] = useState(null);
  const [unpublishModalOpen, setUnpublishModalOpen] = useState(false);
  const [courseToUnpublish, setCourseToUnpublish] = useState(null);
  const [toastMessage, setToastMessage] = useState({ type: '', text: '' });

  const [courses, setCourses] = useState([
    {
      id: '1',
      title: 'Advanced React Patterns',
      track: 'Frontend',
      level: 'Advanced',
      duration: '8 Weeks',
      status: 'Published',
      createdAt: '2026-07-15'
    },
    {
      id: '2',
      title: 'Introduction to GraphQL',
      track: 'Backend',
      level: 'Beginner',
      duration: '4 Weeks',
      status: 'Draft',
      createdAt: '2026-07-20'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourses = useCallback(async (isMounted = true) => {
    setIsLoading(true);
    try {
      const response = await courseService.getAllCourses();
      if (isMounted && response?.data) {
        // If the backend returns data, use it over the mocks
        setCourses(Array.isArray(response.data) ? response.data : []);
      } else if (isMounted && Array.isArray(response)) {
        setCourses(response);
      }
    } catch (err) {
      // Silently fallback to mock data if backend isn't ready
      console.warn('Backend not ready, using mock courses data.');
    } finally {
      if (isMounted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchCourses(isMounted);
    return () => { isMounted = false; };
  }, [fetchCourses]);

  const handleDelete = useCallback((id) => {
    // Prevent default event to avoid navigation
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(prev => prev.filter(course => course.id !== id));
    }
  }, []);

  const handleOpenPublishModal = useCallback((course) => {
    setCourseToPublish(course);
    setPublishModalOpen(true);
  }, []);

  const handlePublishSuccess = useCallback((id) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, status: 'Published' } : course
    ));
    setToastMessage({ type: 'success', text: 'Course published successfully!' });
    setTimeout(() => setToastMessage({ type: '', text: '' }), 3000);
  }, []);

  const handleOpenUnpublishModal = useCallback((course) => {
    setCourseToUnpublish(course);
    setUnpublishModalOpen(true);
  }, []);

  const handleUnpublishSuccess = useCallback((id, response) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, status: response?.course?.status || response?.status || 'Draft' } : course
    ));
    setToastMessage({ type: 'success', text: response?.message || 'Course unpublished successfully!' });
    setTimeout(() => setToastMessage({ type: '', text: '' }), 3000);
    fetchCourses(true);
  }, [fetchCourses]);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (trackFilter !== 'All' && course.track !== trackFilter) return false;
      if (levelFilter !== 'All' && course.level !== levelFilter) return false;
      if (statusFilter !== 'All' && course.status !== statusFilter) return false;
      return true;
    });
  }, [courses, searchQuery, trackFilter, levelFilter, statusFilter]);

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            Courses Dashboard
          </h1>
          <p className="text-text-secondary mt-1">
            Manage and organize all platform courses.
          </p>
        </div>
        
        <Link 
          to="/admin/courses/create"
          className="btn-gradient text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-primary/20 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Create Course
        </Link>
      </div>

      {/* Main Content Area */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <Card className="shadow-soft animate-slide-up overflow-hidden">
        <CourseFilters 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          trackFilter={trackFilter} setTrackFilter={setTrackFilter}
          levelFilter={levelFilter} setLevelFilter={setLevelFilter}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        />
        <div className="border-t border-gray-100">
          <CourseTable 
            courses={filteredCourses} 
            isLoading={isLoading} 
            onDelete={handleDelete}
            onPublish={handleOpenPublishModal}
            onUnpublish={handleOpenUnpublishModal}
          />
        </div>
      </Card>

      <PublishCourseModal 
        isOpen={publishModalOpen}
        onClose={() => {
          setPublishModalOpen(false);
          setCourseToPublish(null);
        }}
        course={courseToPublish}
        onPublishSuccess={handlePublishSuccess}
      />

      <UnpublishCourseModal 
        isOpen={unpublishModalOpen}
        onClose={() => {
          setUnpublishModalOpen(false);
          setCourseToUnpublish(null);
        }}
        course={courseToUnpublish}
        onUnpublishSuccess={handleUnpublishSuccess}
      />
      
      <Toast 
        message={toastMessage} 
        onClose={() => setToastMessage({ type: '', text: '' })} 
      />
    </div>
  );
}

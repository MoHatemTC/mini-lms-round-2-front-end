import React, { useState, useCallback, useMemo } from 'react';
import { Plus } from 'lucide-react';
import CourseFilters from '../components/AdminCourses/CourseFilters';
import CourseTable from '../components/AdminCourses/CourseTable';
import CourseForm from '../components/CreateCourse/CourseForm';
import { Card } from '../../../components/ui/Card';

export default function AdminCourses() {
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [error, setError] = useState(null);

  // Mocking course list data until connected to backend API
  const [courses, setCourses] = useState([
    {
      id: '1',
      title: 'Advanced React Patterns',
      track: 'Frontend',
      level: 'Advanced',
      duration: '8 Weeks',
      status: 'Published',
      createdAt: '2026-07-15'
    }
  ]);

  const handleDelete = useCallback((id) => {
    // Prevent default event to avoid navigation
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(prev => prev.filter(course => course.id !== id));
    }
  }, []);

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
            {isCreating ? 'Create New Course' : 'Courses Dashboard'}
          </h1>
          <p className="text-text-secondary mt-1">
            {isCreating ? 'Draft the details of a new course.' : 'Manage and organize all platform courses.'}
          </p>
        </div>
        
        {!isCreating ? (
          <button 
            onClick={() => setIsCreating(true)}
            className="btn-gradient text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-primary/20 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Create Course
          </button>
        ) : (
          <button 
            onClick={() => setIsCreating(false)}
            className="px-5 py-2.5 rounded-xl font-medium border border-border text-text-secondary hover:bg-muted transition-colors"
          >
            Back to Courses
          </button>
        )}
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

      {isCreating ? (
        <div className="animate-slide-up">
          <CourseForm onClose={() => setIsCreating(false)} />
        </div>
      ) : (
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
              isLoading={false} 
              onDelete={handleDelete} 
            />
          </div>
        </Card>
      )}
    </div>
  );
}

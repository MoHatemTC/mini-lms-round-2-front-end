import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import courseService from '../../../services/courseService';
import CourseCard from '../components/Shared/CourseCard';
import CourseCardSkeleton from '../components/Loading/CourseCardSkeleton';
import CourseCatalogFilters from '../components/Shared/CourseCatalogFilters';
import { NoAvailableCoursesState, NoFilterResultsState } from '../components/EmptyStates/CourseEmptyStates';
import { UnauthorizedError, ForbiddenError, NotFoundError, ServerError, NetworkError } from '../../../components/common/ErrorState/ApiErrorStates';

const INITIAL_FILTERS = {
  track: 'All',
  skill: 'All',
  topic: 'All',
  estimatedLength: 'All',
  status: 'All',
  hasCertificate: false
};

const DEFAULT_FILTER_OPTIONS = {
  tracks: ['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'AI', 'DevOps', 'UI/UX'],
  skills: ['All', 'React', 'Node.js', 'Python', 'TypeScript', 'JavaScript', 'Docker', 'GraphQL', 'SQL', 'AWS', 'Tailwind CSS'],
  topics: ['All', 'Web Development', 'System Design', 'Cloud Computing', 'Machine Learning', 'Database', 'Architecture', 'Security', 'Testing'],
  lengths: ['All', '< 4 Weeks', '4-8 Weeks', '8+ Weeks', 'Self-paced'],
  statuses: ['All', 'Published', 'Draft', 'Archived']
};

/**
 * LearnerCourses (Course List Page with Filters)
 * Main course list page displaying a responsive grid of available courses with Course Filters.
 * Reuses existing services, error components, and design system tokens.
 * Specifically excludes search, Course Details, and client-side filtering logic as per requirements.
 */
export default function LearnerCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter State Management
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [availableOptions, setAvailableOptions] = useState(DEFAULT_FILTER_OPTIONS);

  const hasActiveFilters =
    filters.track !== 'All' ||
    filters.skill !== 'All' ||
    filters.topic !== 'All' ||
    filters.estimatedLength !== 'All' ||
    filters.status !== 'All' ||
    filters.hasCertificate === true;

  const fetchCourses = useCallback(async (customFilters = null, isMounted = true) => {
    setIsLoading(true);
    setError(null);
    try {
      const activeFilters = customFilters !== null ? customFilters : filters;
      
      // Build API query parameters following project conventions
      const params = {};
      if (activeFilters.track !== 'All') params.track = activeFilters.track;
      if (activeFilters.skill !== 'All') params.skill = activeFilters.skill;
      if (activeFilters.topic !== 'All') params.topic = activeFilters.topic;
      if (activeFilters.estimatedLength !== 'All') {
        params.length = activeFilters.estimatedLength;
        params.duration = activeFilters.estimatedLength;
      }
      if (activeFilters.status !== 'All') params.status = activeFilters.status;
      if (activeFilters.hasCertificate) params.hasCertificate = true;

      const response = await courseService.getAllCourses(params);
      if (isMounted) {
        const data = response?.data || response?.courses || (Array.isArray(response) ? response : []);
        setCourses(data);

        // Dynamically merge backend filter options if provided by API
        if (response?.availableFilters || response?.filters) {
          const backendFilters = response.availableFilters || response.filters;
          setAvailableOptions(prev => ({
            tracks: Array.from(new Set([...prev.tracks, ...(backendFilters.tracks || [])])),
            skills: Array.from(new Set([...prev.skills, ...(backendFilters.skills || [])])),
            topics: Array.from(new Set([...prev.topics, ...(backendFilters.topics || [])])),
            lengths: Array.from(new Set([...prev.lengths, ...(backendFilters.lengths || backendFilters.durations || [])])),
            statuses: Array.from(new Set([...prev.statuses, ...(backendFilters.statuses || [])])),
          }));
        } else if (data.length > 0) {
          // Enrich filter options from returned course metadata without overwriting defaults
          setAvailableOptions(prev => ({
            tracks: Array.from(new Set([...prev.tracks, ...data.map(c => c.track).filter(Boolean)])),
            skills: Array.from(new Set([...prev.skills, ...data.map(c => c.skill).filter(Boolean)])),
            topics: Array.from(new Set([...prev.topics, ...data.map(c => c.topic).filter(Boolean)])),
            lengths: Array.from(new Set([...prev.lengths, ...data.map(c => c.duration || c.length).filter(Boolean)])),
            statuses: Array.from(new Set([...prev.statuses, ...data.map(c => c.status).filter(Boolean)])),
          }));
        }
      }
    } catch (err) {
      if (isMounted) {
        setError(err);
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  }, [filters]);

  useEffect(() => {
    let isMounted = true;
    fetchCourses(null, isMounted);
    return () => {
      isMounted = false;
    };
  }, [fetchCourses]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const renderErrorState = () => {
    const status = error?.status || error?.response?.status;
    let title = "Server Error";
    let desc = "We encountered a problem on our servers while loading the course catalog. Please try again later.";
    let component = (
      <ServerError
        title={title}
        description={desc}
        onRetry={() => fetchCourses(null, true)}
      />
    );

    if (status === 401) {
      title = "Sign In Required";
      desc = "You need to sign in before viewing available courses.";
      component = (
        <UnauthorizedError
          title={title}
          description={desc}
          onRetry={() => navigate('/login')}
        />
      );
    } else if (status === 403) {
      title = "Access Denied";
      desc = "You don't have permission to access the course catalog.";
      component = (
        <ForbiddenError
          title={title}
          description={desc}
          onRetry={() => (window.history.length > 2 ? navigate(-1) : navigate('/'))}
        />
      );
    } else if (status === 404) {
      title = "Catalog Not Found";
      desc = "The course catalog is currently unavailable or could not be found.";
      component = (
        <NotFoundError
          title={title}
          description={desc}
          onRetry={() => fetchCourses(null, true)}
        />
      );
    } else if (status === 0) {
      title = "Network Error";
      desc = "We couldn't connect to the server. Please check your internet connection and try again.";
      component = <NetworkError onRetry={() => fetchCourses(null, true)} />;
    }

    return (
      <div className="py-8" role="region" aria-labelledby="catalog-error-heading">
        <h1 id="catalog-error-heading" className="sr-only">{title}: {desc}</h1>
        {component}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/60 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Course Catalog</h1>
          <p className="text-text-secondary mt-1 text-sm sm:text-base">
            Explore available learning tracks and courses to expand your skills.
          </p>
        </div>
      </div>

      {/* Course Catalog Filters Section */}
      <CourseCatalogFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        availableOptions={availableOptions}
        isLoading={isLoading}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Main Content Area */}
      {isLoading ? (
        <CourseCardSkeleton count={6} />
      ) : error ? (
        renderErrorState()
      ) : courses.length === 0 ? (
        hasActiveFilters ? (
          <NoFilterResultsState onReset={handleResetFilters} />
        ) : (
          <NoAvailableCoursesState onAction={() => fetchCourses(null, true)} />
        )
      ) : (
        <div id="course-catalog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {courses.map((course) => (
            <CourseCard key={course.id || course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

import React from 'react';

const TRACKS = ['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'AI', 'DevOps', 'UI/UX'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const STATUSES = ['All', 'Draft', 'Published', 'Archived'];

const CourseFilters = ({ 
  searchQuery, setSearchQuery,
  trackFilter, setTrackFilter,
  levelFilter, setLevelFilter,
  statusFilter, setStatusFilter
}) => {
  return (
    <div className="p-5 sm:p-6 bg-white flex flex-col md:flex-row gap-4 justify-between">
      <div className="flex-1 max-w-md">
        <label htmlFor="search" className="sr-only">Search courses</label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border outline-none transition-colors"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex gap-4 flex-wrap sm:flex-nowrap">
        <select
          value={trackFilter}
          onChange={(e) => setTrackFilter(e.target.value)}
          className="block w-full sm:w-auto pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-lg border bg-white shadow-sm cursor-pointer"
          aria-label="Filter by Track"
        >
          {TRACKS.map(track => <option key={track} value={track}>{track === 'All' ? 'All Tracks' : track}</option>)}
        </select>

        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="block w-full sm:w-auto pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-lg border bg-white shadow-sm cursor-pointer"
          aria-label="Filter by Level"
        >
          {LEVELS.map(level => <option key={level} value={level}>{level === 'All' ? 'All Levels' : level}</option>)}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="block w-full sm:w-auto pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-lg border bg-white shadow-sm cursor-pointer"
          aria-label="Filter by Status"
        >
          {STATUSES.map(status => <option key={status} value={status}>{status === 'All' ? 'All Status' : status}</option>)}
        </select>
      </div>
    </div>
  );
};

export default CourseFilters;

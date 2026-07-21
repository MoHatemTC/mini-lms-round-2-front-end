import React from 'react';
import CourseInfoGrid from '../Shared/CourseInfoGrid';
const CourseDetailsSection = ({ course }) => {
  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-blue-500 pl-3">Basic Information</h3>
        <div className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Title</span>
            <h4 className="text-xl font-bold text-gray-900">{course.title || 'Untitled Course'}</h4>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</span>
            <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm leading-relaxed">
              {course.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>

      {/* Course Details Grid */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-blue-500 pl-3">Details</h3>
        <CourseInfoGrid 
          details={[
            { label: 'Track', value: course.track },
            { label: 'Level', value: course.level },
            { label: 'Duration', value: course.duration || course.length },
            { label: 'Main Skill', value: course.skill }
          ]} 
        />
      </div>

      {/* Learning Outcomes */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-blue-500 pl-3">Learning Outcomes</h3>
        {course.learningOutcomes && course.learningOutcomes.length > 0 ? (
          <ul className="space-y-3">
            {course.learningOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100 shadow-sm transition-colors hover:bg-white hover:border-gray-200">
                <span className="text-green-500 mt-0.5 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                </span>
                <span className="text-sm text-gray-800 font-medium leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">No learning outcomes specified.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsSection;

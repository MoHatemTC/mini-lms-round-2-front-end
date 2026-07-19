import React from 'react';
import CourseDetailsSection from './CourseDetailsSection';
import CoursePreviewFiles from './CoursePreviewFiles';

const CoursePreview = ({ courseData }) => {
  if (!courseData) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 sm:p-10 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Course Preview</h2>
          <p className="text-sm text-gray-500">Review all course information and uploaded assets before publishing.</p>
        </div>

        <CourseDetailsSection course={courseData} />
        
        <div className="border-t border-gray-200 pt-8">
          <CoursePreviewFiles files={courseData.files || []} />
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;

import React from 'react';
import { Card } from '../../../../components/ui/Card';

/**
 * CourseCardSkeleton
 * Displays a responsive grid of skeleton cards during course data loading to prevent layout shifting.
 */
const CourseCardSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="h-full flex flex-col overflow-hidden border border-border/80 rounded-2xl bg-white">
          {/* Thumbnail Skeleton */}
          <div className="w-full h-44 bg-gray-200" />

          {/* Content Skeleton */}
          <div className="p-5 flex-1 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded-md w-3/4" />
              <div className="space-y-2">
                <div className="h-3.5 bg-gray-100 rounded w-full" />
                <div className="h-3.5 bg-gray-100 rounded w-5/6" />
              </div>
            </div>

            {/* Metadata Pills Skeleton */}
            <div className="space-y-3 pt-3 border-t border-border/60">
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-6 w-20 bg-gray-100 rounded-md" />
                <div className="h-6 w-24 bg-gray-100 rounded-md" />
                <div className="h-6 w-16 bg-gray-100 rounded-md" />
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="pt-2">
              <div className="h-10 bg-gray-200 rounded-xl w-full" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CourseCardSkeleton;

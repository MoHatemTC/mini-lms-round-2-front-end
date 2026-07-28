import React from 'react';
import { Card, CardHeader, CardContent } from '../../../../components/ui/Card';

/**
 * CourseDetailsSkeleton
 * Responsive skeleton loading state for the Course Details page.
 * Prevents layout shifting and maintains responsive structure while data is being fetched.
 */
const CourseDetailsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse pb-12" aria-busy="true" aria-label="Loading course details">
      {/* Navigation & Header Skeleton */}
      <div className="flex items-center gap-2">
        <div className="w-40 h-8 bg-muted/60 rounded-xl" />
      </div>

      {/* Course Overview Header Skeleton */}
      <Card className="w-full border-border/60 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader className="space-y-4 p-6 sm:p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-24 h-6 bg-muted/60 rounded-full" />
            <div className="w-20 h-6 bg-muted/60 rounded-full" />
            <div className="w-28 h-6 bg-muted/60 rounded-full" />
          </div>
          
          <div className="w-3/4 sm:w-1/2 h-8 sm:h-10 bg-muted/70 rounded-lg" />
          
          <div className="space-y-2 pt-2">
            <div className="w-full h-4 bg-muted/50 rounded" />
            <div className="w-full h-4 bg-muted/50 rounded" />
            <div className="w-2/3 h-4 bg-muted/50 rounded" />
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/60">
            <div className="w-32 h-5 bg-muted/60 rounded" />
            <div className="w-32 h-5 bg-muted/60 rounded" />
            <div className="w-32 h-5 bg-muted/60 rounded" />
            <div className="w-32 h-5 bg-muted/60 rounded" />
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
        {/* Left 2 Columns: Materials & Assignments */}
        <div className="lg:col-span-2 space-y-8 min-w-0">
          {/* Materials Skeleton */}
          <Card className="w-full">
            <CardHeader className="p-6 border-b border-border/60">
              <div className="w-48 h-6 bg-muted/70 rounded" />
              <div className="w-64 h-4 bg-muted/50 rounded mt-1.5" />
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-xl border border-border/60 bg-muted/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-muted/70 shrink-0" />
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="w-3/4 h-4 bg-muted/70 rounded" />
                      <div className="w-1/2 h-3 bg-muted/50 rounded" />
                    </div>
                  </div>
                  <div className="w-24 h-9 bg-muted/60 rounded-xl shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Assignments Skeleton */}
          <Card className="w-full">
            <CardHeader className="p-6 border-b border-border/60">
              <div className="w-52 h-6 bg-muted/70 rounded" />
              <div className="w-72 h-4 bg-muted/50 rounded mt-1.5" />
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-5 rounded-xl border border-border/60 bg-muted/20 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="w-2/3 h-5 bg-muted/70 rounded" />
                    <div className="w-20 h-5 bg-muted/60 rounded-full shrink-0" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full h-3.5 bg-muted/50 rounded" />
                    <div className="w-4/5 h-3.5 bg-muted/50 rounded" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Column: Progress, Quizzes & Certificate */}
        <div className="lg:col-span-1 space-y-8 min-w-0">
          {/* Progress Skeleton */}
          <Card className="w-full">
            <CardHeader className="p-6 border-b border-border/60">
              <div className="w-36 h-6 bg-muted/70 rounded" />
              <div className="w-48 h-4 bg-muted/50 rounded mt-1.5" />
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-24 h-4 bg-muted/70 rounded" />
                <div className="w-12 h-5 bg-muted/70 rounded-full" />
              </div>
              <div className="w-full h-2.5 bg-muted/60 rounded-full" />
              <div className="w-48 h-3.5 bg-muted/50 rounded pt-1" />
            </CardContent>
          </Card>

          {/* Quizzes Skeleton */}
          <Card className="w-full">
            <CardHeader className="p-6 border-b border-border/60">
              <div className="w-36 h-6 bg-muted/70 rounded" />
              <div className="w-48 h-4 bg-muted/50 rounded mt-1.5" />
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
                  <div className="flex justify-between items-center gap-2">
                    <div className="w-36 h-5 bg-muted/70 rounded" />
                    <div className="w-16 h-5 bg-muted/60 rounded-full shrink-0" />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="w-20 h-3.5 bg-muted/50 rounded" />
                    <div className="w-24 h-3.5 bg-muted/50 rounded" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certificate Skeleton */}
          <Card className="w-full">
            <CardHeader className="p-6 border-b border-border/60">
              <div className="w-40 h-6 bg-muted/70 rounded" />
              <div className="w-52 h-4 bg-muted/50 rounded mt-1.5" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="p-5 rounded-xl border border-border/60 bg-muted/20 flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-muted/70" />
                <div className="w-48 h-5 bg-muted/70 rounded" />
                <div className="w-20 h-5 bg-muted/60 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsSkeleton;

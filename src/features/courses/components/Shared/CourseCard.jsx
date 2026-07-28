import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, BookOpen, Award, Layers } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import CourseStatusBadge from './CourseStatusBadge';

/**
 * CourseCard
 * Reusable course card component for displaying course information in catalog and learner lists.
 * Supports thumbnails, metadata (track, skill, level, duration), status, and progress.
 */
const CourseCard = ({ course, linkTo }) => {
  if (!course) return null;

  const courseId = course.id || course._id;
  const targetUrl = linkTo || `/learner/courses/${courseId}`;
  const thumbnail = course.thumbnail || course.imageUrl || course.image;
  const duration = course.duration || course.length;
  const progress = course.progress !== undefined && course.progress !== null ? course.progress : course.completionPercentage;

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group border border-border/80 rounded-2xl bg-white">
      {/* Thumbnail Section */}
      <div className="relative w-full h-44 overflow-hidden bg-muted/60">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={course.title || 'Course thumbnail'} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/15 via-primary/5 to-muted flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <div className="p-3.5 bg-white/80 rounded-2xl shadow-sm backdrop-blur-sm text-primary">
              <BookOpen className="w-8 h-8" />
            </div>
          </div>
        )}

        {/* Status Badge Over Thumbnail (if available) */}
        {course.status && (
          <div className="absolute top-3 right-3 z-10">
            <CourseStatusBadge status={course.status} className="shadow-sm backdrop-blur-md bg-white/95" />
          </div>
        )}

        {/* Track Tag */}
        {course.track && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow-sm">
              {course.track}
            </span>
          </div>
        )}
      </div>

      {/* Card Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <Link to={targetUrl} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 title-font">
              {course.title || 'Untitled Course'}
            </h3>
          </Link>
          <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
            {course.description || 'No description provided for this course.'}
          </p>
        </div>

        {/* Course Metadata Pills */}
        <div className="space-y-3 pt-3 border-t border-border/60">
          <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
            {course.level && (
              <span className="inline-flex items-center gap-1 bg-muted/70 px-2.5 py-1 rounded-md font-medium text-foreground/80">
                <Layers className="w-3.5 h-3.5 text-primary" />
                {course.level}
              </span>
            )}
            {duration && (
              <span className="inline-flex items-center gap-1 bg-muted/70 px-2.5 py-1 rounded-md font-medium text-foreground/80">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {duration}
              </span>
            )}
            {course.skill && (
              <span className="inline-flex items-center gap-1 bg-muted/70 px-2.5 py-1 rounded-md font-medium text-foreground/80">
                <Award className="w-3.5 h-3.5 text-indigo-500" />
                {course.skill}
              </span>
            )}
          </div>

          {/* Progress Bar (if available) */}
          {typeof progress === 'number' && !isNaN(progress) && (
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs font-semibold text-text-secondary">
                <span>Progress</span>
                <span className="text-primary">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Action */}
        <div className="pt-2">
          <Link 
            to={targetUrl}
            className="w-full py-2.5 px-4 rounded-xl font-medium text-sm text-primary bg-primary/5 hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs hover:shadow-sm"
            aria-label={`View course: ${course.title || 'Untitled Course'}`}
          >
            <span>View Course</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default memo(CourseCard);

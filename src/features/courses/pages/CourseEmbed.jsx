import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Layers, FileText, Clock, Award, PlayCircle, Download, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import courseService from '../../../services/courseService';
import EmbedAccessError from '../../../components/common/ErrorState/EmbedAccessError';

/**
 * CourseEmbed Page
 * UI foundation for embedded course views with safe access handling from the backend.
 */
export default function CourseEmbed() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(courseId));
  const [error, setError] = useState(null);

  const fetchCourse = useCallback(async () => {
    if (!courseId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await courseService.getCourseById(courseId);
      setCourse(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden animate-pulse" aria-busy="true" aria-label="Loading course embed">
        <Card className="w-full h-44 bg-muted/40 border-border/50" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <Card className="lg:col-span-2 h-96 bg-muted/30 border-border/50" />
          <Card className="lg:col-span-1 h-96 bg-muted/30 border-border/50" />
        </div>
      </div>
    );
  }

  if (error) {
    return <EmbedAccessError error={error} resourceName="course" onRetry={fetchCourse} />;
  }

  const title = course?.title || 'Course Title';
  const description = course?.description || 'Course description placeholder. This embedded view provides learners and previewers with direct access to the course structure, learning objectives, and accompanying materials in a clean, responsive layout.';
  const track = course?.track || 'Frontend Track';
  const level = course?.level || 'Intermediate';
  const duration = course?.duration || '6 Weeks Placeholder';

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      {/* --------------------------------
          Course Title
      -------------------------------- */}
      <Card className="w-full border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-premium">
        <CardHeader className="space-y-3 p-4 sm:p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">Course Embed</Badge>
            <Badge variant="outline">{track}</Badge>
            <Badge variant="secondary">{level}</Badge>
          </div>
          
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground break-words">
            {title}
          </CardTitle>
          
          <CardDescription className="text-sm sm:text-base text-text-secondary max-w-3xl leading-relaxed break-words">
            {description}
          </CardDescription>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm font-medium text-text-secondary border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <span>Duration: {duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary shrink-0" />
              <span>4 Modules Placeholder</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-primary shrink-0" />
              <span>Certificate Included</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Grid: Adaptive 1 column on mobile/tablet, 3 columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        
        {/* --------------------------------
            Course Content Placeholder (2 Columns on LG)
        -------------------------------- */}
        <div className="lg:col-span-2 flex flex-col w-full min-w-0">
          <Card className="w-full h-full flex flex-col">
            <CardHeader className="p-4 sm:p-6 border-b border-border/50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary shrink-0" />
                <CardTitle className="text-lg sm:text-xl font-bold">Course Content Placeholder</CardTitle>
              </div>
              <CardDescription>
                Curriculum outline and interactive lesson modules placeholder.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-4 flex-1">
              {/* Module 1 Placeholder */}
              <div className="rounded-xl border border-border bg-background/50 p-4 space-y-3 transition-colors hover:border-primary/30">
                <div className="flex items-start justify-between gap-2 break-words">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      01
                    </span>
                    <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">
                      Module 1: Introduction & Fundamentals Placeholder
                    </h4>
                  </div>
                  <Badge variant="default" className="shrink-0 text-[10px] sm:text-xs">3 Lessons</Badge>
                </div>

                <div className="pl-9 space-y-2 text-xs sm:text-sm text-text-secondary">
                  <div className="flex items-center justify-between py-1.5 border-b border-border/30 gap-2">
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <PlayCircle className="w-4 h-4 text-primary shrink-0" />
                      <span className="truncate">Lesson 1.1: Welcome & Course Overview</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">10m</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-border/30 gap-2">
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <PlayCircle className="w-4 h-4 text-primary shrink-0" />
                      <span className="truncate">Lesson 1.2: Setting Up the Development Environment</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">25m</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 gap-2">
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      <span className="truncate">Lesson 1.3: Core Concepts Knowledge Check</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">15m</span>
                  </div>
                </div>
              </div>

              {/* Module 2 Placeholder */}
              <div className="rounded-xl border border-border bg-background/50 p-4 space-y-3 transition-colors hover:border-primary/30">
                <div className="flex items-start justify-between gap-2 break-words">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      02
                    </span>
                    <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">
                      Module 2: Advanced Architecture & Patterns Placeholder
                    </h4>
                  </div>
                  <Badge variant="default" className="shrink-0 text-[10px] sm:text-xs">2 Lessons</Badge>
                </div>

                <div className="pl-9 space-y-2 text-xs sm:text-sm text-text-secondary">
                  <div className="flex items-center justify-between py-1.5 border-b border-border/30 gap-2">
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <PlayCircle className="w-4 h-4 text-primary shrink-0" />
                      <span className="truncate">Lesson 2.1: Component Reusability Strategies</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">35m</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 gap-2">
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <PlayCircle className="w-4 h-4 text-primary shrink-0" />
                      <span className="truncate">Lesson 2.2: State Management Deep Dive</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">45m</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --------------------------------
            Materials Placeholder (1 Column on LG)
        -------------------------------- */}
        <div className="lg:col-span-1 flex flex-col w-full min-w-0">
          <Card className="w-full h-full flex flex-col">
            <CardHeader className="p-4 sm:p-6 border-b border-border/50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <CardTitle className="text-lg sm:text-xl font-bold">Materials Placeholder</CardTitle>
              </div>
              <CardDescription>
                Supplementary study guides and resources placeholder.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-3 flex-1">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-background/40 hover:bg-muted/30 transition-colors gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 truncate">
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                      Course Syllabus & Roadmap.pdf
                    </p>
                    <p className="text-[11px] text-text-secondary">2.4 MB • PDF Document</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="shrink-0 h-8 w-8 p-0" title="Download placeholder" disabled>
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-background/40 hover:bg-muted/30 transition-colors gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 truncate">
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                      Starter Codebase & Assets.zip
                    </p>
                    <p className="text-[11px] text-text-secondary">14.8 MB • Archive</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="shrink-0 h-8 w-8 p-0" title="Download placeholder" disabled>
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-background/40 hover:bg-muted/30 transition-colors gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 truncate">
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                      Best Practices Reference Guide.pdf
                    </p>
                    <p className="text-[11px] text-text-secondary">1.1 MB • PDF Document</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="shrink-0 h-8 w-8 p-0" title="Download placeholder" disabled>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

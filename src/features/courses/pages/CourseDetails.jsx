import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Layers, 
  Clock, 
  Award, 
  FileText, 
  PlayCircle, 
  ExternalLink, 
  File, 
  Lock, 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  FileQuestion,
  ClipboardList,
  TrendingUp
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import courseService from '../../../services/courseService';
import { UnauthorizedError, ForbiddenError, NotFoundError, ServerError, NetworkError } from '../../../components/common/ErrorState/ApiErrorStates';
import { NoFilesState } from '../components/EmptyStates/CourseEmptyStates';
import EmptyState from '../../../components/common/EmptyState/EmptyState';
import CourseDetailsSkeleton from '../components/Loading/CourseDetailsSkeleton';

/**
 * Format bytes to human readable string
 */
const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes || isNaN(bytes)) return '';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Helper to determine material icon, label, and style based on file type/extension/URL
 */
const getMaterialTypeMeta = (type = '', filename = '', url = '') => {
  const lowerType = String(type).toLowerCase();
  const lowerName = String(filename).toLowerCase();
  const lowerUrl = String(url).toLowerCase();

  if (lowerType.includes('pdf') || lowerName.endsWith('.pdf')) {
    return {
      label: 'PDF Document',
      icon: <FileText className="w-5 h-5" />,
      colorClass: 'bg-red-50 text-red-600 border-red-100',
      badgeVariant: 'danger',
    };
  }
  if (lowerType.includes('video') || lowerName.endsWith('.mp4') || lowerName.endsWith('.mov') || lowerName.endsWith('.webm')) {
    return {
      label: 'Video Lecture',
      icon: <PlayCircle className="w-5 h-5" />,
      colorClass: 'bg-primary/10 text-primary border-primary/20',
      badgeVariant: 'primary',
    };
  }
  if (lowerType.includes('link') || lowerType.includes('external') || (lowerUrl.startsWith('http') && !lowerName.includes('.'))) {
    return {
      label: 'External Link',
      icon: <ExternalLink className="w-5 h-5" />,
      colorClass: 'bg-blue-50 text-blue-600 border-blue-100',
      badgeVariant: 'secondary',
    };
  }
  return {
    label: 'Document',
    icon: <File className="w-5 h-5" />,
    colorClass: 'bg-muted text-foreground/70 border-border',
    badgeVariant: 'outline',
  };
};

/**
 * CourseDetails Page
 * Displays comprehensive details for a single course including Overview, Materials, Quizzes, Assignments, and Certificate.
 * Strictly adheres to frontend UI scope without modifying business logic or project architecture.
 */
export default function CourseDetails() {
  const navigate = useNavigate();
  const { courseId, id } = useParams();
  const targetCourseId = courseId || id;

  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);

  const fetchCourseDetails = useCallback(async (isMounted = true) => {
    if (!targetCourseId) {
      if (isMounted) {
        setIsNotFound(true);
        setIsLoading(false);
      }
      return;
    }

    if (isMounted) {
      setIsLoading(true);
      setError(null);
      setIsNotFound(false);
    }

    try {
      const data = await courseService.getCourseById(targetCourseId);
      if (isMounted) {
        if (!data) {
          setIsNotFound(true);
        } else {
          setCourse(data);
        }
      }
    } catch (err) {
      if (isMounted) {
        // Detect 404 or Not Found error response from API
        const status = err?.status || err?.response?.status;
        const msg = (err?.message || '').toLowerCase();
        if (status === 404 || msg.includes('not found') || msg.includes('does not exist')) {
          setIsNotFound(true);
        } else {
          setError(err);
        }
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  }, [targetCourseId]);

  useEffect(() => {
    let isMounted = true;
    fetchCourseDetails(isMounted);
    return () => {
      isMounted = false;
    };
  }, [fetchCourseDetails]);

  // ----------------------------------------------------
  // Loading State
  // ----------------------------------------------------
  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  // ----------------------------------------------------
  // Not Found State (null course data or 404 flag)
  // ----------------------------------------------------
  if (isNotFound || (!course && !error)) {
    return (
      <div className="py-8" role="region" aria-labelledby="not-found-heading">
        <h1 id="not-found-heading" className="sr-only">Course Not Found</h1>
        <NotFoundError
          title="Course Not Found"
          description="We couldn't find the course you were looking for. It may be unavailable or removed."
          onRetry={() => (window.history.length > 2 ? navigate(-1) : navigate('/learner/courses'))}
        />
      </div>
    );
  }

  // ----------------------------------------------------
  // Error State (401, 403, 404, 5xx, or Network failure)
  // ----------------------------------------------------
  if (error) {
    const status = error?.status || error?.response?.status;
    let title = "Server Error";
    let desc = "We encountered a problem on our servers while loading this course. Please try again later.";
    let component = (
      <ServerError
        title={title}
        description={desc}
        onRetry={() => fetchCourseDetails(true)}
      />
    );

    if (status === 401) {
      title = "Sign In Required";
      desc = "You need to sign in before viewing this course.";
      component = (
        <UnauthorizedError
          title={title}
          description={desc}
          onRetry={() => navigate('/login')}
        />
      );
    } else if (status === 403) {
      title = "Access Denied";
      desc = "You don't have permission to access this course.";
      component = (
        <ForbiddenError
          title={title}
          description={desc}
          onRetry={() => (window.history.length > 2 ? navigate(-1) : navigate('/learner/courses'))}
        />
      );
    } else if (status === 404 || isNotFound) {
      title = "Course Not Found";
      desc = "We couldn't find the course you were looking for. It may be unavailable or removed.";
      component = (
        <NotFoundError
          title={title}
          description={desc}
          onRetry={() => (window.history.length > 2 ? navigate(-1) : navigate('/learner/courses'))}
        />
      );
    } else if (status === 0) {
      title = "Network Error";
      desc = "We couldn't connect to the server. Please check your internet connection and try again.";
      component = <NetworkError onRetry={() => fetchCourseDetails(true)} />;
    }

    return (
      <div className="py-8" role="region" aria-labelledby="course-error-heading">
        <h1 id="course-error-heading" className="sr-only">{title}: {desc}</h1>
        {component}
      </div>
    );
  }

  // ----------------------------------------------------
  // Data Extraction & Normalization
  // ----------------------------------------------------
  const title = course.title || 'Untitled Course';
  const description = course.description || 'No description available for this course.';
  const track = course.track || 'General Track';
  const skill = course.skill || 'General Skill';
  const level = course.level || 'All Levels';
  const duration = course.duration || course.length || course.estimatedLength || 'Self-paced';
  const outcomes = Array.isArray(course.learningOutcomes) ? course.learningOutcomes : [];

  const materials = course.materials || course.files || course.resources || course.learningMaterials || [];
  const materialList = Array.isArray(materials) ? materials : [materials];

  const quizzes = course.quizzes || course.quiz || course.assessments || [];
  const quizList = Array.isArray(quizzes) ? quizzes : [quizzes];

  const assignments = course.assignments || course.tasks || course.projects || course.homework || [];
  const assignmentList = Array.isArray(assignments) ? assignments : [assignments];

  // ----------------------------------------------------
  // Progress Data Extraction (from backend response only)
  // ----------------------------------------------------
  const progressObj = typeof course.progress === 'object' && course.progress !== null 
    ? course.progress 
    : typeof course.userProgress === 'object' && course.userProgress !== null 
    ? course.userProgress 
    : typeof course.learnerProgress === 'object' && course.learnerProgress !== null 
    ? course.learnerProgress 
    : null;

  const rawPercentage = progressObj?.percentage ?? progressObj?.progress ?? progressObj?.completionPercentage ?? (
    typeof course.progress === 'number' ? course.progress : typeof course.completionPercentage === 'number' ? course.completionPercentage : typeof course.progressPercentage === 'number' ? course.progressPercentage : undefined
  );
  const progressPercentage = typeof rawPercentage === 'number' && !isNaN(rawPercentage) ? Math.min(100, Math.max(0, Math.round(rawPercentage))) : undefined;

  const completedLessons = progressObj?.completedLessons ?? progressObj?.completedCount ?? course.completedLessons;
  const totalLessons = progressObj?.totalLessons ?? progressObj?.totalCount ?? course.totalLessons;
  const currentLesson = progressObj?.currentLesson ?? progressObj?.nextLesson ?? course.currentLesson;

  const hasProgressInfo = progressPercentage !== undefined || (completedLessons !== undefined && totalLessons !== undefined) || currentLesson !== undefined;

  // ----------------------------------------------------
  // Prerequisite & Finish First Rules Extraction
  // ----------------------------------------------------
  const rawRules = course.prerequisites || course.finishFirstRules || course.prerequisiteRules || course.rules || course.requirements || course.finishFirst || [];
  const finishRulesList = (Array.isArray(rawRules) ? rawRules : [rawRules])
    .filter(Boolean)
    .map(item => typeof item === 'string' ? item : item.message || item.title || item.rule || item.description || JSON.stringify(item));

  // ----------------------------------------------------
  // Certificate Data Extraction (from backend response only)
  // ----------------------------------------------------
  const rawCert = course.certificate || course.certificateInfo || course.certification;
  const hasCertFlag = Boolean(course.hasCertificate || rawCert);
  const certStatus = rawCert?.status || rawCert?.availability || (
    rawCert?.isAvailable ? 'Available' : rawCert?.isLocked ? 'Locked' : rawCert?.isCompleted ? 'Completed' : hasCertFlag ? 'Locked' : 'Not Available'
  );
  const certTitle = rawCert?.title || rawCert?.name || 'Course Completion Certificate';
  const certDesc = rawCert?.description || 'Earn an official verified certificate upon successfully completing all required course materials and assessments.';
  const certMessage = rawCert?.message || rawCert?.unlockMessage || rawCert?.requirement;

  return (
    <main className="space-y-8 animate-fade-in pb-16" aria-labelledby="course-page-title">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4">
        <Link 
          to="/learner/courses" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1.5 px-3 -ml-3"
          aria-label="Back to course catalog"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* ----------------------------------------------------
          Section 1: Course Overview
      ---------------------------------------------------- */}
      <section aria-labelledby="course-page-title">
        <Card className="w-full border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-premium overflow-hidden">
          <CardHeader className="space-y-5 p-6 sm:p-8 md:p-10">
            {/* Badges / Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">{track}</Badge>
              <Badge variant="outline">{skill}</Badge>
              <Badge variant="secondary">{level}</Badge>
            </div>

            {/* Course Title */}
            <CardTitle 
              id="course-page-title" 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground break-words leading-tight"
            >
              {title}
            </CardTitle>

            {/* Description */}
            <CardDescription className="text-sm sm:text-base text-text-secondary max-w-4xl leading-relaxed whitespace-pre-wrap break-words">
              {description}
            </CardDescription>

            {/* Metadata Footer */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-xs sm:text-sm font-medium text-text-secondary border-t border-border/60">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
                <span>Estimated Length: <strong className="text-foreground font-semibold">{duration}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Level: <strong className="text-foreground font-semibold">{level}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-500 shrink-0" aria-hidden="true" />
                <span>Track: <strong className="text-foreground font-semibold">{track}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                <span>Skill: <strong className="text-foreground font-semibold">{skill}</strong></span>
              </div>
            </div>

            {/* Learning Outcomes (if provided by backend) */}
            {outcomes.length > 0 && (
              <div className="pt-4 border-t border-border/60 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary">What You Will Learn</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-snug">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardHeader>
        </Card>
      </section>

      {/* ----------------------------------------------------
          Main Content Grid: Materials, Quizzes, Assignments, Certificate
      ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full items-start">
        
        {/* Left 2 Columns: Materials & Assignments */}
        <div className="lg:col-span-2 space-y-8 min-w-0 w-full">
          
          {/* ----------------------------------------------------
              Prerequisites & Finish First Rules (from backend only)
          ---------------------------------------------------- */}
          {finishRulesList.length > 0 && (
            <section aria-labelledby="finish-rules-title">
              <div 
                role="alert" 
                aria-labelledby="finish-rules-title"
                className="p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-background shadow-xs space-y-3.5"
              >
                <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <h3 id="finish-rules-title" className="text-base font-bold text-foreground">
                    Prerequisites & Finish First Rules
                  </h3>
                </div>
                <p className="text-xs text-text-secondary">
                  Please note the progression requirements specified by the server for this course:
                </p>
                <ul className="space-y-2 pt-1 border-t border-amber-500/20" role="list">
                  {finishRulesList.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-foreground/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" aria-hidden="true" />
                      <span className="leading-snug break-words">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------
              Section 2: Materials Section
          ---------------------------------------------------- */}
          <section aria-labelledby="materials-section-title">
            <Card className="w-full">
              <CardHeader className="p-6 border-b border-border/60 flex flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                    <CardTitle id="materials-section-title" className="text-lg sm:text-xl font-bold">
                      Learning Materials
                    </CardTitle>
                  </div>
                  <CardDescription>
                    Review course documents, videos, PDFs, and external learning references.
                  </CardDescription>
                </div>
                {materialList.length > 0 && (
                  <Badge variant="outline" className="shrink-0">
                    {materialList.length} {materialList.length === 1 ? 'Item' : 'Items'}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="p-6">
                {materialList.length === 0 ? (
                  <div className="py-4">
                    <NoFilesState />
                  </div>
                ) : (
                  <ul className="space-y-3" role="list">
                    {materialList.map((material, idx) => {
                      const itemUrl = material.url || material.link || material.externalLink || material.previewUrl;
                      const itemTitle = material.title || material.name || `Material ${idx + 1}`;
                      const itemSize = formatBytes(material.size);
                      const meta = getMaterialTypeMeta(material.type, material.name || material.title, itemUrl);
                      const isMaterialLocked = Boolean(material.isLocked || material.locked || material.status === 'Locked' || material.availability === 'Locked');

                      return (
                        <li 
                          key={material.id || material._id || idx}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-background/50 hover:bg-muted/30 hover:border-border-focus transition-all gap-4 ${
                            isMaterialLocked ? 'opacity-75 bg-muted/20 border-dashed' : ''
                          }`}
                        >
                          <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                            <div className={`p-2.5 rounded-xl border shrink-0 flex items-center justify-center ${
                              isMaterialLocked ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : meta.colorClass
                            }`}>
                              {isMaterialLocked ? <Lock className="w-5 h-5" aria-hidden="true" /> : meta.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                {isMaterialLocked && (
                                  <span title="Content is currently locked" aria-label="Locked content">
                                    <Lock className="w-4 h-4 text-amber-500 shrink-0 inline mr-0.5" aria-hidden="true" />
                                  </span>
                                )}
                                <h4 className="text-sm font-semibold text-foreground truncate pr-2" title={itemTitle}>
                                  {itemTitle}
                                </h4>
                                <Badge variant={isMaterialLocked ? 'warning' : meta.badgeVariant} className="text-[10px] px-2 py-0">
                                  {isMaterialLocked ? (
                                    <span className="flex items-center gap-1">
                                      <Lock className="w-2.5 h-2.5" aria-hidden="true" />
                                      <span>Locked</span>
                                    </span>
                                  ) : meta.label}
                                </Badge>
                              </div>
                              <p className="text-xs text-text-secondary flex items-center gap-2">
                                {itemSize ? (
                                  <>
                                    <span>{itemSize}</span>
                                    <span>•</span>
                                  </>
                                ) : null}
                                <span>{material.description || 'Course Learning Resource'}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            {isMaterialLocked ? (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                disabled 
                                className="text-xs opacity-75 cursor-not-allowed inline-flex items-center gap-1.5 bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-400"
                                title="This material is currently marked as locked by the server"
                                aria-label={`${itemTitle} is locked`}
                              >
                                <Lock className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                                <span>Locked</span>
                              </Button>
                            ) : itemUrl ? (
                              <a
                                href={itemUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-9 px-4 text-xs font-semibold rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary gap-1.5 shadow-2xs hover:shadow-xs"
                                aria-label={`Open material: ${itemTitle} in new tab`}
                              >
                                <span>Open</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                disabled 
                                className="text-xs opacity-60 cursor-not-allowed"
                                title="Resource link unavailable"
                                aria-label={`${itemTitle} unavailable`}
                              >
                                <span>Available in Course</span>
                              </Button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>

          {/* ----------------------------------------------------
              Section 4: Assignment / Task Section
          ---------------------------------------------------- */}
          <section aria-labelledby="assignments-section-title">
            <Card className="w-full">
              <CardHeader className="p-6 border-b border-border/60 flex flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-indigo-500 shrink-0" aria-hidden="true" />
                    <CardTitle id="assignments-section-title" className="text-lg sm:text-xl font-bold">
                      Assignments & Tasks
                    </CardTitle>
                  </div>
                  <CardDescription>
                    Practical projects and assignments to apply your learning.
                  </CardDescription>
                </div>
                {assignmentList.length > 0 && (
                  <Badge variant="outline" className="shrink-0">
                    {assignmentList.length} {assignmentList.length === 1 ? 'Task' : 'Tasks'}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="p-6">
                {assignmentList.length === 0 ? (
                  <div className="text-center py-10 px-4 bg-muted/20 rounded-2xl border border-dashed border-border/60">
                    <ClipboardList className="mx-auto h-10 w-10 text-text-secondary/50 mb-2.5" aria-hidden="true" />
                    <p className="text-sm font-semibold text-foreground">No assignments currently scheduled</p>
                    <p className="text-xs text-text-secondary mt-1">This course does not currently include mandatory submission tasks.</p>
                  </div>
                ) : (
                  <ul className="space-y-4" role="list">
                    {assignmentList.map((assign, idx) => {
                      const assignTitle = assign.title || assign.name || `Assignment ${idx + 1}`;
                      const assignDesc = assign.description || assign.instructions || assign.summary || 'No detailed instructions provided.';
                      const assignDue = assign.dueDate || assign.deadline || assign.timeline;
                      const isAssignLocked = Boolean(assign.isLocked || assign.locked || assign.status === 'Locked' || assign.availability === 'Locked');
                      const assignStatus = isAssignLocked ? 'Locked' : (assign.status || (assign.points !== undefined ? `${assign.points} Points` : 'Assigned'));

                      return (
                        <li 
                          key={assign.id || assign._id || idx}
                          className={`p-5 rounded-xl border border-border bg-background/50 space-y-3.5 transition-colors hover:border-border-focus ${
                            isAssignLocked ? 'opacity-75 bg-muted/20 border-dashed' : ''
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                            <h4 className="text-base font-bold text-foreground break-words flex items-center gap-2">
                              {isAssignLocked && (
                                <span title="Task is currently locked" aria-label="Locked task">
                                  <Lock className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
                                </span>
                              )}
                              <span>{assignTitle}</span>
                            </h4>
                            <div className="flex items-center gap-2 self-start sm:self-center">
                              {assignDue && (
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary bg-muted/70 px-2.5 py-1 rounded-md">
                                  <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" aria-hidden="true" />
                                  <span>Due: {assignDue}</span>
                                </span>
                              )}
                              <Badge variant={isAssignLocked ? 'warning' : 'primary'} className="text-xs">
                                {isAssignLocked ? (
                                  <span className="flex items-center gap-1">
                                    <Lock className="w-3 h-3" aria-hidden="true" />
                                    <span>Locked</span>
                                  </span>
                                ) : assignStatus}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap break-words">
                            {assignDesc}
                          </p>

                          <div className="pt-2 flex items-center justify-between text-xs text-text-secondary/80 border-t border-border/30">
                            <span>Submission mode: {isAssignLocked ? 'Locked by server' : 'Online / Task review'}</span>
                            <span className="italic">Submissions managed via interactive modules</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>

        </div>

        {/* Right 1 Column: Course Progress, Quizzes & Certificate */}
        <div className="lg:col-span-1 space-y-8 min-w-0 w-full">
          
          {/* ----------------------------------------------------
              Section 3: Course Progress Section
          ---------------------------------------------------- */}
          <section aria-labelledby="progress-section-title">
            <Card className="w-full">
              <CardHeader className="p-6 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  <CardTitle id="progress-section-title" className="text-lg sm:text-xl font-bold">
                    Course Progress
                  </CardTitle>
                </div>
                <CardDescription>
                  Your learning completion status as recorded by the server.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                {!hasProgressInfo ? (
                  <div className="py-2">
                    <EmptyState
                      title="No progress yet."
                      description="Your completion status will appear here once you begin learning and interacting with course materials."
                      icon={<TrendingUp className="w-6 h-6 text-text-secondary" />}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Progress Bar & Percentage Label */}
                    {progressPercentage !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm font-bold text-foreground">
                          <span>Progress</span>
                          <span className="text-primary font-extrabold text-base">{progressPercentage}%</span>
                        </div>
                        <div 
                          className="w-full bg-muted rounded-full h-2.5 overflow-hidden shadow-inner" 
                          role="progressbar" 
                          aria-valuenow={progressPercentage} 
                          aria-valuemin="0" 
                          aria-valuemax="100" 
                          aria-label={`Course progress: ${progressPercentage}%`}
                        >
                          <div 
                            className="bg-gradient-to-r from-primary to-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${progressPercentage}%` }} 
                          />
                        </div>
                      </div>
                    )}

                    {/* Completion Summary (e.g. 7 of 10 lessons completed) */}
                    {completedLessons !== undefined && totalLessons !== undefined && (
                      <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-between text-xs sm:text-sm text-foreground font-semibold">
                        <span className="text-text-secondary">Completion Summary:</span>
                        <span className="text-primary font-bold">{completedLessons} of {totalLessons} lessons completed</span>
                      </div>
                    )}

                    {/* Current Lesson (if available) */}
                    {currentLesson && (
                      <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/15 space-y-1">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-primary">
                          Current Lesson
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-foreground leading-snug break-words">
                          {currentLesson}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* ----------------------------------------------------
              Section 4: Quiz Section
          ---------------------------------------------------- */}
          <section aria-labelledby="quizzes-section-title">
            <Card className="w-full">
              <CardHeader className="p-6 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <FileQuestion className="w-5 h-5 text-amber-500 shrink-0" aria-hidden="true" />
                  <CardTitle id="quizzes-section-title" className="text-lg sm:text-xl font-bold">
                    Quizzes & Assessments
                  </CardTitle>
                </div>
                <CardDescription>
                  Knowledge checks and graded quizzes.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                {quizList.length === 0 ? (
                  <div className="text-center py-8 px-4 bg-muted/20 rounded-2xl border border-dashed border-border/60">
                    <FileQuestion className="mx-auto h-9 w-9 text-text-secondary/50 mb-2" aria-hidden="true" />
                    <p className="text-sm font-semibold text-foreground">No quizzes available</p>
                    <p className="text-xs text-text-secondary mt-1">There are no quizzes assigned for this course yet.</p>
                  </div>
                ) : (
                  <ul className="space-y-3.5" role="list">
                    {quizList.map((quiz, idx) => {
                      const quizTitle = quiz.title || quiz.name || `Quiz ${idx + 1}`;
                      const isLocked = Boolean(quiz.isLocked || quiz.locked || quiz.status === 'Locked' || quiz.availability === 'Locked');
                      const isAvailable = Boolean(quiz.available || quiz.status === 'Available' || quiz.availability === 'Available');
                      
                      const availText = quiz.availability || (isLocked ? 'Locked' : isAvailable ? 'Available' : 'Available');
                      const statusText = quiz.status || (quiz.completed ? 'Completed' : quiz.inProgress ? 'In Progress' : 'Not Started');

                      const availVariant = isLocked ? 'warning' : isAvailable || availText === 'Available' ? 'success' : 'outline';
                      const statusVariant = statusText === 'Completed' ? 'success' : statusText === 'In Progress' ? 'primary' : 'default';

                      return (
                        <li 
                          key={quiz.id || quiz._id || idx}
                          className={`p-4 rounded-xl border border-border bg-background/50 space-y-3 transition-colors hover:border-border-focus ${
                            isLocked ? 'opacity-75 bg-muted/20 border-dashed' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-bold text-foreground break-words flex items-center gap-2">
                              {isLocked ? (
                                <span title="Assessment is currently locked" aria-label="Locked assessment">
                                  <Lock className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
                                </span>
                              ) : (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                              )}
                              <span>{quizTitle}</span>
                            </h4>
                            <Badge variant={availVariant} className="shrink-0 text-[10px]">
                              {isLocked ? (
                                <span className="flex items-center gap-1">
                                  <Lock className="w-2.5 h-2.5" aria-hidden="true" />
                                  <span>Locked</span>
                                </span>
                              ) : availText}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between text-xs text-text-secondary pt-2 border-t border-border/40">
                            <span className="font-medium">Status</span>
                            <Badge variant={statusVariant} className="text-[10px]">
                              {statusText}
                            </Badge>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>

          {/* ----------------------------------------------------
              Section 5: Certificate Section
          ---------------------------------------------------- */}
          <section aria-labelledby="certificate-section-title">
            <Card className="w-full border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
              <CardHeader className="p-6 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-500 shrink-0" aria-hidden="true" />
                  <CardTitle id="certificate-section-title" className="text-lg sm:text-xl font-bold">
                    Course Certificate
                  </CardTitle>
                </div>
                <CardDescription>
                  Official recognition of completion.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                {!hasCertFlag && certStatus === 'Not Available' ? (
                  <div className="py-2">
                    <EmptyState
                      title="Certificate Not Available"
                      description="An official certificate of completion is not currently offered or available for this specific learning track."
                      icon={<Award className="w-6 h-6 text-text-secondary" />}
                    />
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl border border-border/80 bg-background/80 shadow-xs space-y-4 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-2xs">
                      {certStatus === 'Locked' ? (
                        <Lock className="w-7 h-7 text-amber-500" aria-label="Locked certificate" />
                      ) : certStatus === 'Completed' ? (
                        <CheckCircle2 className="w-7 h-7 text-success" aria-label="Completed certificate" />
                      ) : (
                        <Award className="w-7 h-7 text-primary" aria-label="Available certificate" />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-base font-bold text-foreground">
                        {certTitle}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {certDesc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/40 flex flex-col items-center gap-2">
                      <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Availability Status
                      </span>
                      {certStatus === 'Available' ? (
                        <Badge variant="success" className="px-3 py-1 text-xs">
                          Available
                        </Badge>
                      ) : certStatus === 'Completed' ? (
                        <Badge variant="success" className="px-3 py-1 text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Completed</span>
                        </Badge>
                      ) : certStatus === 'Locked' ? (
                        <Badge variant="warning" className="px-3 py-1 text-xs flex items-center gap-1">
                          <Lock className="w-3 h-3" aria-hidden="true" />
                          <span>Locked</span>
                        </Badge>
                      ) : (
                        <Badge variant="default" className="px-3 py-1 text-xs">
                          {certStatus}
                        </Badge>
                      )}
                    </div>

                    {certMessage && (
                      <p className="text-[11px] text-text-secondary bg-muted/40 p-2.5 rounded-lg border border-border/60 text-left flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                        <span>{certMessage}</span>
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </main>
  );
}

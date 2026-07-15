import { Course } from './mockCourses';
import { mockCourses } from './mockCourses';

export interface EnrolledCourse extends Course {
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessed: string;
}

export const mockEnrolledCourses: EnrolledCourse[] = [
  {
    ...mockCourses[0],
    progress: 45,
    completedLessons: 20,
    totalLessons: 45,
    lastAccessed: '2 hours ago',
  },
  {
    ...mockCourses[1],
    progress: 12,
    completedLessons: 14,
    totalLessons: 120,
    lastAccessed: '1 day ago',
  },
  {
    ...mockCourses[3],
    progress: 100,
    completedLessons: 150,
    totalLessons: 150,
    lastAccessed: '1 week ago',
  }
];

export const mockLearnerStats = {
  hoursLearned: 42.5,
  certificatesEarned: 3,
  coursesCompleted: 4,
  currentStreak: 5,
  weeklyProgress: [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.0 },
    { day: 'Wed', hours: 0 },
    { day: 'Thu', hours: 3.5 },
    { day: 'Fri', hours: 1.0 },
    { day: 'Sat', hours: 4.0 },
    { day: 'Sun', hours: 2.5 },
  ]
};

export const mockUpcoming = [
  { id: 1, title: 'React Hooks Quiz', course: 'Complete React Developer Bootcamp', date: 'Tomorrow, 10:00 AM', type: 'Quiz' },
  { id: 2, title: 'Final UI Assignment', course: 'Advanced UI/UX Principles', date: 'Next Friday, 11:59 PM', type: 'Assignment' },
];

export const mockCurriculum = [
  {
    id: 'sec-1',
    title: 'Getting Started',
    duration: '45m',
    lessons: [
      { id: 'les-1', title: 'Introduction to the Course', duration: '5:00', type: 'video', isCompleted: true },
      { id: 'les-2', title: 'Environment Setup', duration: '15:30', type: 'video', isCompleted: true },
      { id: 'les-3', title: 'Course Resources', duration: '5:00', type: 'document', isCompleted: true },
    ]
  },
  {
    id: 'sec-2',
    title: 'Core Fundamentals',
    duration: '2h 15m',
    lessons: [
      { id: 'les-4', title: 'Understanding State and Props', duration: '25:10', type: 'video', isCompleted: true },
      { id: 'les-5', title: 'Component Lifecycle', duration: '18:45', type: 'video', isCompleted: false, isCurrent: true },
      { id: 'les-6', title: 'Fundamentals Quiz', duration: '10:00', type: 'quiz', isCompleted: false, isLocked: true },
    ]
  },
  {
    id: 'sec-3',
    title: 'Advanced Patterns',
    duration: '3h 30m',
    lessons: [
      { id: 'les-7', title: 'Custom Hooks', duration: '45:00', type: 'video', isCompleted: false, isLocked: true },
      { id: 'les-8', title: 'Context API deep dive', duration: '55:20', type: 'video', isCompleted: false, isLocked: true },
    ]
  }
];

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../features/auth';

import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import LearnerLayout from '../layouts/LearnerLayout';

const Login = React.lazy(() => import('../features/auth/pages/Login'));
const Register = React.lazy(() => import('../features/auth/pages/Register'));
const ForgotPassword = React.lazy(() => import('../features/auth/pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('../features/auth/pages/ResetPassword'));

const AdminDashboard = React.lazy(() => import('../features/dashboard/pages/AdminDashboard'));
const AdminAnalytics = React.lazy(() => import('../features/dashboard/pages/AdminAnalytics'));
const AdminReports = React.lazy(() => import('../features/dashboard/pages/AdminReports'));
const AdminCourses = React.lazy(() => import('../features/courses/pages/AdminCourses'));
const AdminCategories = React.lazy(() => import('../features/courses/pages/AdminCategories'));
const AdminLessons = React.lazy(() => import('../features/lessons/pages/AdminLessons'));
const AdminQuizzes = React.lazy(() => import('../features/quizzes/pages/AdminQuizzes'));
const AdminAssignments = React.lazy(() => import('../features/assignments/pages/AdminAssignments'));
const AdminCertificates = React.lazy(() => import('../features/certificates/pages/AdminCertificates'));
const AdminUsers = React.lazy(() => import('../features/users/pages/AdminUsers'));
const AdminRoles = React.lazy(() => import('../features/users/pages/AdminRoles'));
const AdminReviews = React.lazy(() => import('../features/reviews/pages/AdminReviews'));
const AdminCalendar = React.lazy(() => import('../features/calendar/pages/AdminCalendar'));
const AdminNotifications = React.lazy(() => import('../features/notifications/pages/AdminNotifications'));
const AdminSettings = React.lazy(() => import('../features/settings/pages/AdminSettings'));
const AdminProfile = React.lazy(() => import('../features/profile/pages/AdminProfile'));
const AdminMedia = React.lazy(() => import('../features/media/pages/AdminMedia'));
const AdminAuditLogs = React.lazy(() => import('../features/audit/pages/AdminAuditLogs'));

const LearnerDashboard = React.lazy(() => import('../features/dashboard/pages/LearnerDashboard'));
const LearnerCourses = React.lazy(() => import('../features/courses/pages/LearnerCourses'));
const LearnerCoursePlay = React.lazy(() => import('../features/courses/pages/LearnerCoursePlay'));
const LearnerPaths = React.lazy(() => import('../features/courses/pages/LearnerPaths'));
const LearnerCategories = React.lazy(() => import('../features/courses/pages/LearnerCategories'));
const LearnerAssignments = React.lazy(() => import('../features/assignments/pages/LearnerAssignments'));
const LearnerQuizzes = React.lazy(() => import('../features/quizzes/pages/LearnerQuizzes'));
const LearnerCertificates = React.lazy(() => import('../features/certificates/pages/LearnerCertificates'));
const LearnerAchievements = React.lazy(() => import('../features/certificates/pages/LearnerAchievements'));
const LearnerBookmarks = React.lazy(() => import('../features/bookmarks/pages/LearnerBookmarks'));
const LearnerDownloads = React.lazy(() => import('../features/media/pages/LearnerDownloads'));
const LearnerCalendar = React.lazy(() => import('../features/calendar/pages/LearnerCalendar'));
const LearnerNotifications = React.lazy(() => import('../features/notifications/pages/LearnerNotifications'));
const LearnerProfile = React.lazy(() => import('../features/profile/pages/LearnerProfile'));
const LearnerSettings = React.lazy(() => import('../features/settings/pages/LearnerSettings'));
const LearnerHelp = React.lazy(() => import('../features/settings/pages/LearnerHelp'));

const RootRedirect = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'Admin') return <Navigate to="/admin/dashboard" replace />;
  if (user?.role === 'Learner') return <Navigate to="/learner/dashboard" replace />;
  
  return <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <Routes>
        {/* Root Route */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Unauthorized</h1>
              <p className="text-text-secondary">You do not have permission to access this page.</p>
            </div>
          } />
        </Route>

        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>
          
          {/* Admin Routes */}
          <Route element={<RoleRoute allowedRoles={['Admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/lessons" element={<AdminLessons />} />
              <Route path="/admin/quizzes" element={<AdminQuizzes />} />
              <Route path="/admin/assignments" element={<AdminAssignments />} />
              <Route path="/admin/certificates" element={<AdminCertificates />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/roles" element={<AdminRoles />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
              <Route path="/admin/calendar" element={<AdminCalendar />} />
              <Route path="/admin/notifications" element={<AdminNotifications />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/files" element={<AdminMedia />} />
              <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
            </Route>
          </Route>

          {/* Learner Routes */}
          <Route element={<RoleRoute allowedRoles={['Learner']} />}>
            <Route element={<LearnerLayout />}>
              <Route path="/learner/dashboard" element={<LearnerDashboard />} />
              <Route path="/learner/courses" element={<LearnerCourses />} />
              <Route path="/learner/courses/:courseId/play" element={<LearnerCoursePlay />} />
              <Route path="/learner/paths" element={<LearnerPaths />} />
              <Route path="/learner/categories" element={<LearnerCategories />} />
              <Route path="/learner/assignments" element={<LearnerAssignments />} />
              <Route path="/learner/quizzes" element={<LearnerQuizzes />} />
              <Route path="/learner/certificates" element={<LearnerCertificates />} />
              <Route path="/learner/achievements" element={<LearnerAchievements />} />
              <Route path="/learner/bookmarks" element={<LearnerBookmarks />} />
              <Route path="/learner/downloads" element={<LearnerDownloads />} />
              <Route path="/learner/calendar" element={<LearnerCalendar />} />
              <Route path="/learner/notifications" element={<LearnerNotifications />} />
              <Route path="/learner/profile" element={<LearnerProfile />} />
              <Route path="/learner/settings" element={<LearnerSettings />} />
              <Route path="/learner/help" element={<LearnerHelp />} />
            </Route>
          </Route>

        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

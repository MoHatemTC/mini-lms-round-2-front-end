import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../store/authSelectors';

import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import LearnerLayout from '../layouts/LearnerLayout';
import EmbedLayout from '../layouts/EmbedLayout';

const Login = React.lazy(() => import('../features/auth/pages/Login'));

const AdminCourses = React.lazy(() => import('../features/courses/pages/AdminCourses'));
const CreateCourse = React.lazy(() => import('../features/courses/pages/CreateCourse'));
const UploadMaterial = React.lazy(() => import('../features/courses/pages/UploadMaterial'));
const LearnerCourses = React.lazy(() => import('../features/courses/pages/LearnerCourses'));
const CourseDetails = React.lazy(() => import('../features/courses/pages/CourseDetails'));
const QuizPage = React.lazy(() => import('../features/quizzes/pages/QuizPage'));
const CourseEmbed = React.lazy(() => import('../features/courses/pages/CourseEmbed'));
const CertificateEmbed = React.lazy(() => import('../features/certificates/pages/CertificateEmbed'));
const TaskPage = React.lazy(() => import('../features/assignments/pages/TaskPage'));

const RootRedirect = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'Admin') return <Navigate to="/admin/courses" replace />;
  if (user?.role === 'Learner') return <Navigate to="/learner/courses" replace />;
  
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
          <Route path="/unauthorized" element={
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Unauthorized</h1>
              <p className="text-text-secondary">You do not have permission to access this page.</p>
            </div>
          } />
        </Route>

        {/* Embed Routes */}
        <Route element={<EmbedLayout />}>
          <Route path="/embed/courses" element={<CourseEmbed />} />
          <Route path="/embed/courses/:courseId" element={<CourseEmbed />} />
          <Route path="/courses/:courseId/embed" element={<CourseEmbed />} />
          <Route path="/embed/certificates" element={<CertificateEmbed />} />
          <Route path="/embed/certificates/:certificateId" element={<CertificateEmbed />} />
          <Route path="/certificates/:certificateId/embed" element={<CertificateEmbed />} />
        </Route>

        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>
          
          {/* Admin Routes */}
          <Route element={<RoleRoute allowedRoles={['Admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/courses/create" element={<CreateCourse />} />
              <Route path="/admin/courses/:courseId/materials/upload" element={<UploadMaterial />} />
              <Route path="/admin/quizzes/create" element={<QuizPage isAdmin={true} />} />
              <Route path="/admin/tasks/create" element={<TaskPage isAdmin={true} />} />
            </Route>
          </Route>

          {/* Learner Routes */}
          <Route element={<RoleRoute allowedRoles={['Learner']} />}>
            <Route element={<LearnerLayout />}>
              <Route path="/learner/courses" element={<LearnerCourses />} />
              <Route path="/learner/courses/:courseId" element={<CourseDetails />} />
              <Route path="/learner/quizzes/:id" element={<QuizPage isAdmin={false} />} />
              <Route path="/learner/tasks/:id" element={<TaskPage isAdmin={false} />} />
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

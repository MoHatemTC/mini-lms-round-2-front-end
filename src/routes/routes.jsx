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

const Login = React.lazy(() => import('../features/auth/pages/Login'));

const AdminCourses = React.lazy(() => import('../features/courses/pages/AdminCourses'));
const LearnerCourses = React.lazy(() => import('../features/courses/pages/LearnerCourses'));

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

        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>
          
          {/* Admin Routes */}
          <Route element={<RoleRoute allowedRoles={['Admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/courses" element={<AdminCourses />} />
            </Route>
          </Route>

          {/* Learner Routes */}
          <Route element={<RoleRoute allowedRoles={['Learner']} />}>
            <Route element={<LearnerLayout />}>
              <Route path="/learner/courses" element={<LearnerCourses />} />
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

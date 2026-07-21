import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated } from '../store/authSelectors';
import { ArrowLeft } from 'lucide-react';

const AuthLayout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  // Automatically render correct private layout after authentication
  if (isAuthenticated && user) {
    if (user.role === 'Admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'Learner') {
      return <Navigate to="/learner/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Column: Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link to="/" className="inline-flex items-center text-sm text-text-secondary hover:text-text-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Outlet />
        </div>
      </div>
      
      {/* Right Column: Illustration (Hidden on mobile) */}
      <div className="hidden lg:block relative w-0 flex-1 bg-primary">
        <div className="absolute inset-0 h-full w-full object-cover bg-gradient-to-br from-primary to-accent opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Empower Your Learning Journey</h2>
            <p className="text-primary-foreground/80 text-lg">
              Join thousands of learners and instructors worldwide. Unlock premium courses, earn certificates, and advance your career.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

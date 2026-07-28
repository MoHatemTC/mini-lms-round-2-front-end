import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, FileQuestion, AlertCircle } from 'lucide-react';
import ErrorState from './ErrorState';

/**
 * EmbedAccessError
 * A reusable, lightweight error view tailored for embedded pages (CourseEmbed, CertificateEmbed).
 * Handles HTTP status codes (401, 403, 404, 500) cleanly while:
 * - Never exposing raw backend stack traces or revealing hidden resources on 404.
 * - Preserving safe user navigation (Go Back, Sign In, Return to Dashboard).
 * - Maintaining project design consistency by reusing <ErrorState />.
 * - Ensuring full keyboard accessibility and proper semantic HTML heading structure (<h1>).
 */
export default function EmbedAccessError({ error, resourceName = 'resource', onRetry }) {
  const navigate = useNavigate();
  const status = error?.status;

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleGoDashboard = () => {
    navigate('/');
  };

  const handleGoLogin = () => {
    navigate('/login');
  };

  let title = 'Something Went Wrong';
  let description = `An unexpected error occurred while loading this ${resourceName}. Please try again later.`;
  let variant = 'danger';
  let icon = <AlertCircle className="w-10 h-10 text-red-600" aria-hidden="true" />;
  let primaryAction = onRetry || handleGoBack;
  let primaryText = 'Try Again';
  let secondaryAction = handleGoBack;
  let secondaryText = 'Go Back';

  if (status === 401) {
    title = 'Sign In Required';
    description = `You need to sign in before accessing this ${resourceName}.`;
    variant = 'warning';
    icon = <Lock className="w-10 h-10 text-orange-600" aria-hidden="true" />;
    primaryAction = handleGoLogin;
    primaryText = 'Sign In';
    secondaryAction = handleGoBack;
    secondaryText = 'Go Back';
  } else if (status === 403) {
    title = 'Access Denied';
    description = `You don't have permission to access this ${resourceName}.`;
    variant = 'danger';
    icon = <ShieldAlert className="w-10 h-10 text-red-600" aria-hidden="true" />;
    primaryAction = handleGoBack;
    primaryText = 'Go Back';
    secondaryAction = handleGoDashboard;
    secondaryText = 'Return to Dashboard';
  } else if (status === 404) {
    title = 'Not Found';
    description = `The requested ${resourceName} could not be found.`;
    variant = 'info';
    icon = <FileQuestion className="w-10 h-10 text-blue-600" aria-hidden="true" />;
    primaryAction = handleGoBack;
    primaryText = 'Go Back';
    secondaryAction = handleGoDashboard;
    secondaryText = 'Return to Dashboard';
  }

  return (
    <div 
      className="w-full py-8 px-4 flex flex-col items-center justify-center min-h-[350px] animate-fade-in"
      role="region"
      aria-labelledby="embed-error-heading"
    >
      {/* Semantic Accessible Heading for Screen Readers */}
      <h1 id="embed-error-heading" className="sr-only">
        {title}: {description}
      </h1>
      
      <ErrorState 
        title={title}
        description={description}
        variant={variant}
        icon={icon}
        onRetry={primaryAction}
        retryText={primaryText}
        secondaryAction={secondaryAction}
        secondaryActionText={secondaryText}
      />
    </div>
  );
}

import React from 'react';
import ErrorState from './ErrorState';

export const NetworkError = ({ onRetry, title = "Network Error", description = "We couldn't connect to the server. Please check your internet connection and try again." }) => (
  <ErrorState
    title={title}
    description={description}
    onRetry={onRetry}
    variant="danger"
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    }
  />
);

export const ServerError = ({ onRetry, title = "Server Error", description = "Something went wrong on our end. Our engineering team has been notified. Please try again later." }) => (
  <ErrorState
    title={title}
    description={description}
    onRetry={onRetry}
    variant="danger"
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
      </svg>
    }
  />
);

export const ValidationError = ({ onRetry, title = "Validation Error", description = "The data you submitted was invalid. Please review your input and correct any highlighted errors before continuing." }) => (
  <ErrorState
    title={title}
    description={description}
    onRetry={onRetry}
    retryText="Review Input"
    variant="warning"
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    }
  />
);

export const UnauthorizedError = ({ onRetry, title = "Unauthorized", description = "Your secure session has expired or you need to log in to access this resource." }) => (
  <ErrorState
    title={title}
    description={description}
    onRetry={onRetry}
    retryText="Log In"
    variant="warning"
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
      </svg>
    }
  />
);

export const ForbiddenError = ({ onRetry, title = "Access Denied", description = "You don't have the necessary administrative permissions to view this page or perform this action." }) => (
  <ErrorState
    title={title}
    description={description}
    onRetry={onRetry}
    retryText="Go Back"
    variant="danger"
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
      </svg>
    }
  />
);

export const NotFoundError = ({ onRetry, title = "Page Not Found", description = "We couldn't find the page or resource you were looking for. It may have been moved or permanently deleted." }) => (
  <ErrorState
    title={title}
    description={description}
    onRetry={onRetry}
    retryText="Return to Dashboard"
    variant="info"
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    }
  />
);

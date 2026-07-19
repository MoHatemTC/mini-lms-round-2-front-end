import React from 'react';
import EmptyState from '../../../../components/common/EmptyState/EmptyState';

// 1. No Courses
export const NoCoursesState = ({ onAction }) => (
  <EmptyState
    title="No Courses Yet"
    description="You haven't created any courses. Start building your curriculum by creating your very first course."
    actionText="Create Course"
    onAction={onAction}
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
    }
  />
);

// 2. No Files
export const NoFilesState = ({ onAction }) => (
  <EmptyState
    title="No Files Uploaded"
    description="This course doesn't have any attached resources. Upload videos, PDFs, or documents to enrich the learning experience."
    actionText="Upload Files"
    onAction={onAction}
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    }
  />
);

// 3. Search Returned No Results
export const NoResultsState = ({ onAction }) => (
  <EmptyState
    title="No Results Found"
    description="We couldn't find anything matching your current search criteria. Try adjusting your filters or search terms."
    actionText="Clear Filters"
    onAction={onAction}
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    }
  />
);

// 4. Upload Failed
export const UploadFailedState = ({ onAction, onSecondaryAction }) => (
  <EmptyState
    type="error"
    title="Upload Failed"
    description="There was a problem uploading your file. This could be due to a network interruption or an unsupported file format."
    actionText="Try Again"
    onAction={onAction}
    secondaryActionText="Cancel"
    onSecondaryAction={onSecondaryAction}
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
    }
  />
);

// 5. Draft Saved Successfully
export const DraftSavedState = ({ onAction, onSecondaryAction }) => (
  <EmptyState
    type="success"
    title="Draft Saved Successfully"
    description="Your course draft has been saved securely. You can continue editing it later or publish it right away."
    actionText="View Courses List"
    onAction={onAction}
    secondaryActionText="Continue Editing"
    onSecondaryAction={onSecondaryAction}
    icon={
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    }
  />
);

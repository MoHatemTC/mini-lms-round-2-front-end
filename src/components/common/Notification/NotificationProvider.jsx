import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';

const NotificationContext = createContext(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(({ title, message, type = 'success', duration = 5000 }) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type, duration }]);
  }, []);

  // Pre-configured hooks for Course Module requested cases
  const notifyCourseSaved = () => addToast({ title: 'Course Saved', message: 'Your course has been saved successfully.', type: 'success' });
  const notifyCourseUpdated = () => addToast({ title: 'Course Updated', message: 'Course changes have been applied successfully.', type: 'success' });
  const notifyFileUploaded = (fileName) => addToast({ title: 'File Uploaded', message: `${fileName ? `"${fileName}"` : 'Your file'} has been securely uploaded.`, type: 'success' });
  const notifyFileDeleted = () => addToast({ title: 'File Deleted', message: 'The file has been permanently removed.', type: 'info' });
  const notifyDraftDeleted = () => addToast({ title: 'Draft Deleted', message: 'The course draft has been securely deleted.', type: 'info' });

  return (
    <NotificationContext.Provider value={{
      addToast,
      removeToast,
      notifyCourseSaved,
      notifyCourseUpdated,
      notifyFileUploaded,
      notifyFileDeleted,
      notifyDraftDeleted
    }}>
      {children}
      
      {/* Global Toast Container */}
      <div className="fixed bottom-0 right-0 p-4 sm:p-6 space-y-4 z-50 flex flex-col items-end pointer-events-none w-full sm:w-auto sm:max-w-md">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

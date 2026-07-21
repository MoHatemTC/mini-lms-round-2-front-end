import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import { useAuthInit } from './hooks/useAuthInit';
import ErrorBoundary from './components/common/ErrorBoundary';
import { NotificationProvider } from './components/common/Notification/NotificationProvider';

const App = () => {
  // Initialize authentication state on application start
  useAuthInit();

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </NotificationProvider>
    </ErrorBoundary>
  );
};

export default App;

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-6">
          <div className="flex max-w-md flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-500" />
            </div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">Something went wrong</h1>
            <p className="mb-8 text-muted-foreground">
              We&apos;ve encountered an unexpected error. Please try refreshing the page or come back later.
            </p>
            <button
              onClick={this.handleReload}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Page
            </button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 w-full rounded-md bg-muted p-4 text-left overflow-auto max-h-64">
                <p className="font-mono text-sm text-red-500 font-semibold mb-2">{this.state.error.toString()}</p>
                <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

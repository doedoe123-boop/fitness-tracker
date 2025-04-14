import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaRedoAlt } from 'react-icons/fa';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Here you could log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/70 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-transparent opacity-50" />
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20 
                  }}
                >
                  <FaExclamationTriangle className="text-5xl text-rose-600" />
                </motion.div>
              </div>

              <h1 className="text-2xl font-bold text-slate-900 text-center mb-4">
                Oops! Something went wrong
              </h1>

              <p className="text-slate-600 text-center mb-6">
                We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
              </p>

              <div className="flex justify-center gap-4">
                <motion.button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaRedoAlt className="mr-2" />
                  Refresh Page
                </motion.button>
              </div>

              {import.meta.env.DEV && (
                <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                  <details className="text-sm text-slate-600">
                    <summary className="cursor-pointer mb-2 font-medium text-slate-900">
                      Error Details
                    </summary>
                    <pre className="whitespace-pre-wrap overflow-auto">
                      {this.state.error?.toString()}
                      {'\n\n'}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-slate-50 px-4">
          <div className="max-w-md w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-violet rounded-xl p-8"
            >
              <div className="mb-6">
                <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4" aria-hidden="true"></i>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                  Oops! Something went wrong
                </h1>
                <p className="text-slate-600">
                  We encountered an unexpected error. Please try refreshing the page or go back to the homepage.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                  <p className="text-red-700 text-sm font-mono">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleReload}
                  className="flex-1 bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors font-medium"
                >
                  <i className="fas fa-refresh mr-2" aria-hidden="true"></i>
                  Reload Page
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleGoHome}
                  className="flex-1 border border-violet-500 text-violet-600 px-4 py-2 rounded-lg hover:bg-violet-50 transition-colors font-medium"
                >
                  <i className="fas fa-home mr-2" aria-hidden="true"></i>
                  Go Home
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

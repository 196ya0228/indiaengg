import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ""
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }

    // In production, you would send this to your error reporting service
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    try {
      // Production error logging
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        errorId: this.state.errorId,
        company: "India Engineering Works"
      };

      // Store locally for debugging
      localStorage.setItem(`error_${this.state.errorId}`, JSON.stringify(errorData));
      
      // In production, send to error monitoring service
      // Example: Sentry, LogRocket, or custom endpoint
      console.warn('Error logged locally. In production, this would be sent to monitoring service.');
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    const subject = encodeURIComponent(`Error Report - ${this.state.errorId}`);
    const body = encodeURIComponent(`
Error ID: ${this.state.errorId}
Time: ${new Date().toISOString()}
Page: ${window.location.href}
Error: ${this.state.error?.message || 'Unknown error'}

Please describe what you were doing when this error occurred:
[Your description here]
    `);
    
    window.open(`mailto:india_enggworks@yahoo.in?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Oops! Something went wrong
              </CardTitle>
              <p className="text-gray-600 mt-2">
                We apologize for the inconvenience. An unexpected error occurred.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <Alert className="border-orange-200 bg-orange-50">
                <Bug className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-700">
                  <div className="space-y-2">
                    <p><strong>Error ID:</strong> {this.state.errorId}</p>
                    <p><strong>Time:</strong> {new Date().toLocaleString()}</p>
                    {process.env.NODE_ENV === 'development' && (
                      <details className="mt-2">
                        <summary className="cursor-pointer font-medium">Technical Details (Development)</summary>
                        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                          {this.state.error?.message}
                          {this.state.error?.stack}
                        </pre>
                      </details>
                    )}
                  </div>
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={this.handleReload}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Page
                </Button>
                
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="w-full"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
                
                <Button 
                  onClick={this.handleReportError}
                  variant="outline"
                  className="w-full"
                >
                  <Bug className="h-4 w-4 mr-2" />
                  Report Error
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">What can you do?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Try refreshing the page</li>
                  <li>• Clear your browser cache and cookies</li>
                  <li>• Check your internet connection</li>
                  <li>• Report this error if it persists</li>
                </ul>
              </div>

              <div className="text-center border-t pt-4">
                <p className="text-sm text-gray-500">
                  <strong>India Engineering Works</strong> - Technical Support
                </p>
                <p className="text-sm text-gray-500">
                  📞 +91 98372 00396 | 📧 india_enggworks@yahoo.in
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

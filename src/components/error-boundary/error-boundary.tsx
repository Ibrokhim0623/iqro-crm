import { Component, type ReactNode } from "react";
import { Button } from "antd";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-[var(--bg-surface)]">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Xatolik yuz berdi
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {this.state.error?.message || "Noma'lum xatolik yuz berdi"}
            </p>
            <div className="flex gap-4 justify-center">
              <Button type="primary" onClick={this.handleReset}>
                Sahifani yangilash
              </Button>
              <Button onClick={() => (window.location.href = "/")}>
                Bosh sahifaga qaytish
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
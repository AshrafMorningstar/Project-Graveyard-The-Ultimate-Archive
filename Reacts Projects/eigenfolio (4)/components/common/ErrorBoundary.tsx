/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen bg-black flex items-center justify-center text-white p-10 flex-col gap-4">
            <h1 className="text-4xl font-bold text-red-500">System Error</h1>
            <p className="text-gray-400">AshrafOS encountered a critical error.</p>
            <code className="bg-gray-900 p-4 rounded text-xs font-mono text-red-300 max-w-lg overflow-auto">
                {this.state.error?.message}
            </code>
            <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
            >
                Restart System
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}
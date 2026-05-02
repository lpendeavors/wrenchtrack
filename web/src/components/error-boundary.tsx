"use client";

import * as Sentry from "@sentry/nextjs";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorBoundaryProps { children: React.ReactNode; }
interface ErrorBoundaryState { hasError: boolean; error?: Error; eventId?: string; }

export class SentryErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setTag("section", "react-error-boundary");
      scope.setLevel("fatal");
      scope.setContext("react", { componentStack: errorInfo.componentStack });
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  override render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} eventId={this.state.eventId} />;
    }
    return this.props.children;
  }
}

function ErrorFallback({ error, eventId }: { error?: Error; eventId?: string }) {
  useEffect(() => {
    Sentry.captureMessage("User viewed error fallback page", {
      level: "info",
      tags: { eventId, section: "error-fallback" },
      extra: { originalError: error?.message },
    });
  }, [eventId, error]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 text-center shadow-2xl">
        <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-xl font-semibold text-white mb-2">Something went wrong</h1>
        <p className="text-slate-400 mb-6 text-sm">
          We&apos;ve been notified and are working on a fix. If this keeps happening, try refreshing the page.
        </p>
        {process.env.NODE_ENV === "development" && error && (
          <pre className="text-left bg-slate-950 rounded-lg p-4 text-xs text-red-300 mb-6 overflow-auto max-h-40">
            {error.message}{"\n"}{error.stack}
          </pre>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => window.location.reload()} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh Page
          </Button>
          <Link href="/dashboard">
            <Button variant="default" className="gap-2 w-full sm:w-auto">
              <Home className="w-4 h-4" /> Go to Dashboard
            </Button>
          </Link>
        </div>
        {eventId && (
          <p className="mt-6 text-xs text-slate-500">
            Error ID: <code className="text-slate-400">{eventId}</code>
          </p>
        )}
      </div>
    </div>
  );
}

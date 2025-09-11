import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import Home from "@/pages/Home";
import AllProjects from "@/pages/AllProjects";
import AllCertificates from "@/pages/AllCertificates";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={AllProjects} />
      <Route path="/certificates" component={AllCertificates} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // 🚫 DISABLE RIGHT-CLICK CONTEXT MENU PROTECTION
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable common keyboard shortcuts for developer tools
    const handleKeydown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection with mouse drag (optional)
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('selectstart', handleSelectStart);

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <PerformanceMonitor />
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

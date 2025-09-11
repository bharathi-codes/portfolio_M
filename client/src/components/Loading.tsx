import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} border-2 border-violet-200 border-t-violet-500 rounded-full ${className}`}
      aria-label="Loading"
    />
  );
}

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
}

export function Skeleton({ className = "", variant = "rectangular" }: SkeletonProps) {
  const variantClasses = {
    text: "h-4 rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full"
  };

  return (
    <div 
      className={`bg-violet-100 animate-pulse ${variantClasses[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-slate-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-slate-600 text-lg">{message}</p>
      </div>
    </div>
  );
}

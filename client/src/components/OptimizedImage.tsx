import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  placeholder?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  objectFit = "cover",
  placeholder
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Placeholder/Loading state */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-violet-100 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          {placeholder ? (
            <img 
              src={placeholder} 
              alt="" 
              className="w-full h-full object-cover opacity-50" 
            />
          ) : (
            <i className="fas fa-image text-violet-300 text-2xl" aria-hidden="true"></i>
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-gray-100 flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-center text-gray-400">
            <i className="fas fa-exclamation-triangle text-2xl mb-2" aria-hidden="true"></i>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full h-full transition-opacity duration-300 ${
            objectFit === "cover" ? "object-cover" :
            objectFit === "contain" ? "object-contain" :
            objectFit === "fill" ? "object-fill" :
            objectFit === "none" ? "object-none" :
            "object-scale-down"
          }`}
          style={{ display: hasError ? 'none' : 'block' }}
        />
      )}
    </div>
  );
}

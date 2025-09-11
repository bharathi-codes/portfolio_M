import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (import.meta.env.DEV) return;

    // Monitor Core Web Vitals
    const observePerformance = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              console.log('LCP:', entry.startTime);
              // Send to analytics if needed
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  name: 'LCP',
                  value: Math.round(entry.startTime),
                  event_category: 'Performance'
                });
              }
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              const fidEntry = entry as any;
              const fid = fidEntry.processingStart - fidEntry.startTime;
              console.log('FID:', fid);
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  name: 'FID',
                  value: Math.round(fid),
                  event_category: 'Performance'
                });
              }
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          let clsEntries = [];
          const clsObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              const clsEntry = entry as any;
              if (!clsEntry.hadRecentInput) {
                clsEntries.push(entry);
                clsValue += clsEntry.value;
              }
            }
            console.log('CLS:', clsValue);
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                name: 'CLS',
                value: Math.round(clsValue * 1000) / 1000,
                event_category: 'Performance'
              });
            }
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

        } catch (error) {
          console.warn('Performance monitoring failed:', error);
        }
      }

      // Monitor page load performance
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const metrics = {
            'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
            'Connection Time': navigation.connectEnd - navigation.connectStart,
            'Request Time': navigation.responseStart - navigation.requestStart,
            'Response Time': navigation.responseEnd - navigation.responseStart,
            'DOM Parse': navigation.domContentLoadedEventStart - navigation.responseEnd,
            'Load Complete': navigation.loadEventStart - navigation.domContentLoadedEventStart
          };
          
          console.log('Page Load Metrics:', metrics);
        }
      });
    };

    // Initialize performance monitoring
    observePerformance();

  }, []);

  return null; // This component doesn't render anything
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default PerformanceMonitor;

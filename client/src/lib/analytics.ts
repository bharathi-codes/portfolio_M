// Simple analytics for tracking user interactions
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  timestamp: number;
}

// Performance entry interfaces for Core Web Vitals
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  cancelable?: boolean;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  lastInputTime: number;
  sources: Array<{
    node: Node;
    currentRect: DOMRectReadOnly;
    previousRect: DOMRectReadOnly;
  }>;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private isEnabled = true;

  constructor() {
    // Respect user privacy - disable in development
    if (process.env.NODE_ENV === 'development') {
      this.isEnabled = false;
    }
  }

  track(action: string, category: string, label?: string, value?: number) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      action,
      category,
      label,
      value,
      timestamp: Date.now()
    };

    this.events.push(event);
    
    // In a real app, you'd send this to your analytics service
    console.log('Analytics Event:', event);
  }

  trackPageView(page: string) {
    this.track('page_view', 'navigation', page);
  }

  trackClick(element: string, location?: string) {
    this.track('click', 'interaction', element, undefined);
  }

  trackDownload(filename: string) {
    this.track('download', 'file', filename);
  }

  trackContactForm(action: 'submit' | 'error') {
    this.track(action, 'contact_form');
  }

  trackProjectView(projectId: string) {
    this.track('view', 'project', projectId);
  }

  trackSocialClick(platform: string) {
    this.track('click', 'social', platform);
  }

  getEvents() {
    return this.events;
  }

  clearEvents() {
    this.events = [];
  }
}

export const analytics = new Analytics();

// Performance monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance() {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  markStart(name: string) {
    performance.mark(`${name}-start`);
  }

  markEnd(name: string) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name, 'measure')[0];
    if (measure) {
      this.metrics.set(name, measure.duration);
      console.log(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
    }
  }

  getMetric(name: string): number | undefined {
    return this.metrics.get(name);
  }

  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // Monitor Core Web Vitals
  observeCoreWebVitals() {
    if (!('PerformanceObserver' in window)) return;

    // Largest Contentful Paint (LCP)
    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('LCP:', entry.startTime);
          this.metrics.set('lcp', entry.startTime);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observer not supported');
    }

    // First Input Delay (FID)
    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fidEntry = entry as PerformanceEventTiming;
          if (fidEntry.processingStart) {
            const fid = fidEntry.processingStart - fidEntry.startTime;
            console.log('FID:', fid);
            this.metrics.set('fid', fid);
          }
        }
      }).observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID observer not supported');
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const clsEntry = entry as LayoutShiftEntry;
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        }
        console.log('CLS:', clsValue);
        this.metrics.set('cls', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS observer not supported');
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

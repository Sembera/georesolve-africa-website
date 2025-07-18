import { useEffect, useCallback, useState } from 'react';

// Type declaration for gtag
declare global {
  function gtag(...args: any[]): void;
}

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  loadTime?: number;
  domContentLoaded?: number;
}

interface UsePerformanceReturn {
  metrics: PerformanceMetrics;
  isLoading: boolean;
  reportMetric: (name: string, value: number) => void;
}

// Performance observer utility
const observePerformance = (
  callback: (metric: { name: string; value: number }) => void
) => {
  // Observe paint metrics (FCP)
  if ('PerformanceObserver' in window) {
    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            callback({ name: 'fcp', value: entry.startTime });
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });

      // Observe LCP
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          callback({ name: 'lcp', value: entry.startTime });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Observe FID
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any; // FID entry has special properties
          callback({ name: 'fid', value: fidEntry.processingStart - fidEntry.startTime });
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Observe CLS
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        if (clsValue > 0) {
          callback({ name: 'cls', value: clsValue });
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Cleanup function
      return () => {
        paintObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    } catch (error) {
      console.warn('Performance Observer not fully supported:', error);
    }
  }

  return () => {}; // No-op cleanup if PerformanceObserver not supported
};

// Get navigation timing metrics
const getNavigationMetrics = (): Partial<PerformanceMetrics> => {
  if (!('performance' in window) || !performance.timing) {
    return {};
  }

  const timing = performance.timing;

  // Calculate various timing metrics
  const ttfb = timing.responseStart - timing.fetchStart;
  const domContentLoaded = timing.domContentLoadedEventEnd - timing.fetchStart;
  const loadTime = timing.loadEventEnd - timing.fetchStart;

  return {
    ttfb,
    domContentLoaded,
    loadTime
  };
};

// Custom hook for performance monitoring
export const usePerformance = (): UsePerformanceReturn => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isLoading, setIsLoading] = useState(true);

  const reportMetric = useCallback((name: string, value: number) => {
    setMetrics(prev => ({
      ...prev,
      [name]: value
    }));

    // Optional: Send to analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: Math.round(value),
        custom_parameter_1: name
      });
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log(`Performance Metric - ${name}:`, Math.round(value));
    }
  }, []);

  useEffect(() => {
    // Get initial navigation metrics
    const navMetrics = getNavigationMetrics();
    setMetrics(prev => ({ ...prev, ...navMetrics }));

    // Set up performance observers
    const cleanup = observePerformance(({ name, value }) => {
      reportMetric(name, value);
    });

    // Mark as loaded when DOM is ready
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      const handleLoad = () => {
        setIsLoading(false);
        // Get updated navigation metrics after load
        const updatedMetrics = getNavigationMetrics();
        setMetrics(prev => ({ ...prev, ...updatedMetrics }));
      };

      window.addEventListener('load', handleLoad, { once: true });

      return () => {
        cleanup();
        window.removeEventListener('load', handleLoad);
      };
    }

    return cleanup;
  }, [reportMetric]);

  return {
    metrics,
    isLoading,
    reportMetric
  };
};

// Utility function to get performance score
export const getPerformanceScore = (metrics: PerformanceMetrics): number => {
  let score = 100;

  // FCP scoring (Good: < 1.8s, Needs Improvement: 1.8s-3s, Poor: > 3s)
  if (metrics.fcp) {
    if (metrics.fcp > 3000) score -= 20;
    else if (metrics.fcp > 1800) score -= 10;
  }

  // LCP scoring (Good: < 2.5s, Needs Improvement: 2.5s-4s, Poor: > 4s)
  if (metrics.lcp) {
    if (metrics.lcp > 4000) score -= 25;
    else if (metrics.lcp > 2500) score -= 15;
  }

  // FID scoring (Good: < 100ms, Needs Improvement: 100ms-300ms, Poor: > 300ms)
  if (metrics.fid) {
    if (metrics.fid > 300) score -= 20;
    else if (metrics.fid > 100) score -= 10;
  }

  // CLS scoring (Good: < 0.1, Needs Improvement: 0.1-0.25, Poor: > 0.25)
  if (metrics.cls) {
    if (metrics.cls > 0.25) score -= 25;
    else if (metrics.cls > 0.1) score -= 15;
  }

  // TTFB scoring (Good: < 800ms, Needs Improvement: 800ms-1800ms, Poor: > 1800ms)
  if (metrics.ttfb) {
    if (metrics.ttfb > 1800) score -= 10;
    else if (metrics.ttfb > 800) score -= 5;
  }

  return Math.max(0, score);
};

// Performance monitoring utility functions
export const createPerformanceReport = (metrics: PerformanceMetrics) => {
  const score = getPerformanceScore(metrics);
  return {
    score,
    metrics,
    timestamp: Date.now(),
    recommendations: generateRecommendations(metrics)
  };
};

const generateRecommendations = (metrics: PerformanceMetrics): string[] => {
  const recommendations: string[] = [];

  if (metrics.lcp && metrics.lcp > 2500) {
    recommendations.push('Consider optimizing largest contentful paint by compressing images');
  }

  if (metrics.fcp && metrics.fcp > 1800) {
    recommendations.push('Improve first contentful paint by reducing render-blocking resources');
  }

  if (metrics.cls && metrics.cls > 0.1) {
    recommendations.push('Reduce cumulative layout shift by setting image dimensions');
  }

  if (metrics.fid && metrics.fid > 100) {
    recommendations.push('Improve first input delay by optimizing JavaScript execution');
  }

  return recommendations;
};

// Production-grade performance monitoring for India Engineering Works

/**
 * Performance metrics collector
 */
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private marks: Map<string, number> = new Map();

  /**
   * Start timing a operation
   */
  start(name: string): void {
    this.marks.set(name, performance.now());
  }

  /**
   * End timing and record metric
   */
  end(name: string): number {
    const startTime = this.marks.get(name);
    if (!startTime) {
      console.warn(`Performance mark '${name}' not found`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.recordMetric(name, duration);
    this.marks.delete(name);
    return duration;
  }

  /**
   * Record a metric value
   */
  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);

    // Keep only last 100 measurements
    const values = this.metrics.get(name)!;
    if (values.length > 100) {
      values.shift();
    }
  }

  /**
   * Get metric statistics
   */
  getStats(name: string): { avg: number; min: number; max: number; count: number } | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;

    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return { avg, min, max, count: values.length };
  }

  /**
   * Get all metrics
   */
  getAllStats(): Record<string, any> {
    const stats: Record<string, any> = {};
    for (const [name] of this.metrics) {
      stats[name] = this.getStats(name);
    }
    return stats;
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics.clear();
    this.marks.clear();
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * Monitor Core Web Vitals
 */
export const initializeWebVitals = (): void => {
  // Largest Contentful Paint (LCP)
  if ('LargestContentfulPaint' in window) {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      performanceMonitor.recordMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // First Input Delay (FID)
  if ('PerformanceEventTiming' in window) {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as PerformanceEventTiming[];
      entries.forEach((entry) => {
        if (entry.name === 'first-input') {
          const fid = entry.processingStart - entry.startTime;
          performanceMonitor.recordMetric('FID', fid);
        }
      });
    }).observe({ entryTypes: ['first-input'] });
  }

  // Cumulative Layout Shift (CLS)
  if ('LayoutShift' in window) {
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as any[];
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      performanceMonitor.recordMetric('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

/**
 * Monitor page load performance
 */
export const monitorPageLoad = (): void => {
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      performanceMonitor.recordMetric('DOM_Load', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
      performanceMonitor.recordMetric('Page_Load', navigation.loadEventEnd - navigation.loadEventStart);
      performanceMonitor.recordMetric('TTFB', navigation.responseStart - navigation.requestStart);
      performanceMonitor.recordMetric('DOM_Interactive', navigation.domInteractive - navigation.navigationStart);
    }

    // Report initial load metrics
    setTimeout(() => {
      const stats = performanceMonitor.getAllStats();
      console.info('🚀 India Engineering Works - Performance Metrics:', stats);
    }, 1000);
  });
};

/**
 * Image loading performance monitor
 */
export const monitorImageLoading = (): void => {
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    const startTime = performance.now();
    
    img.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      performanceMonitor.recordMetric(`Image_Load_${index}`, loadTime);
    });

    img.addEventListener('error', () => {
      console.warn(`Failed to load image: ${img.src}`);
    });
  });
};

/**
 * Bundle size analyzer
 */
export const analyzeBundleSize = (): void => {
  if ('getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    let totalSize = 0;
    const sizes: Record<string, number> = {};

    resources.forEach((resource) => {
      if (resource.transferSize) {
        totalSize += resource.transferSize;
        
        const url = new URL(resource.name);
        const filename = url.pathname.split('/').pop() || 'unknown';
        sizes[filename] = resource.transferSize;
      }
    });

    console.info('📦 Bundle Analysis:', {
      totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
      largestFiles: Object.entries(sizes)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([name, size]) => ({ name, size: `${(size / 1024).toFixed(2)} KB` }))
    });
  }
};

/**
 * Memory usage monitor
 */
export const monitorMemoryUsage = (): void => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    const usage = {
      used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
    };
    
    performanceMonitor.recordMetric('Memory_Used', memory.usedJSHeapSize / 1024 / 1024);
    console.info('🧠 Memory Usage:', usage);
  }
};

/**
 * Network performance monitor
 */
export const monitorNetworkPerformance = (): void => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    const networkInfo = {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
    
    console.info('🌐 Network Info:', networkInfo);
    
    // Monitor connection changes
    connection.addEventListener('change', () => {
      console.info('🌐 Network changed:', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      });
    });
  }
};

/**
 * Performance timing decorator
 */
export const withPerformanceMonitoring = <T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T => {
  return ((...args: any[]) => {
    performanceMonitor.start(name);
    try {
      const result = fn(...args);
      
      // Handle async functions
      if (result instanceof Promise) {
        return result.finally(() => {
          performanceMonitor.end(name);
        });
      }
      
      performanceMonitor.end(name);
      return result;
    } catch (error) {
      performanceMonitor.end(name);
      throw error;
    }
  }) as T;
};

/**
 * Lazy loading intersection observer
 */
export const createLazyLoader = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1
  });
};

/**
 * Performance optimization recommendations
 */
export const getPerformanceRecommendations = (): string[] => {
  const recommendations: string[] = [];
  const stats = performanceMonitor.getAllStats();

  // Check LCP
  if (stats.LCP && stats.LCP.avg > 2500) {
    recommendations.push('🚨 LCP is slow. Consider optimizing images and reducing server response time.');
  }

  // Check FID
  if (stats.FID && stats.FID.avg > 100) {
    recommendations.push('🚨 FID is high. Consider code splitting and reducing JavaScript execution time.');
  }

  // Check CLS
  if (stats.CLS && stats.CLS.avg > 0.1) {
    recommendations.push('🚨 CLS is high. Ensure images have dimensions and avoid dynamic content insertion.');
  }

  // Check memory usage
  if (stats.Memory_Used && stats.Memory_Used.avg > 50) {
    recommendations.push('💾 High memory usage detected. Consider optimizing component re-renders.');
  }

  if (recommendations.length === 0) {
    recommendations.push('✅ Performance looks good! Keep up the great work.');
  }

  return recommendations;
};

/**
 * Initialize all performance monitoring
 */
export const initializePerformanceMonitoring = (): void => {
  console.info('🚀 Initializing performance monitoring for India Engineering Works...');
  
  initializeWebVitals();
  monitorPageLoad();
  monitorNetworkPerformance();
  
  // Monitor images after DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    monitorImageLoading();
  });

  // Periodic memory monitoring
  setInterval(() => {
    if (process.env.NODE_ENV === 'development') {
      monitorMemoryUsage();
    }
  }, 30000); // Every 30 seconds

  // Bundle analysis in development
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('load', () => {
      setTimeout(analyzeBundleSize, 2000);
    });
  }

  // Performance report
  setTimeout(() => {
    const recommendations = getPerformanceRecommendations();
    console.info('📊 Performance Recommendations:', recommendations);
  }, 5000);
};

export default {
  performanceMonitor,
  withPerformanceMonitoring,
  createLazyLoader,
  initializePerformanceMonitoring,
  getPerformanceRecommendations,
};

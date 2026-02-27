// Performance Optimization Utilities

import { useEffect, useRef, useCallback } from 'react';

/**
 * Debounce function for search inputs and filters
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll and resize events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Hook for debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for intersection observer (lazy loading)
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

/**
 * Hook for measuring component performance
 */
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName}:`, {
        renderCount: renderCount.current,
        renderTime: `${renderTime.toFixed(2)}ms`,
      });
    }

    startTime.current = performance.now();
  });
}

/**
 * Memoize expensive calculations
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Virtual scrolling helper
 */
export function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    offsetY,
    totalHeight: items.length * itemHeight,
    onScroll: (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
  };
}

/**
 * Image lazy loading
 */
export function useLazyImage(src: string): string | undefined {
  const [imageSrc, setImageSrc] = React.useState<string>();
  const imgRef = useRef<HTMLImageElement>();

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
    };
    imgRef.current = img;

    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null;
      }
    };
  }, [src]);

  return imageSrc;
}

/**
 * Prefetch data for better UX
 */
export function prefetchData(url: string) {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }
}

/**
 * Web Worker helper for heavy computations
 */
export function useWebWorker<T, R>(
  workerFunction: (data: T) => R
): [(data: T) => Promise<R>, boolean] {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const processData = useCallback(
    (data: T): Promise<R> => {
      return new Promise((resolve, reject) => {
        setIsProcessing(true);

        // Create worker from function
        const blob = new Blob(
          [
            `self.onmessage = function(e) {
              const result = (${workerFunction.toString()})(e.data);
              self.postMessage(result);
            }`,
          ],
          { type: 'application/javascript' }
        );

        const worker = new Worker(URL.createObjectURL(blob));

        worker.onmessage = (e) => {
          setIsProcessing(false);
          resolve(e.data);
          worker.terminate();
        };

        worker.onerror = (error) => {
          setIsProcessing(false);
          reject(error);
          worker.terminate();
        };

        worker.postMessage(data);
      });
    },
    [workerFunction]
  );

  return [processData, isProcessing];
}

/**
 * Request idle callback for non-critical tasks
 */
export function useIdleCallback(callback: () => void, deps: any[] = []) {
  React.useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(callback);
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(callback, 1);
      return () => clearTimeout(id);
    }
  }, deps);
}

/**
 * Batch state updates for better performance
 */
export function useBatchedState<T>(
  initialState: T
): [T, (updater: (prev: T) => T) => void] {
  const [state, setState] = React.useState(initialState);
  const pendingUpdates = useRef<Array<(prev: T) => T>>([]);
  const rafId = useRef<number>();

  const batchedSetState = useCallback((updater: (prev: T) => T) => {
    pendingUpdates.current.push(updater);

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(() => {
        setState((prev) => {
          let next = prev;
          pendingUpdates.current.forEach((update) => {
            next = update(next);
          });
          pendingUpdates.current = [];
          rafId.current = undefined;
          return next;
        });
      });
    }
  }, []);

  return [state, batchedSetState];
}

// Add React import at the top
import * as React from 'react';

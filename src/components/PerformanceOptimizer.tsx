import { useEffect, memo } from 'react';

const PerformanceOptimizer = memo(() => {
  useEffect(() => {
    // Intersection Observer for lazy loading
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Lazy load images
          if (element.tagName === 'IMG' && element.dataset.src) {
            (element as HTMLImageElement).src = element.dataset.src;
            element.removeAttribute('data-src');
            observer.unobserve(element);
          }
          
          // Animate elements when in view
          if (element.classList.contains('animate-on-scroll')) {
            element.classList.add('animate-fade-in-up');
            observer.unobserve(element);
          }
        }
      });
    }, observerOptions);

    // Observe all lazy loading candidates
    const lazyImages = document.querySelectorAll('img[data-src]');
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    lazyImages.forEach((img) => observer.observe(img));
    animateElements.forEach((el) => observer.observe(el));

    // Service Worker for caching (if available)
    if ('serviceWorker' in navigator && 'caches' in window) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Silently fail if service worker registration fails
      });
    }

    // Prefetch critical routes on idle
    const prefetchRoutes = ['/entrance-exams', '/exit-exams', '/success-stories'];
    
    const prefetchOnIdle = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          prefetchRoutes.forEach((route) => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            document.head.appendChild(link);
          });
        });
      }
    };

    // Wait a bit before prefetching
    setTimeout(prefetchOnIdle, 2000);

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
});

PerformanceOptimizer.displayName = 'PerformanceOptimizer';

export default PerformanceOptimizer;
import { useEffect } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Preload critical resources
    const criticalResources = [
      '/src/assets/education-hero.jpg',
      '/src/assets/ethiopian-students-hero.jpg',
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resource;
      document.head.appendChild(link);
    });

    // Enable font display swap for better performance
    const fontLinks = document.querySelectorAll('link[href*="fonts"]');
    fontLinks.forEach(link => {
      const linkElement = link as HTMLLinkElement;
      linkElement.setAttribute('font-display', 'swap');
    });

    // Optimize images loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }
    });

    return () => {
      // Cleanup preload links on unmount
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (criticalResources.some(resource => link.getAttribute('href')?.includes(resource))) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);
};
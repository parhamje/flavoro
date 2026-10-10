import { useEffect } from 'react';

/**
 * useScrollReveal Hook
 * Automatically attaches an IntersectionObserver to all elements with
 * .reveal, .reveal-left, .reveal-right, .reveal-scale classes and adds .revealed when scrolled into view.
 */
export function useScrollReveal(dependency) {
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, keep it visible or unobserve
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [dependency]);
}

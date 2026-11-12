import { useEffect, useRef } from 'react';

/**
 * Hook that applies a parallax effect to an element based on scroll position.
 * Returns a ref to attach to the element.
 * @param speed - Parallax speed factor (0.1 = subtle, 0.5 = moderate, 1.0 = full)
 */
export function useParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      const translateY = distanceFromCenter * speed;

      el.style.transform = `translateY(${translateY}px)`;
    };

    // Throttle scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', throttledScroll);
  }, [speed]);

  return ref;
}

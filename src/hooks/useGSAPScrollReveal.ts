import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAPScrollReveal() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animatable = el.querySelectorAll('[data-animate]');

    if (prefersReduced) {
      animatable.forEach((child) => {
        gsap.set(child, { opacity: 1, y: 0 });
      });
      return;
    }

    gsap.set(animatable, { opacity: 0, y: 60 });

    const ctx = gsap.context(() => {
      animatable.forEach((child, i) => {
        gsap.to(child, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return containerRef;
}

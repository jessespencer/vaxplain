import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCountUp(target: number, suffix = '', decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(`${target.toFixed(decimals)}${suffix}`);
      return;
    }

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        setDisplay(`${obj.val.toFixed(decimals)}${suffix}`);
      },
    });

    return () => {
      tween.kill();
    };
  }, [target, suffix, decimals]);

  return { ref, display };
}

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const cinematicReveal = (element: string | HTMLElement, options = {}) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50, filter: 'blur(10px)', scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        ...options,
      },
    }
  );
};

export const parallaxScroll = (element: string | HTMLElement, speed = 1) => {
  return gsap.to(element, {
    y: () => -100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

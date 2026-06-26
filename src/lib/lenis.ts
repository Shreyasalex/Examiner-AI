import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initLenis() {
  if (typeof window === "undefined") return null as unknown as Lenis;

  const lenis = new Lenis({
    duration: 2.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  const globalWindow = window as unknown as { lenis?: Lenis };
  globalWindow.lenis = lenis;

  return lenis;
}

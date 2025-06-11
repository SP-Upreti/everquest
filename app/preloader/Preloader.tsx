import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

type SplitTypeInstance = {
  chars: HTMLElement[];
  revert: () => void;
};

const Preloader = (): JSX.Element | null => {
  const preloaderContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentRoute = usePathname();
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const splitInstance = useRef<SplitTypeInstance | null>(null);

  const cleanupAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
    if (splitInstance.current) {
      splitInstance.current.revert();
      splitInstance.current = null;
    }
  }, []);

  useEffect(() => {
    if (currentRoute !== '/') {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      if (!preloaderContainerRef.current) return;

      // Initialize SplitType only once
      const textElement = preloaderContainerRef.current.querySelector('.text-preloader');
      if (!textElement) return;

      // Clean up previous instance if exists
      if (splitInstance.current) {
        splitInstance.current.revert();
      }

      // Create new split instance
      splitInstance.current = new SplitType(textElement as HTMLElement, {
        types: 'chars',
        tagName: 'span',
      }) as unknown as SplitTypeInstance;

      // Create and play animation
      animationRef.current = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          // Clean up GSAP instance after animation completes
          cleanupAnimation();
        },
      });

      animationRef.current
        .from(splitInstance.current.chars, {
          opacity: 0,
          duration: 0.1,
          stagger: 0.05,
          ease: 'power2.out',
        })
        .to(preloaderContainerRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        }, '>0.1');
    }, 100); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer);
      cleanupAnimation();
    };
  }, [currentRoute, cleanupAnimation]);

  // Don't render anything if not loading
  if (!isLoading) return null;

  return (
    <div
      ref={preloaderContainerRef}
      className="fixed inset-0 w-full h-screen !bg-white text-secondary-500 z-[9999] flex items-center justify-center"
      aria-live="polite"
      aria-busy={isLoading}
    >
      <span 
        className="w-11/12 text-center title uppercase font-extrabold lg:text-6xl md:text-5xl text-4xl"
        aria-label="Loading, please wait"
      >
        EXPLORE, EXPERIENCE, EXPAND.
      </span>
    </div>
  );
};

export default Preloader;

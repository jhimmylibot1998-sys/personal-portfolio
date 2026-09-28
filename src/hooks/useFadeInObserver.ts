import { useRef } from 'react';
import { useInView, Variants } from 'framer-motion';

export interface FadeInObserverOptions {
  once?: boolean;
  margin?: string;
  amount?: 'some' | 'all' | number;
}

export function useFadeInObserver(options: FadeInObserverOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(ref, {
    once: options.once ?? true,
    margin: (options.margin ?? '-40px') as any,
    amount: options.amount ?? 0.15,
  });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return {
    ref,
    isInView,
    variants,
  };
}

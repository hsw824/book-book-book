import { useEffect } from 'react';

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, callback, options]);
};

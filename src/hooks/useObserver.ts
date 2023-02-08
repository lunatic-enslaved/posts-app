import React from "react";

interface ObserverHookProps {
  ref: React.RefObject<Element>;
  isLoading: boolean;
  canLoad: boolean;
  callback: () => void;
}

export const useObserver = ({
  ref,
  isLoading,
  callback,
  canLoad,
}: ObserverHookProps) => {
  const observer = React.useRef<IntersectionObserver>();

  React.useEffect(() => {
    if (isLoading) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      const el = entries[0];
      if (el?.isIntersecting && canLoad) {
        callback();
      }
    });

    if (ref.current) {
      observer.current.observe(ref.current);
    }
  }, [isLoading, ref]);
};

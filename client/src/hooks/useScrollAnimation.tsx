import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Set initial state
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.8s ease-out";

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return ref;
}

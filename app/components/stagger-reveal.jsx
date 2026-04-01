"use client";

import { useEffect, useRef, useState, Children, cloneElement, isValidElement } from "react";

/**
 * Wraps multiple children and staggers their entrance animations
 * when the container scrolls into view.
 */
export default function StaggerReveal({
  children,
  className = "",
  staggerMs = 100,
  threshold = 0.1,
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        return (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerMs}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerMs}ms`,
            }}
          >
            {child}
          </div>
        );
      })}
    </Tag>
  );
}

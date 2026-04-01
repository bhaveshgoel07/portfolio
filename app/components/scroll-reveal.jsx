"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps children in a scroll-triggered reveal animation.
 * Supports fade-up, fade-left, fade-right, and scale-up variants.
 * Uses IntersectionObserver for performance.
 */
export default function ScrollReveal({
  children,
  className = "",
  variant = "fade-up",    // fade-up | fade-left | fade-right | scale-up
  delay = 0,              // ms
  duration = 700,         // ms
  threshold = 0.15,
  once = true,
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
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const baseStyles = {
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, transform",
  };

  const variantMap = {
    "fade-up": {
      hidden: { opacity: 0, transform: "translateY(40px)" },
      visible: { opacity: 1, transform: "translateY(0)" },
    },
    "fade-left": {
      hidden: { opacity: 0, transform: "translateX(40px)" },
      visible: { opacity: 1, transform: "translateX(0)" },
    },
    "fade-right": {
      hidden: { opacity: 0, transform: "translateX(-40px)" },
      visible: { opacity: 1, transform: "translateX(0)" },
    },
    "scale-up": {
      hidden: { opacity: 0, transform: "scale(0.92)" },
      visible: { opacity: 1, transform: "scale(1)" },
    },
  };

  const v = variantMap[variant] || variantMap["fade-up"];
  const stateStyles = visible ? v.visible : v.hidden;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...baseStyles, ...stateStyles }}
    >
      {children}
    </Tag>
  );
}

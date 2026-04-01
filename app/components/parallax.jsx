"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Parallax wrapper – shifts children along Y based on scroll position.
 * `speed` controls intensity: positive = slower than scroll, negative = faster.
 */
export default function Parallax({
  children,
  speed = 0.15,
  className = "",
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowH = window.innerHeight;
        // Only apply parallax when element is near the viewport
        if (rect.bottom > -200 && rect.top < windowH + 200) {
          const center = rect.top + rect.height / 2;
          const delta = center - windowH / 2;
          setOffset(delta * speed);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </Tag>
  );
}

"use client";

import { useEffect, useState } from "react";

/**
 * Orchestrates a staggered entrance animation for the hero section.
 * Children receive CSS custom properties for delay-based animation.
 */
export default function HeroEntrance({ children, className = "" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure the DOM is painted before triggering
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={className}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

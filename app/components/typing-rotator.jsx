"use client";

import { useEffect, useRef, useState } from "react";

export default function TypingRotator({ items = [], typingSpeed = 80, pauseMs = 1200, deleteSpeed = 40 }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | pausing | deleting
  const mounted = useRef(true);

  useEffect(() => {
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (!items.length) return;
    const current = items[index % items.length];

    if (phase === "typing") {
      if (text.length < current.length) {
        const id = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
        return () => clearTimeout(id);
      } else {
        const id = setTimeout(() => setPhase("pausing"), pauseMs);
        return () => clearTimeout(id);
      }
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const id = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
        return () => clearTimeout(id);
      } else {
        setPhase("typing");
        setIndex((i) => (i + 1) % items.length);
      }
    }

    if (phase === "pausing") {
      const id = setTimeout(() => setPhase("deleting"), pauseMs);
      return () => clearTimeout(id);
    }
  }, [items, index, text, phase, typingSpeed, pauseMs, deleteSpeed]);

  return (
    <div className="text-zinc-400 text-xl sm:text-2xl mt-2 h-8 select-none">
      <span className="align-middle">{text}</span>
      <span className="ml-1 inline-block w-2 bg-zinc-300 animate-pulse" style={{ height: '1em' }} />
    </div>
  );
}


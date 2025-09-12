"use client";

import { useEffect, useRef } from "react";
import data from "../../data.json";

export default function VantaBackground() {
  const elRef = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    const w = typeof window !== 'undefined' ? window : undefined;
    if (!elRef.current || !w) return;

    let destroyed = false;

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', () => reject());
          if (existing.readyState === 'complete') resolve();
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load ' + src));
        document.head.appendChild(s);
      });

    (async () => {
      try {
        const effect = (data.background?.vantaEffect || 'dots').toLowerCase();
        const effectName = effect.toUpperCase();

        // load three first, then vanta to avoid race conditions
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js');
        await loadScript(`https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.${effect}.min.js`);

        if (destroyed) return;

        const ctor = w.VANTA?.[effectName];
        if (!ctor) return;

        const opts = { ...(data.background?.vantaOptions || {}) };
        const toNum = (val) => {
          if (typeof val === 'number') return val;
          if (typeof val === 'string') {
            if (val.startsWith('#')) return parseInt(val.slice(1), 16);
            if (val.startsWith('0x')) return parseInt(val.slice(2), 16);
          }
          return val;
        };
        if ('color' in opts) opts.color = toNum(opts.color);
        if ('color2' in opts) opts.color2 = toNum(opts.color2);
        if ('backgroundColor' in opts) opts.backgroundColor = toNum(opts.backgroundColor);

        try {
          vantaRef.current = ctor({
            el: elRef.current,
            THREE: w.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            showLines: false,
            ...opts,
          });
        } catch (e) {
          // initialization failed
          // swallow to avoid crashing the app
          console.error('Vanta init failed', e);
        }
      } catch (e) {
        console.error('Failed to load scripts for Vanta background', e);
      }
    })();

    return () => {
      destroyed = true;
      try { vantaRef.current?.destroy?.(); } catch {}
      vantaRef.current = null;
    };
  }, []);

  return <div ref={elRef} className="fixed inset-0 -z-10" />;
}

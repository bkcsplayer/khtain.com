// components/sections/Loading.tsx — Section 1
// See docs/SECTIONS.md "Section 1 — Loading" and docs/MOTION.md Effect 1
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Loading() {
  // Start hidden to not block SSR / search engines.
  // Only show on first client-side visit (sessionStorage check).
  const [show, setShow] = useState(false);
  const [playing, setPlaying] = useState(false);
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('khtain.seen') === '1') return;
    setShow(true);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing || !scope.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('khtain.seen', '1');
          setShow(false);
        },
      });

      tl.set('[data-loading]', { opacity: 1 });
      tl.fromTo('[data-loading-k]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
      tl.fromTo('[data-loading-tag]', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3');
      tl.fromTo('[data-loading-bar]', { width: 0 }, { width: 60, duration: 0.8, ease: 'expo.out' }, '-=0.4');
      tl.to('[data-loading]', { opacity: 0, duration: 0.6, ease: 'expo.out' }, '+=0.4');
    }, scope);

    return () => ctx.revert();
  }, [playing]);

  if (!show) return null;

  return (
    <div
      ref={scope}
      data-loading
      className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center"
      style={{ opacity: 0 }}
    >
      <span
        data-loading-k
        className="font-display italic text-bone"
        style={{ fontSize: 'var(--text-display-lg)', lineHeight: 1 }}
      >
        K
      </span>
      <p data-loading-tag className="mt-6 font-mono text-slate text-mono-xs uppercase tracking-widest">
        Khtain Block Technology Ltd.
      </p>
      <div data-loading-bar className="mt-4 h-px bg-ember" style={{ width: 0 }} />
    </div>
  );
}

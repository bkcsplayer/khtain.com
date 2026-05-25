// components/sections/Wordmark.tsx — Section 3
// The brand statement as type-as-image.
// See docs/MOTION.md Effects 3 + 4
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useLang } from '@/lib/lang';
import en from '@/messages/en.json';
import zh from '@/messages/zh.json';
import gsap from 'gsap';

const CHARS = ['K', 'H', 'T', 'A', 'I', 'N'];

function getCenter(el: HTMLElement): { x: number; y: number } {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

export function Wordmark() {
  const lang = useLang();
  const t = lang === 'zh' ? zh.wordmark : en.wordmark;
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLElement | null)[]>([]);
  const italicQuickTos = useRef<((v: number) => void)[]>([]);
  const emberLayerRef = useRef<HTMLDivElement>(null);
  const animFrame = useRef<number>(0);
  const touchTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // ============================================================
  // EFFECT 3 — Variable Weight Hover
  // ============================================================
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!animFrame.current) {
      animFrame.current = requestAnimationFrame(() => {
        animFrame.current = 0;
        const cx = e.clientX;
        const cy = e.clientY;

        charRefs.current.forEach((el, i) => {
          if (!el) return;
          const center = getCenter(el);
          const dist = Math.hypot(cx - center.x, cy - center.y);
          let opacity: number;
          if (dist <= 80) {
            opacity = 1;
          } else if (dist >= 200) {
            opacity = 0;
          } else {
            opacity = 1 - (dist - 80) / 120; // linear fade 80→200
          }
          italicQuickTos.current[i]?.(opacity);
        });

        // EFFECT 4 — Xray: position the ember clip-path circle at cursor
        if (emberLayerRef.current && containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const x = cx - containerRect.left;
          const y = cy - containerRect.top;
          emberLayerRef.current.style.clipPath = `circle(120px at ${x}px ${y}px)`;
        }
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animFrame.current) {
      cancelAnimationFrame(animFrame.current);
      animFrame.current = 0;
    }
    // Fade all italic chars back to 0
    italicQuickTos.current.forEach((qt) => qt?.(0));
    // Hide ember layer
    if (emberLayerRef.current) {
      emberLayerRef.current.style.clipPath = 'circle(0px at -999px -999px)';
    }
  }, []);

  // ============================================================
  // TOUCH FALLBACK — cycle through letters left to right
  // ============================================================
  const handleTouchStart = useCallback(() => {
    let i = 0;
    const cycle = () => {
      if (i >= CHARS.length) {
        // Reset all
        italicQuickTos.current.forEach((qt) => qt?.(0));
        return;
      }
      // Fade previous char out
      if (i > 0) italicQuickTos.current[i - 1]?.(0);
      // Fade current char in
      italicQuickTos.current[i]?.(1);
      i++;
      touchTimeout.current = setTimeout(cycle, 500);
    };
    cycle();
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchTimeout.current) clearTimeout(touchTimeout.current);
  }, []);

  // ============================================================
  // INIT — build quickTo targets and check reduced motion
  // ============================================================
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    // Build gsap.quickTo for each italic character
    italicQuickTos.current = CHARS.map((_, i) => {
      const el = document.querySelector(`[data-char-italic="${i}"]`) as HTMLElement;
      if (!el) return () => {};
      return gsap.quickTo(el, 'opacity', { duration: 0.3, ease: 'power2.out' });
    });

    return () => {
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
    };
  }, []);

  return (
    <section
      className="relative py-32 md:py-48 flex flex-col items-center justify-center min-h-[80vh]"
      aria-label="Khtain"
    >
      <div
        ref={containerRef}
        data-wordmark
        className="relative select-none"
        style={{
          fontSize: 'var(--text-display-xl)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          width: '92vw',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* --- Regular layer (always visible, normal style) --- */}
        <div
          data-wordmark-text
          className="font-display text-bone text-center"
          style={{ fontStyle: 'normal' }}
          aria-hidden="true"
        >
          {CHARS.map((char, i) => (
            <span
              key={i}
              ref={(el) => { charRefs.current[i] = el; }}
              data-char={`${i}`}
            >
              {char}
            </span>
          ))}
        </div>

        {/* --- Italic layer (positioned over regular, opacity per char) --- */}
        <div
          className="absolute inset-0 font-display text-center pointer-events-none"
          style={{ fontStyle: 'italic' }}
          aria-hidden="true"
        >
          {CHARS.map((char, i) => (
            <span
              key={i}
              data-char-italic={i}
              className="text-bone"
              style={{ opacity: 0 }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* --- Ember layer (xray effect — revealed by clip-path circle) --- */}
        <div
          ref={emberLayerRef}
          className="absolute inset-0 font-display text-center pointer-events-none"
          style={{
            fontStyle: 'italic',
            color: 'var(--color-ember)',
            clipPath: 'circle(0px at -999px -999px)',
          }}
          aria-hidden="true"
        >
          {CHARS.map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
      </div>

      <span className="sr-only">Khtain</span>

      <p
        className="mt-12 font-mono text-slate text-center max-w-md px-6"
        style={{ fontSize: '13px' }}
      >
        {t.definition}
      </p>
    </section>
  );
}

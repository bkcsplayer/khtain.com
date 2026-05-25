// components/motion/HaloRings.tsx — the brand signature animation
// See docs/MOTION.md Effect 8 for the spec
'use client';

import { useRef } from 'react';
import { useGSAP } from '@/lib/gsap';

interface HaloRingsProps {
  size?: number;          // pixel diameter of the outer ring
  opacity?: number;       // 0-1 base opacity (modulate by section)
  className?: string;
}

export function HaloRings({ size = 480, opacity = 0.25, className = '' }: HaloRingsProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Ring 1 — clockwise, 30s per revolution
        gsap.to('[data-ring="1"]', {
          rotate: 360,
          duration: 30,
          ease: 'none',
          repeat: -1,
          transformOrigin: '50% 50%',
        });
        // Ring 2 — counter-clockwise, 45s per revolution
        gsap.to('[data-ring="2"]', {
          rotate: -360,
          duration: 45,
          ease: 'none',
          repeat: -1,
          transformOrigin: '50% 50%',
        });
      });
    }, scope);

    return () => ctx.revert();
  });

  // Inner ring is 70% of outer
  const inner = Math.round(size * 0.7);

  return (
    <div
      ref={scope}
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size, opacity }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Ring 1 — flat (in plane) */}
        <circle
          data-ring="1"
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 1}
          stroke="var(--color-ember)"
          strokeWidth="1"
          strokeDasharray={`${(2 * Math.PI * (size / 2 - 1)) * 0.75} ${(2 * Math.PI * (size / 2 - 1)) * 0.25}`}
        />
      </svg>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'rotateX(70deg)', // tilt for orbital feel
        }}
      >
        {/* Ring 2 — tilted, looks like orbit */}
        <circle
          data-ring="2"
          cx={size / 2}
          cy={size / 2}
          r={inner / 2}
          stroke="var(--color-ember)"
          strokeWidth="1"
          strokeDasharray={`${(2 * Math.PI * (inner / 2)) * 0.6} ${(2 * Math.PI * (inner / 2)) * 0.4}`}
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

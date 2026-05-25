// components/layout/GrainOverlay.tsx — site-wide film grain
'use client';

/**
 * A static SVG noise overlay on top of everything.
 * Very subtle — opacity 0.04, overlay blend mode.
 * Performance: SVG is rendered once and reused; far cheaper than a PNG noise tile.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay"
      style={{ opacity: 0.04 }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
      >
        <filter id="khtain-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0.5 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#khtain-grain)" />
      </svg>
    </div>
  );
}

// components/ui/SectionDivider.tsx — full-bleed parallax image divider
// See docs/MOTION.md Effect 9
'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@/lib/gsap';

interface SectionDividerProps {
  image: string;
  alt: string;
  /** Total height in vh. The internal image extends beyond for parallax. Default 80. */
  heightVh?: number;
}

export function SectionDivider({ image, alt, heightVh = 80 }: SectionDividerProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('[data-anim="parallax"]', {
          yPercent: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, scope);
    return () => ctx.revert();
  });

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      style={{ height: `${heightVh}vh` }}
      aria-hidden={alt === '' ? 'true' : undefined}
    >
      <div
        data-anim="parallax"
        className="absolute inset-0"
        style={{ height: '130%', top: '-15%' }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          quality={88}
          className="object-cover"
        />
      </div>
    </div>
  );
}

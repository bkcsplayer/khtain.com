// components/sections/Philosophy.tsx — Section 7
// Full-bleed image with philosophical statement
// See docs/SECTIONS.md Section 7
'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useLang } from '@/lib/lang';
import en from '@/messages/en.json';
import zh from '@/messages/zh.json';
import { useGSAP } from '@/lib/gsap';
import { HaloRings } from '@/components/motion/HaloRings';

export function Philosophy() {
  const lang = useLang();
  const t = lang === 'zh' ? zh.philosophy : en.philosophy;
  const scope = useRef<HTMLElement>(null);

  useGSAP((gsap, ScrollTrigger, SplitText) => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = new SplitText('[data-philosophy-body]', { type: 'lines,words' });
        gsap.set(split.words, { y: 30, opacity: 0 });
        gsap.to(split.words, {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 1.0,
          ease: 'expo.out',
          scrollTrigger: { trigger: scope.current, start: 'top 70%', once: true },
        });

        // Parallax the background image slightly
        gsap.to('[data-philosophy-bg]', {
          yPercent: -10,
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
    <section
      ref={scope}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: '100vh' }}
      lang={lang}
    >
      {/* Background image */}
      <div data-philosophy-bg className="absolute inset-0" style={{ height: '120%', top: '-10%' }}>
        <Image
          src="/images/08-philosophy.png"
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
      </div>
      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(11,11,16,0.5)' }}
      />

      {/* Decorative halo */}
      <div className="absolute right-[10%] top-[20%] opacity-25 hidden md:block">
        <HaloRings size={420} opacity={0.4} />
      </div>

      {/* Content */}
      <div className="relative z-10 container-x">
        <div className="max-w-[720px] mx-auto text-center">
          <p className="eyebrow mb-8">{t.eyebrow}</p>
          <p
            data-philosophy-body
            className={`font-display italic text-bone ${
              lang === 'zh' ? 'font-display-cjk' : ''
            }`}
            style={{
              fontSize: 'var(--text-display-md)',
              lineHeight: lang === 'zh' ? 1.55 : 1.25,
            }}
            dangerouslySetInnerHTML={{ __html: t.body }}
          />
        </div>
      </div>
    </section>
  );
}

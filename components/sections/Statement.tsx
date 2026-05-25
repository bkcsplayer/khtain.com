// components/sections/Statement.tsx — Section 4
// Three-paragraph brand manifesto. See docs/SECTIONS.md Section 4 and docs/MOTION.md Effect 5
'use client';

import { useRef } from 'react';
import { useLang } from '@/lib/lang';
import en from '@/messages/en.json';
import zh from '@/messages/zh.json';
import { useGSAP } from '@/lib/gsap';

export function Statement() {
  const lang = useLang();
  const t = lang === 'zh' ? zh.statement : en.statement;
  const scope = useRef<HTMLElement>(null);

  useGSAP((gsap, ScrollTrigger, SplitText) => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const paragraphs = gsap.utils.toArray<HTMLElement>('[data-statement-p]');
        paragraphs.forEach((p, idx) => {
          const split = new SplitText(p, { type: 'lines' });
          gsap.set(split.lines, { y: 30, opacity: 0 });
          gsap.to(split.lines, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 75%',
              once: true,
            },
          });
        });
      });
    }, scope);
    return () => ctx.revert();
  });

  return (
    <section
      ref={scope}
      className="container-x py-32 md:py-48"
      lang={lang}
    >
      <div className="max-w-[880px] mx-auto flex flex-col gap-12 md:gap-16">
        {t.paragraphs.map((p: string, i: number) => (
          <p
            key={i}
            data-statement-p
            className={`font-display italic text-bone ${
              lang === 'zh' ? 'font-display-cjk' : ''
            }`}
            style={{
              fontSize: 'var(--text-display-md)',
              lineHeight: lang === 'zh' ? '1.45' : '1.25',
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

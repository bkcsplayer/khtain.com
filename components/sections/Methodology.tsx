// components/sections/Methodology.tsx — Section 6
// 5 steps stacked vertically. See docs/SECTIONS.md Section 6 and docs/MOTION.md Effect 7
'use client';

import { useRef } from 'react';
import { useLang } from '@/lib/lang';
import en from '@/messages/en.json';
import zh from '@/messages/zh.json';
import { useGSAP } from '@/lib/gsap';

export function Methodology() {
  const lang = useLang();
  const t = lang === 'zh' ? zh.methodology : en.methodology;
  const scope = useRef<HTMLElement>(null);

  useGSAP((gsap, ScrollTrigger) => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('[data-method-row]');
        rows.forEach((row) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: 'top 80%', once: true },
          });
          tl.from(row.querySelector('[data-method-num]'),   { y: 20, opacity: 0, duration: 0.6, ease: 'expo.out' }, 0);
          tl.from(row.querySelector('[data-method-title]'), { y: 14, opacity: 0, duration: 0.7, ease: 'expo.out' }, 0.05);
          tl.from(row.querySelector('[data-method-desc]'),  { opacity: 0, duration: 0.6, ease: 'expo.out' }, 0.3);
          tl.from(row.querySelector('[data-method-line]'),  { scaleX: 0, duration: 0.8, ease: 'expo.out', transformOrigin: 'left' }, 0.2);
        });
      });
    }, scope);
    return () => ctx.revert();
  });

  return (
    <section ref={scope} className="container-x py-32 md:py-48" lang={lang}>
      <div className="max-w-[1100px] mx-auto">
        <p className="eyebrow mb-12">{t.eyebrow}</p>

        {t.steps.map((step: { num: string; title: string; desc: string }, idx: number) => (
          <div
            key={step.num}
            data-method-row
            className="relative grid grid-cols-12 gap-6 py-8 md:py-10"
          >
            <span
              data-method-num
              className="col-span-2 md:col-span-1 font-mono text-bone/30"
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 1, letterSpacing: '-0.02em' }}
            >
              {step.num}
            </span>
            <h3
              data-method-title
              className={`col-span-10 md:col-span-5 font-display italic text-bone ${
                lang === 'zh' ? 'font-display-cjk' : ''
              }`}
              style={{ fontSize: 'var(--text-display-md)', lineHeight: 1.1 }}
            >
              {step.title}
            </h3>
            <p
              data-method-desc
              className="col-span-12 md:col-span-6 text-slate"
              style={{ fontSize: '16px', lineHeight: lang === 'zh' ? 1.7 : 1.55 }}
            >
              {step.desc}
            </p>
            <div
              data-method-line
              className="col-span-12 h-px bg-ash mt-6"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

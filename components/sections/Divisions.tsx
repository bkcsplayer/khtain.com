// components/sections/Divisions.tsx — Section 5
// Two cards leading to ai.khtain.com and labs.khtain.com
// See docs/SECTIONS.md Section 5 and docs/MOTION.md Effect 6
'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useLang } from '@/lib/lang';
import en from '@/messages/en.json';
import zh from '@/messages/zh.json';
import { useGSAP } from '@/lib/gsap';

export function Divisions() {
  const lang = useLang();
  const t = lang === 'zh' ? zh.divisions : en.divisions;
  const scope = useRef<HTMLElement>(null);

  useGSAP((gsap) => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Card hover behaviors are CSS-driven for performance.
        // Here we only do the entrance reveal.
        gsap.from('[data-division-card]', {
          y: 60,
          opacity: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 70%',
            once: true,
          },
        });
      });
    }, scope);
    return () => ctx.revert();
  });

  const cards = [
    {
      key: 'ai',
      href: 'https://ai.khtain.com',
      image: '/images/03-ai-card.png',
      eyebrow: t.cards.ai.eyebrow,
      title: t.cards.ai.title,
      caption: t.cards.ai.caption,
      status: t.cards.ai.status,
      statusType: 'live' as const,
    },
    {
      key: 'labs',
      href: 'mailto:hello@khtain.com?subject=Labs%20interest',
      image: '/images/04-labs-card.png',
      eyebrow: t.cards.labs.eyebrow,
      title: t.cards.labs.title,
      caption: t.cards.labs.caption,
      status: t.cards.labs.status,
      statusType: 'soon' as const,
    },
  ];

  return (
    <section ref={scope} className="container-x py-32 md:py-48" lang={lang}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16">
        {cards.map((card, idx) => (
          <a
            key={card.key}
            href={card.href}
            target={card.key === 'ai' ? '_blank' : undefined}
            rel={card.key === 'ai' ? 'noopener' : undefined}
            data-division-card
            className={`group relative overflow-hidden aspect-[3/4] surface-carbon ${
              idx === 0 ? 'md:col-span-6' : 'md:col-span-6 md:translate-y-12'
            }`}
          >
            {/* Background image */}
            <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover"
              />
            </div>
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(11,11,16,0.92) 0%, rgba(11,11,16,0.4) 40%, transparent 60%)',
              }}
            />
            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 z-10">
              <p className="eyebrow">{card.eyebrow}</p>
              <h3
                className={`mt-3 font-display italic text-bone ${
                  lang === 'zh' ? 'font-display-cjk' : ''
                }`}
                style={{
                  fontSize: 'var(--text-display-md)',
                  lineHeight: 1.15,
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                {card.title}
              </h3>
              <p
                className="mt-4 text-slate max-w-md"
                style={{ fontSize: '16px', lineHeight: lang === 'zh' ? 1.7 : 1.55 }}
              >
                {card.caption}
              </p>
              <p
                className={`mt-6 font-mono uppercase tracking-widest text-mono-xs ${
                  card.statusType === 'live' ? 'text-ember' : 'text-slate'
                }`}
                style={{ fontSize: '11px' }}
              >
                {card.status}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

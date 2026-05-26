// components/sections/Hero.tsx — Section 2 (Hero)
'use client';

import Image from 'next/image';
import { useRef, useLayoutEffect } from 'react';
import { useLang } from '@/lib/lang';
import en from '@/messages/en.json';
import zh from '@/messages/zh.json';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';
import { HaloRings } from '@/components/motion/HaloRings';

export function Hero() {
  const lang = useLang();
  const t = lang === 'zh' ? zh.hero : en.hero;
  const scope = useRef<HTMLElement>(null);

  // useLayoutEffect — fires synchronously after hydration, before paint.
  // This prevents FOUC: SSR renders the image visible, gsap.set hides it
  // before browser paints, then the timeline animates it in.
  useLayoutEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Set initial states (before paint, so no flash)
        gsap.set('[data-anim="eyebrow"]', { y: 12, opacity: 0 });
        gsap.set('[data-anim="subhead"]', { y: 12, opacity: 0 });
        gsap.set('[data-anim="image"]', { scale: 1.08, opacity: 0 });
        gsap.set('[data-anim="links"] > *', { opacity: 0, y: 8 });

        // Headline word stagger
        const split = new SplitText('[data-anim="headline"]', { type: 'words' });
        gsap.set(split.words, { y: 24, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 80%',
            once: true,
          },
        });

        tl.to('[data-anim="eyebrow"]', { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, 0);
        tl.to(split.words,             { y: 0, opacity: 1, duration: 0.9, stagger: 0.04, ease: 'expo.out' }, 0.1);
        tl.to('[data-anim="subhead"]', { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, 0.4);
        tl.to('[data-anim="image"]',   { scale: 1.0, opacity: 1, duration: 1.0, ease: 'expo.out' }, 0.5);
        tl.to('[data-anim="links"] > *',{ opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'expo.out' }, 0.6);

        // Parallax on the hero image
        gsap.to('[data-anim="image"]', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-anim]', { opacity: 1, y: 0, scale: 1 });
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="relative min-h-[100vh] md:min-h-[100svh] flex items-center"
      lang={lang}
    >
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-24 md:py-0">
        {/* LEFT COLUMN — 60% */}
        <div className="md:col-span-7 flex flex-col justify-center relative">
          {/* Decorative halo behind the K letter */}
          <div className="absolute -top-12 -left-20 -z-10 opacity-15 hidden md:block">
            <HaloRings size={240} />
          </div>

          <p
            data-anim="eyebrow"
            className="eyebrow"
          >
            {t.eyebrow}
          </p>

          <h1
            data-anim="headline"
            className={`font-display italic text-bone mt-6 ${
              lang === 'zh' ? 'font-display-cjk' : ''
            }`}
            style={{
              fontSize: 'var(--text-display-lg)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
            }}
          >
            {t.headline}
          </h1>

          <p
            data-anim="subhead"
            className="mt-8 max-w-[480px] text-slate"
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: lang === 'zh' ? 'var(--leading-cjk)' : 'var(--leading-relaxed)',
            }}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: t.subhead }}
          />

          <div data-anim="links" className="mt-12 flex flex-col gap-3">
            <a
              href="https://ai.khtain.com"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-bone hover:text-ember transition-colors group"
              style={{ fontSize: '15px' }}
            >
              <span className="font-mono text-mono-xs eyebrow !text-slate group-hover:!text-ember transition-colors">
                Division 01
              </span>
              <span>ai.khtain.com</span>
              <span className="font-mono">→</span>
            </a>
            <a
              href="mailto:cool@khtain.com?subject=Labs"
              className="inline-flex items-center gap-2 text-slate hover:text-bone transition-colors group"
              style={{ fontSize: '15px' }}
            >
              <span className="font-mono text-mono-xs eyebrow">Division 02</span>
              <span>labs.khtain.com</span>
              <span className="font-mono">— soon</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN — 40%, hero image */}
        <div className="md:col-span-5 relative h-[60vh] md:h-[80vh] md:self-center">
          <div
            data-anim="image"
            className="relative w-full h-full"
          >
            <Image
              src="/images/01-hero.png"
              alt="A black obsidian monolith with a single ember-colored ring at its base, set in deep void — the visual mark of Khtain."
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              quality={92}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

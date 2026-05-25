// components/sections/SiteFooter.tsx — Section 8
// Animated footer with 4-frame background loop
// See docs/SECTIONS.md Section 8 and docs/MOTION.md Effect 10
'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useLang } from '@/lib/lang';
import en from '@/messages/en.json';
import zh from '@/messages/zh.json';
import { useGSAP } from '@/lib/gsap';
import { HaloRings } from '@/components/motion/HaloRings';

const FRAMES = ['/images/05a-footer.png', '/images/05b-footer.png', '/images/05c-footer.png', '/images/05d-footer.png'];

export function SiteFooter() {
  const lang = useLang();
  const t = lang === 'zh' ? zh.footer : en.footer;
  const scope = useRef<HTMLElement>(null);

  useGSAP((gsap) => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const frames = gsap.utils.toArray<HTMLElement>('[data-footer-frame]');
        if (frames.length < 2) return;

        gsap.set(frames, { opacity: 0 });
        gsap.set(frames[0], { opacity: 1 });

        const tl = gsap.timeline({ repeat: -1 });
        frames.forEach((_, i) => {
          const next = (i + 1) % frames.length;
          tl.to(frames[next], { opacity: 1, duration: 2, ease: 'sine.inOut' }, `+=6`);
          tl.to(frames[i], { opacity: 0, duration: 2, ease: 'sine.inOut' }, '<');
        });
      });
    }, scope);
    return () => ctx.revert();
  });

  return (
    <footer
      ref={scope}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh' }}
      lang={lang}
    >
      {/* 4-frame background loop */}
      {FRAMES.map((src, i) => (
        <div key={src} data-footer-frame className="absolute inset-0">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            quality={88}
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* Top gradient (fade from page above) */}
      <div
        className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, var(--color-obsidian), transparent)',
        }}
      />

      {/* Bottom gradient (for content legibility) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 30%, rgba(11,11,16,0.6) 70%, rgba(11,11,16,0.95) 100%)',
        }}
      />

      {/* Decorative halo */}
      <div className="absolute right-[5%] top-[15%] z-10 opacity-40 hidden md:block">
        <HaloRings size={520} opacity={0.5} />
      </div>

      {/* Content lives in the lower half */}
      <div className="relative z-20 h-full flex flex-col justify-end">
        <div className="container-x pb-12 md:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Huge wordmark watermark */}
            <div className="md:col-span-6">
              <h2
                className="font-display italic text-bone leading-none"
                style={{
                  fontSize: 'clamp(96px, 18vw, 280px)',
                  opacity: 0.12,
                  letterSpacing: '-0.03em',
                }}
              >
                KHTAIN
              </h2>
            </div>

            {/* Address */}
            <div className="md:col-span-3">
              <p className="eyebrow mb-3">{t.location.label}</p>
              <p className="text-bone text-body-lg">{t.location.line1}</p>
              <p className="text-bone text-body-lg">{t.location.line2}</p>
              <p className="text-slate text-body-sm mt-1">{t.location.line3}</p>
            </div>

            {/* Contact */}
            <div className="md:col-span-3">
              <p className="eyebrow mb-3">{t.contact.label}</p>
              <a
                href="mailto:hello@khtain.com"
                className="block text-bone hover:text-ember transition-colors text-body-lg"
              >
                hello@khtain.com
              </a>
              <a
                href="https://ai.khtain.com"
                target="_blank"
                rel="noopener"
                className="block mt-2 text-bone hover:text-ember transition-colors text-body-lg"
              >
                ai.khtain.com →
              </a>
              <p className="block mt-2 text-slate text-body-lg">
                labs.khtain.com <span className="font-mono text-mono-xs">— soon</span>
              </p>
            </div>
          </div>
        </div>

        {/* Legal strip */}
        <div className="relative z-20 border-t border-ash">
          <div className="container-x py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="font-mono text-slate uppercase tracking-widest" style={{ fontSize: '11px' }}>
              © 2026 Khtain Block Technology Ltd.
            </p>
            <p className="font-mono text-slate uppercase tracking-widest" style={{ fontSize: '11px' }}>
              v0.1
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

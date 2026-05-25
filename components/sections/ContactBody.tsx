// components/sections/ContactBody.tsx — 4 "doors" contact cards
'use client';

import { useRef } from 'react';
import { useLang } from '@/lib/lang';
import en from '@/messages/en.json';
import zh from '@/messages/zh.json';
import { useGSAP } from '@/lib/gsap';

interface Door {
  num: string;
  title: string;
  desc: string;
  href: string;
  linkLabel: string;
}

export function ContactBody() {
  const lang = useLang();
  const t = lang === 'zh' ? zh.contact : en.contact;
  const scope = useRef<HTMLElement>(null);

  useGSAP((g, st) => {
    if (!scope.current) return;
    const ctx = g.context(() => {
      const mm = g.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        st.batch('[data-door]', {
          onEnter: (batch) => {
            g.fromTo(
              batch,
              { y: 48, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'expo.out' },
            );
          },
          start: 'top 85%',
        });
      });
    }, scope);
    return () => ctx.revert();
  });

  return (
    <section ref={scope} className="container-x pt-40 pb-32 md:pt-48 md:pb-48" lang={lang}>
      <div className="max-w-[880px] mx-auto">
        <p className="eyebrow mb-8">{t.eyebrow}</p>
        <h1
          className={`font-display italic text-bone ${
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

        <div className="mt-16 md:mt-24 flex flex-col gap-6">
          {(t.doors as Door[]).map((door) => {
            const isExternal = door.href.startsWith('http');
            return (
              <a
                key={door.num}
                data-door
                href={door.href}
                {...(isExternal ? { target: '_blank', rel: 'noopener' } : {})}
                className="surface-carbon group block border border-ash hover:border-ember transition-colors px-8 py-6 md:px-10 md:py-8"
                style={{
                  transform: 'translateX(0)',
                  transition: 'transform 0.3s var(--ease-out-expo), border-color 0.3s var(--ease-out-expo)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-6">
                    <span
                      className="font-mono text-bone/30 group-hover:text-bone transition-all duration-300"
                      style={{
                        fontSize: 'var(--text-display-md)',
                        lineHeight: 1,
                        fontFeatureSettings: '"ss01"',
                      }}
                    >
                      {door.num}
                    </span>
                    <div>
                      <h3
                        className={`text-bone ${
                          lang === 'zh' ? 'font-display-cjk' : 'font-display'
                        }`}
                        style={{
                          fontSize: 'var(--text-body-xl)',
                          lineHeight: 'var(--leading-body)',
                        }}
                      >
                        {door.title}
                      </h3>
                      <p
                        className="mt-2 text-slate max-w-[520px]"
                        style={{ fontSize: 'var(--text-body-md)', lineHeight: lang === 'zh' ? 1.7 : 1.5 }}
                      >
                        {door.desc}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-ember text-nowrap shrink-0" style={{ fontSize: '13px', letterSpacing: '0.06em' }}>
                    {door.linkLabel}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

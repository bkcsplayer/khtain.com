// components/sections/AboutBody.tsx — About page intro + origin
'use client';

import { useLang } from '@/lib/lang';
import en from '@/messages/en.json';
import zh from '@/messages/zh.json';

export function AboutBody() {
  const lang = useLang();
  const t = lang === 'zh' ? zh.about : en.about;

  return (
    <section className="container-x pt-40 pb-32 md:pt-48 md:pb-48" lang={lang}>
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
        <p
          className="mt-12 text-bone"
          style={{
            fontSize: 'var(--text-body-lg)',
            lineHeight: lang === 'zh' ? 1.85 : 1.6,
            maxWidth: '720px',
          }}
        >
          {t.intro}
        </p>

        <div className="mt-32 md:mt-40">
          <p className="eyebrow mb-8">{t.origin.eyebrow}</p>
          <p
            className="text-bone"
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: lang === 'zh' ? 1.85 : 1.6,
              maxWidth: '720px',
            }}
          >
            {t.origin.body}
          </p>
        </div>
      </div>
    </section>
  );
}

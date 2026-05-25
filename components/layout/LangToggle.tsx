// components/layout/LangToggle.tsx — EN/中文 toggle
'use client';

import { useLang, setLang } from '@/lib/lang';

export function LangToggle() {
  const lang = useLang();

  return (
    <div
      className="flex items-center gap-1 font-mono"
      style={{ fontSize: '13px', letterSpacing: '0.08em' }}
      role="group"
      aria-label="Language"
    >
      <button
        onClick={() => setLang('en')}
        className={
          lang === 'en' ? 'text-bone' : 'text-slate hover:text-bone transition-colors'
        }
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <span className="text-ash">/</span>
      <button
        onClick={() => setLang('zh')}
        className={
          lang === 'zh' ? 'text-bone' : 'text-slate hover:text-bone transition-colors'
        }
        aria-pressed={lang === 'zh'}
      >
        中文
      </button>
    </div>
  );
}

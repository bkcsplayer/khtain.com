// lib/lang.ts — minimal language helper (Phase 1: cookie-based, no i18n routing)
'use client';

import { useEffect, useState } from 'react';

export type Lang = 'en' | 'zh';

const COOKIE = 'khtain.lang';
const DEFAULT: Lang = 'en';

function readCookie(): Lang {
  if (typeof document === 'undefined') return DEFAULT;
  const match = document.cookie.match(new RegExp(`${COOKIE}=(en|zh)`));
  return (match?.[1] as Lang) || DEFAULT;
}

function writeCookie(lang: Lang) {
  document.cookie = `${COOKIE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
}

/**
 * useLang — returns current language and a setter.
 * Switching triggers a soft re-render of all consumers.
 */
export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>(DEFAULT);

  useEffect(() => {
    setLang(readCookie());
    const handler = () => setLang(readCookie());
    window.addEventListener('khtain:lang', handler);
    return () => window.removeEventListener('khtain:lang', handler);
  }, []);

  return lang;
}

/**
 * setLang — switches language and notifies all listeners.
 * Use this from the LangToggle component.
 */
export function setLang(lang: Lang) {
  writeCookie(lang);
  window.dispatchEvent(new Event('khtain:lang'));
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en-CA';
}

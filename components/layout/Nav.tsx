// components/layout/Nav.tsx — minimal top navigation
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LangToggle } from './LangToggle';
import { useLang } from '@/lib/lang';
import en from '@/messages/en.json';
import zh from '@/messages/zh.json';

export function Nav() {
  const lang = useLang();
  const t = lang === 'zh' ? zh.nav : en.nav;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // check initial position
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-obsidian/70 backdrop-blur-md border-b border-ash/50'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container-x py-5 md:py-6 flex items-center justify-between">
        {/* Wordmark — small italic K + KHTAIN in caps mono */}
        <Link
          href="/"
          aria-label="Khtain home"
          className="flex items-baseline gap-2 group"
        >
          <span
            className="font-display italic text-bone"
            style={{ fontSize: '24px', lineHeight: 1 }}
          >
            K
          </span>
          <span
            className="font-mono text-bone"
            style={{
              fontSize: '11px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
            }}
          >
            KHTAIN
          </span>
        </Link>

        {/* Right nav cluster */}
        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className="font-mono text-bone hover:text-ember transition-colors"
            style={{ fontSize: '13px', letterSpacing: '0.08em' }}
          >
            {t.about}
          </Link>
          <Link
            href="/contact"
            className="font-mono text-bone hover:text-ember transition-colors"
            style={{ fontSize: '13px', letterSpacing: '0.08em' }}
          >
            {t.contact}
          </Link>
          <a
            href="https://ai.khtain.com"
            target="_blank"
            rel="noopener"
            className="hidden md:inline-flex font-mono text-slate hover:text-bone transition-colors"
            style={{ fontSize: '13px', letterSpacing: '0.08em' }}
          >
            ai.khtain ↗
          </a>
          <LangToggle />
        </div>
      </div>
    </nav>
  );
}

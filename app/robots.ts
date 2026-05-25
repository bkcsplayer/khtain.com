// app/robots.ts — explicitly allow AI crawlers
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Khtain's first product is AI Search Visibility.
      // We MUST be open to AI crawlers on our own site.
      { userAgent: 'GPTBot',          allow: '/' },
      { userAgent: 'OAI-SearchBot',   allow: '/' },
      { userAgent: 'ChatGPT-User',    allow: '/' },
      { userAgent: 'PerplexityBot',   allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'ClaudeBot',       allow: '/' },
      { userAgent: 'Claude-Web',      allow: '/' },
      { userAgent: 'CCBot',           allow: '/' },
      { userAgent: 'cohere-ai',       allow: '/' },
      { userAgent: 'Bytespider',      allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
    ],
    sitemap: 'https://khtain.com/sitemap.xml',
    host: 'https://khtain.com',
  };
}

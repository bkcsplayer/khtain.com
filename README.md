# Khtain Web

**Corporate website for Khtain Block Technology Ltd. — Calgary, Alberta.**

Khtain is the parent company behind two operating directions:

- **AI Search Visibility** — helping businesses become discoverable, citable, and recommended by AI systems such as ChatGPT, Google AI Overviews, Gemini, and Perplexity.
- **Khtain Labs** — long-term AI + blockchain research and product experimentation.

The website is designed as a premium brand entry point for the Khtain ecosystem, with bilingual content, cinematic motion, and a minimal editorial visual language.

---

## Live Structure

| Section | Purpose |
| --- | --- |
| Hero | Introduces Khtain as the foundation behind future-facing divisions |
| Wordmark | Defines the Khtain brand concept |
| Statement | Explains the shift from search engines to AI-mediated discovery |
| Divisions | Presents AI Search Visibility and Khtain Labs |
| Methodology | Shows the AI visibility workflow: discover, measure, diagnose, optimize, monitor |
| Philosophy | Communicates the brand thesis around language, structure, and trust |
| Contact / About | Routes clients, partners, media, and careers to the right contact path |

---

## Tech Stack

- **Framework:** Next.js 16
- **UI:** React 19, TypeScript
- **Styling:** Tailwind CSS 4, custom design tokens
- **Motion:** GSAP, ScrollTrigger, SplitText, Lenis
- **Icons:** Lucide React
- **Language:** English / Simplified Chinese content files

---

## Core Features

- Premium single-page corporate landing experience
- Bilingual EN / ZH content architecture
- GSAP-powered scroll and reveal animations
- Reduced-motion fallback support
- Responsive layout for desktop and mobile
- Division routing to `ai.khtain.com` and future `labs.khtain.com`
- Contact routing for clients, partnerships, press, and careers

---

## Project Structure

```text
khtain.com/
├── app/                    # Next.js app router pages
├── components/
│   ├── sections/           # Hero, Statement, Divisions, Methodology, etc.
│   ├── motion/             # Animation helpers and visual effects
│   └── ui/                 # Shared interface components
├── lib/                    # Language and GSAP setup
├── messages/               # English and Chinese copy
├── public/                 # Brand images and static assets
├── package.json
└── README.md
```

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local site:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

Run linting:

```bash
npm run lint
```

---

## Content Editing

Main website copy lives in:

```text
messages/en.json
messages/zh.json
```

Homepage sections are composed in:

```text
app/page.tsx
components/sections/
```

---

## Brand Positioning

Khtain's core thesis:

> Search is becoming conversation. Conversation is becoming inference. The basis under it all is still language, structure, and trust.

The site presents Khtain as the foundation layer beneath AI visibility, business discovery, and future AI + blockchain product work.

---

## Status

Active internal company website.

Maintained by **Cool Bao** for **Khtain Block Technology Ltd.**

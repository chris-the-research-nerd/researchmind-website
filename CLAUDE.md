@AGENTS.md

# ResearchMind Website

## Overview
Marketing website for ResearchMind, a boutique research and analytics consultancy.
Live at: https://www.researchmindconsulting.com
Repo: https://github.com/chris-the-research-nerd/researchmind-website

## Tech Stack
- Next.js 16 with App Router, static export
- TypeScript, Tailwind CSS v4 (CSS-based config via `@theme inline` in globals.css, NOT tailwind.config.ts)
- Deployed via GitHub Pages with GitHub Actions
- Fonts: Fraunces (headings) + Inter (body) via next/font/google

## Site Structure
- `/` - Homepage (Hero, WhatWeDo, Services, WhyResearchMind, RecentEngagements, FinalCTA)
- `/services` - Services detail page
- `/team` - Team bios (Tanaz, Chris, Agnes)
- `/contact` - Contact form (Formspree, needs form ID configured)

## Key Architecture
- All homepage copy lives in `src/content/home.ts` (content/presentation separation)
- Components in `src/components/` organized by `home/`, `layout/`, `ui/`
- Design tokens defined as CSS custom properties in `src/app/globals.css`
- Client components: Header, FadeIn, ContactForm, LogoCarousel

## Brand & Design Preferences
- Clean, premium, understated. High-contrast black on white.
- Accent color: Crimson (#B33A3A) used on key words in headings
- No em dashes anywhere in copy. Use periods, commas, semicolons, or restructure.
- Service titles use `titleBefore/titleAccent/titleAfter` pattern for crimson highlights
- Cards have subtle shadow, rounded corners, icon + title on same line
- Logo carousel scrolls horizontally with infinite CSS animation

## Team
- Tanaz Molapour, Ph.D. - Founder & CEO | Principal Researcher
- Chris Berger, Ph.D. - Co-Founder | Principal Researcher
- Agnes Tongur, M.S. - Principal Researcher

## Contact
- Email: info@researchmindconsulting.com
- LinkedIn: https://www.linkedin.com/company/research-mind-consulting/

## Pending Copy Updates — Service Card Descriptions (Draft)
Reframe service cards as first-person client questions (approved direction, needs final sign-off):
- **Qualitative Research**: "I need to understand why our customers are making the choices they're making. What are they actually thinking?"
- **Quantitative Research**: "I need real data to back up our decisions. Not hunches, not anecdotes. Numbers I can trust."
- **Advanced Analytics**: "We have all this data, but I'm not sure what it's actually telling us. What are we missing?"
- **Market & Brand Strategy**: "I need to figure out where we fit in the market and how to stand out. What should our next move be?"
- **AI Workflow Enablement**: "I keep hearing about AI, but I want to know what it can actually do for our team. Where do we start?"

## Development
- `npm run dev` to run locally
- Push to `main` triggers GitHub Actions build and deploy to GitHub Pages
- DNS managed via Squarespace (domain registrar), MX records for Google Workspace email

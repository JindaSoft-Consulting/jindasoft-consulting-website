# JindaSoft Website Implementation Plan

**Document status:** Draft — partially confirmed, awaiting full approval before implementation begins

**Prepared:** 24 August 2026

**Based on:** JindaSoft Website Design Brief (14 August 2026)

---

## Table of Contents

<details>

   <summary>Contents</summary>

1. [1. Executive Summary](#1-executive-summary)
1. [2. Business & Brand Context](#2-business--brand-context)
1. [3. Target Audience](#3-target-audience)
   1. [Primary](#primary)
   1. [Secondary](#secondary)
   1. [Primary interaction context](#primary-interaction-context)
1. [4. Goals and Non-Goals](#4-goals-and-non-goals)
   1. [4.1 Primary goals](#41-primary-goals)
   1. [4.2 Secondary goals](#42-secondary-goals)
   1. [4.3 Non-goals for first release](#43-non-goals-for-first-release)
1. [5. Brand & Visual Direction](#5-brand--visual-direction)
   1. [5.1 Existing assets](#51-existing-assets)
   1. [5.2 Colour system](#52-colour-system)
   1. [5.3 Typography](#53-typography)
   1. [5.4 Design character](#54-design-character)
   1. [5.5 Imagery](#55-imagery)
1. [6. Information Architecture](#6-information-architecture)
   1. [6.1 Site structure](#61-site-structure)
   1. [6.2 Primary navigation](#62-primary-navigation)
   1. [6.3 Homepage section order](#63-homepage-section-order)
1. [7. Content & Messaging](#7-content--messaging)
   1. [7.1 Hero headline direction](#71-hero-headline-direction)
   1. [7.2 Calls to action](#72-calls-to-action)
   1. [7.3 Services content](#73-services-content)
   1. [7.4 Content rules](#74-content-rules)
   1. [7.5 Selected work — Online Sneaker Shop](#75-selected-work--online-sneaker-shop)
      1. [Labelling and attribution requirements](#labelling-and-attribution-requirements)
      1. [Live link](#live-link)
1. [8. UX & Conversion Strategy](#8-ux--conversion-strategy)
1. [9. Technical Architecture](#9-technical-architecture)
   1. [9.1 Technology choices](#91-technology-choices)
   1. [9.2 File organisation](#92-file-organisation)
   1. [9.3 CSS architecture](#93-css-architecture)
   1. [9.4 JavaScript](#94-javascript)
   1. [9.5 Assumptions — status](#95-assumptions--status)
1. [10. SEO, Accessibility & Performance](#10-seo-accessibility--performance)
   1. [10.1 SEO](#101-seo)
   1. [10.2 Accessibility](#102-accessibility)
   1. [10.3 Performance](#103-performance)
1. [11. Proposed Changes](#11-proposed-changes)
   1. [New files](#new-files)
   1. [Existing assets to optimise](#existing-assets-to-optimise)
1. [12. Implementation Procedure](#12-implementation-procedure)
1. [13. Verification Plan](#13-verification-plan)
   1. [Automated checks](#automated-checks)
   1. [Manual verification](#manual-verification)
1. [14. Deployment & Production Configuration](#14-deployment--production-configuration)
   1. [14.1 Hosting options analysis](#141-hosting-options-analysis)
      1. [Option A — Cloudflare Pages (recommended)](#option-a--cloudflare-pages-recommended)
      1. [Option B — Oracle Always Free VM + Cloudflare Tunnel](#option-b--oracle-always-free-vm--cloudflare-tunnel)
      1. [Recommendation summary](#recommendation-summary)
   1. [14.2 Configuration](#142-configuration)
1. [15. Success Criteria](#15-success-criteria)
1. [16. Estimated Timeline](#16-estimated-timeline)

</details>

---

## 1. Executive Summary

JindaSoft (Pty) Ltd is a South African IT consultancy incorporated in March 2026, specialising in the Microsoft technology ecosystem — principally SharePoint, Microsoft 365, identity and access management, business solutions, and custom software engineering.

This implementation plan describes the construction of JindaSoft's first production corporate website: a polished, single-page site that must be ready in time for AWS Summit Johannesburg 2026. The site's primary job is to establish credible positioning, communicate the Microsoft-focused service offering, and convert mobile visitors (arriving via a QR code on a business card) into conversations with JindaSoft.

The site will be built with plain semantic HTML, modern CSS, and minimal vanilla JavaScript — no frontend framework, no CMS, no backend. The existing JindaSoft wordmark and iconic logo are the primary visual anchors and must be treated as authoritative. Visual direction is derived directly from the logo's navy, teal, and cyan-green palette.

The site must be honest: it must never fabricate client counts, testimonials, certifications, or years of company experience. Credibility comes from technical specificity and professional execution.

---

## 2. Business & Brand Context

- **Legal entity:** JindaSoft (Pty) Ltd, incorporated 9 March 2026, South Africa.
- **Core business:** Microsoft-focused IT consultancy — SharePoint architecture, Microsoft 365, identity and access management, business solutions and automation, custom software engineering.
- **Microsoft partnership:** JindaSoft intends to join the Microsoft AI Cloud Partner Program. This relationship is **not yet in effect** and must not be implied by the website.
- **Strategic centre of gravity:** SharePoint + Microsoft 365 + business solutions. JindaSoft should not be presented as an everything-to-everyone IT provider.
- **AWS Summit context:** The founder is attending AWS Summit Johannesburg 2026 for networking and professional development. AWS is **not** a primary JindaSoft service pillar and should not become one simply because of the event.
- **Brand assets available:**
  - `assets/wordmark.png` — full JindaSoft logotype with tagline "IT CONSULTING | SHAREPOINT ARCHITECTS | SOFTWARE SOLUTIONS"
  - `assets/icon.png` — standalone iconic logo (stylised primate with circuit-board motif, deep navy-to-cyan gradient)
- **Tagline confirmed from wordmark:** IT CONSULTING | SHAREPOINT ARCHITECTS | SOFTWARE SOLUTIONS

---

## 3. Target Audience

### Primary

1. **SMB owners and executives** who need help extracting more value from Microsoft 365, or who lack sufficient internal Microsoft expertise.
2. **IT managers and technology decision-makers** requiring architecture, migration, governance, or implementation assistance.
3. **Organisations considering SharePoint** — companies moving from file shares or ad-hoc document storage who need structured document management, intranets, or information architecture.
4. **Potential Microsoft customers** who are purchasing Microsoft 365 but need a trusted implementation partner.

### Secondary

- Developers and IT professionals
- Microsoft ecosystem contacts
- Potential technology and delivery partners
- Prospective subcontracting opportunities
- Prospective clients encountered at AWS Summit Johannesburg

### Primary interaction context

The most important single interaction is:

> **Business card → QR code → mobile browser → homepage**

The site must therefore excel on mobile from the very first scroll.

---

## 4. Goals and Non-Goals

### 4.1 Primary goals

1. Establish JindaSoft as a credible, Microsoft-focused technology consultancy.
2. Clearly communicate SharePoint expertise as the strongest specialist association.
3. Demonstrate that JindaSoft moves beyond advice into architecture and implementation.
4. Present software engineering as a supporting capability without making JindaSoft look like a generic dev shop.
5. Convert visitors into conversations (primary CTA).
6. Deliver a polished, mobile-first experience for QR-code visitors.
7. Establish a foundation that can grow as JindaSoft earns certifications, partner designations, case studies, and products.

### 4.2 Secondary goals

- Provide a home for future case studies.
- Support future Microsoft partner credibility.
- Allow future dedicated service pages to be built on top of the existing site without a redesign.
- Allow JindaSoft Commerce / SaaS products to be presented separately when the time comes.
- Establish a professional permanent web presence — not a disposable event microsite.

### 4.3 Non-goals for first release

- No fabricated client portfolio, testimonials, years-of-experience claims, or certifications.
- No AWS consultancy positioning.
- No technology laundry list.
- No blog or CMS.
- No customer portal, authentication, or CRM integration.
- No multi-tenant or SaaS product functionality.
- No e-commerce functionality within the corporate site.
- No unnecessary animations that compromise performance or credibility.
- No enterprise-scale frontend framework unless genuinely warranted by a concrete requirement.

---

## 5. Brand & Visual Direction

### 5.1 Existing assets

| Asset       | File                  | Primary use                                                                |
| ----------- | --------------------- | -------------------------------------------------------------------------- |
| Wordmark    | `assets/wordmark.png` | Hero, header (desktop), footer                                             |
| Iconic logo | `assets/icon.png`     | Favicon, mobile nav, compact header, social/share graphics, visual accents |

Both assets must be treated as authoritative. The colour system must be derived from these assets, not imposed over them.

### 5.2 Colour system

The logo uses a gradient that transitions from deep navy through mid-teal to bright cyan-green. Derived palette:

| Token                | Suggested value | Role                                          |
| -------------------- | --------------- | --------------------------------------------- |
| `--color-navy`       | `#152B6E`       | Primary brand — deepest anchor                |
| `--color-teal`       | `#0D7F8C`       | Secondary brand — mid accent                  |
| `--color-cyan`       | `#00C8AF`       | Accent — highlights, CTA hover, active states |
| `--color-bg`         | `#0B0F1A`       | Page background (dark)                        |
| `--color-surface`    | `#111827`       | Card / section surface                        |
| `--color-surface-2`  | `#1C2535`       | Elevated surface                              |
| `--color-border`     | `#243048`       | Dividers and borders                          |
| `--color-text`       | `#E8EDF5`       | Primary text                                  |
| `--color-text-muted` | `#8A9BB5`       | Secondary / metadata text                     |
| `--color-text-faint` | `#4A5A72`       | Placeholder / disabled                        |
| `--color-success`    | `#22C55E`       | Semantic — success state                      |
| `--color-error`      | `#EF4444`       | Semantic — error state                        |

> **Note:** SVG source files are not available — the wordmark and icon exist only as PNG exports. The hex values above are extracted by careful visual inspection of those PNG assets and are the best available approximation. They should be treated as working values and may need slight adjustment if a future SVG or brand-guide document becomes available.

Brand gradient (for hero and accent elements):

```
linear-gradient(135deg, #152B6E 0%, #0D7F8C 55%, #00C8AF 100%)
```

A dark scheme fits the "serious, technical, enterprise-capable" character specified in the brief and provides strong contrast for text and interactive elements without appearing generic.

### 5.3 Typography

All typefaces sourced from Google Fonts.

| Role                      | Typeface                                         | Weight(s) |
| ------------------------- | ------------------------------------------------ | --------- |
| Display / hero headline   | **Inter**                                        | 700, 800  |
| Section headings          | **Inter**                                        | 600       |
| Body text                 | **Inter**                                        | 400, 500  |
| Navigation                | **Inter**                                        | 500       |
| Metadata / labels         | **Inter**                                        | 400       |
| Code / technical callouts | **JetBrains Mono** (or `monospace` system stack) | 400       |

A single superfamily (Inter) keeps the design clean, professional, and fast. JetBrains Mono is reserved for code snippets or technical metadata only.

Fluid type scale using `clamp()`:

| Token          | Range                            |
| -------------- | -------------------------------- |
| `--text-hero`  | `clamp(2.5rem, 5vw, 4rem)`       |
| `--text-h1`    | `clamp(2rem, 3.5vw, 3rem)`       |
| `--text-h2`    | `clamp(1.5rem, 2.5vw, 2rem)`     |
| `--text-h3`    | `clamp(1.125rem, 1.8vw, 1.5rem)` |
| `--text-body`  | `1rem`                           |
| `--text-small` | `0.875rem`                       |
| `--text-micro` | `0.75rem`                        |

### 5.4 Design character

The site should feel: **modern · technical · professional · confident · precise · sophisticated · approachable · enterprise-capable.**

It should **not** feel like:

- A generic digital agency
- A template-driven small-business site
- An overdecorated startup landing page
- An "AI agency" cliché
- An AWS or Microsoft brand clone

Design choices to achieve this character:

- Dark background with restrained, purposeful use of the brand gradient
- Generous whitespace
- Sharp, rectilinear layout geometry
- Optional very restrained grid-line or dot-grid texture
- Small-caps or tracked uppercase for section labels and metadata
- Inline SVG or a minimal icon subset for crisp iconography
- Micro-animations only for purposeful feedback (hover states, scroll-reveal) — no gratuitous motion

### 5.5 Imagery

Acceptable:

- Real screenshots of the Online Sneaker Shop (where accurate and available)
- Architecture and flow diagrams where genuinely useful
- Abstract brand-derived visuals
- Microsoft product interface screenshots where relevant and licensed to use

Avoid:

- Generic stock photography (handshakes, fake meetings, server rooms, pointing at charts)
- AI-generated images of people
- Imagery that implies client relationships that do not exist

---

## 6. Information Architecture

### 6.1 Site structure

The first production release is a **single-page corporate website**. All content lives in `index.html`, organised into named sections with anchor IDs. Navigation uses in-page anchor links.

The site is architected so that individual sections can later be promoted into standalone pages (`/services`, `/about`, `/contact`, etc.) without a redesign.

### 6.2 Primary navigation

| Label     | Anchor       |
| --------- | ------------ |
| Home      | `#top`       |
| Services  | `#services`  |
| Solutions | `#solutions` |
| About     | `#about`     |
| Contact   | `#contact`   |

The sticky navigation header shows the iconic logo on mobile and the wordmark on tablet and above.

### 6.3 Homepage section order

|   # | Section               | Purpose                                                                                     |
| --: | :-------------------- | :------------------------------------------------------------------------------------------ |
|   1 | **Hero**              | Identity, positioning, primary CTA, secondary CTA                                           |
|   2 | **Core capabilities** | SharePoint, M365, Identity, Business Solutions, Software Solutions                          |
|   3 | **Why JindaSoft**     | Business-first · Architecture-led · Practical · Modern engineering                          |
|   4 | **How we work**       | Understand → Architect → Implement → Improve                                                |
|   5 | **Selected work**     | [Online Sneaker Shop](https://sneakers.jindasoftconsulting.com/) as engineering/cloud proof |
|   6 | **Microsoft focus**   | Ecosystem explanation; partner branding only when permitted                                 |
|   7 | **Call to action**    | Invitation to discuss a technology challenge                                                |
|   8 | **Footer**            | Company info, contact details, legal links, professional/social links                       |

---

## 7. Content & Messaging

### 7.1 Hero headline direction

**Confirmed headline:** Option A — business-first.

> **Technology solutions built around your business.**

This is the stronger starting point: it is inclusive of the full service portfolio, avoids over-indexing on a single vendor name in the first line of copy, and invites any technology-challenged business rather than only those already evaluating Microsoft.

The hero subheading must answer: _What is JindaSoft? What does JindaSoft do? What should I do next?_

Working subheading for implementation:

> JindaSoft helps organisations design, implement, and improve Microsoft 365, SharePoint, and related business solutions.

### 7.2 Calls to action

| CTA       | Copy direction                                      | Placement                |
| --------- | --------------------------------------------------- | ------------------------ |
| Primary   | "Talk to JindaSoft" or "Start a conversation"       | Hero, bottom CTA section |
| Secondary | "Explore our capabilities" or "See how we can help" | Hero                     |
| Contact   | Email address + contact form                        | Contact section, footer  |

### 7.3 Services content

Five capability areas, ordered by prominence:

1. **SharePoint Architecture & Consulting** — architecture, information architecture, intranets, document management, libraries and metadata, permissions and governance, migration planning, implementation, administration.
2. **Microsoft 365** — implementation, tenant configuration, user and group management, administration, adoption and optimisation, Teams and collaboration, governance.
3. **Identity & Access** — Microsoft Entra ID, identity architecture, access management, authentication, Conditional Access, security-oriented configuration.
4. **Business Solutions** — process automation, Power Platform, Power Automate, Power Apps, SharePoint-based business applications, Microsoft 365 integrations.
5. **Software Solutions** — custom web applications, business systems, integrations, APIs, e-commerce platforms, cloud-native software engineering.

### 7.4 Content rules

The following must **never** be invented or implied:

- Customers or client logos
- Testimonials
- Certifications or Microsoft designations not yet earned
- Partner statuses not yet in effect
- Employee count or team size
- Office locations beyond what is accurate
- Revenue figures or project counts
- Years of company experience beyond what is accurate
- Awards or recognition
- Fabricated case-study outcomes or performance statistics

Where content is required but not yet available, use a clearly marked `<!-- TODO: [description] -->` placeholder or design the section to be populated later without appearing incomplete.

### 7.5 Selected work — Online Sneaker Shop

The Selected Work section will use the supplied Online Sneaker Shop screenshots to demonstrate end-to-end software engineering capability.

The screenshots represent the customer’s purchasing journey and should be presented in the following sequence:

| Step | Screen              | What it shows                           |
| ---- | ------------------- | --------------------------------------- |
| 1    | **Storefront**      | Product catalogue / shopping experience |
| 2    | **Product**         | Individual product view                 |
| 3    | **Cart**            | Cart management                         |
| 4    | **Shipping**        | Checkout / delivery information         |
| 5    | **Order confirmed** | Completed purchase flow                 |

The screenshots should be presented as a **cohesive visual sequence** — a scrollable or stepped journey rather than an unrelated gallery. The presentation should communicate that JindaSoft can design and implement complete business applications and e-commerce workflows from catalogue to confirmed order.

#### Labelling and attribution requirements

The project must be explicitly identified as **project / engineering work**, not as a client case study. The following must never be implied:

- A client or commercial relationship
- Revenue figures, conversion rates, or performance claims
- That the platform is in multi-tenant or production use for paying merchants
- Any outcome that cannot be truthfully stated

A label such as **“Personal project — engineering capability demonstration”** (or equivalent clear wording) must appear in proximity to the screenshots.

#### Live link

The live project may be linked at:

> [https://sneakers.jindasoftconsulting.com/](https://sneakers.jindasoftconsulting.com/)

The link should be presented as a “View live project” action, not as a “Visit our product” or “Client site” link.

---

## 8. UX & Conversion Strategy

The primary conversion journey:

```
Business card → QR code → mobile browser → homepage hero
  → understand JindaSoft → credibility signals → contact
```

Design principles to support this journey:

- **Mobile-first layout:** All layout decisions start at 375 px and expand upward.
- **Immediate clarity:** The hero must communicate who JindaSoft is and what it does within 3 seconds without scrolling.
- **Thumb-friendly CTAs:** Tap targets ≥ 44 × 44 px. Primary CTA buttons large and high-contrast.
- **Simple navigation:** Hamburger menu on mobile with accessible focus management; no mega-menu complexity.
- **Fast time-to-interactive:** No blocking scripts, no render-blocking fonts, no heavy third-party embeds above the fold.
- **Low contact friction:** Email address and contact form visible without hunting.
- **Restrained motion:** Scroll-reveal animations only where they aid comprehension, never where they delay content. All animation respects `prefers-reduced-motion`.

Responsive breakpoints:

| Breakpoint | Min width | Label     |
| ---------- | --------- | --------- |
| Mobile     | —         | (default) |
| Tablet     | `640px`   | `md`      |
| Desktop    | `1024px`  | `lg`      |
| Wide       | `1280px`  | `xl`      |

---

## 9. Technical Architecture

### 9.1 Technology choices

| Concern      | Choice                                        | Rationale                                                    |
| ------------ | --------------------------------------------- | ------------------------------------------------------------ |
| HTML         | Plain semantic HTML5                          | Brief explicitly requires this; no framework overhead        |
| CSS          | Vanilla CSS with custom properties            | Full control; no Tailwind or preprocessor dependency         |
| JavaScript   | Vanilla ES2020+ (minimal)                     | Nav toggle, scroll-spy, scroll-reveal, form handling         |
| Fonts        | Google Fonts — Inter, JetBrains Mono          | Modern, readable, fast CDN delivery                          |
| Icons        | Inline SVG or a minimal Phosphor Icons subset | No icon-font flicker; precise control                        |
| Contact form | HTML form + Formspree (or equivalent)         | Zero backend complexity; reliable email delivery             |
| Analytics    | Plausible or GA4                              | Lightweight; Plausible avoids GDPR cookie-consent complexity |
| Build system | None                                          | No dependency chain; straightforward deployment              |

### 9.2 File organisation

```
/
├── index.html
├── css/
│   ├── tokens.css          ← colour, typography, spacing custom properties
│   ├── reset.css           ← modern CSS reset
│   ├── base.css            ← base element styles
│   ├── layout.css          ← grid, container, section scaffolding
│   ├── components.css      ← buttons, cards, badges
│   ├── navigation.css      ← header, nav, mobile hamburger menu
│   ├── hero.css            ← hero section
│   ├── sections.css        ← all remaining page sections
│   └── utilities.css       ← spacing and text utility classes
├── js/
│   └── main.js             ← nav toggle, scroll-spy, scroll-reveal, form
├── assets/
│   ├── wordmark.png        ← existing; optimise and export WebP variant
│   ├── icon.png            ← existing; optimise and export WebP variant
│   ├── favicon.ico         ← generated from icon.png
│   ├── favicon-32.png      ← generated from icon.png
│   ├── apple-touch-icon.png← generated from icon.png
│   └── og-image.png        ← Open Graph image (1200 × 630)
├── robots.txt
├── sitemap.xml
└── Documentation/
    └── JindaSoft Website Implementation Plan.md
```

### 9.3 CSS architecture

Design tokens are defined in `tokens.css` and consumed everywhere else. No utility-class framework. Selectors are kept specific to components to avoid global side-effects.

Key patterns:

- CSS Grid for major layout regions
- Flexbox for component-level alignment
- `clamp()` for fluid typography
- `@media (prefers-reduced-motion: reduce)` wrapper around all scroll animations
- Token-based dark scheme; light-mode variant can be added later via a single `@media (prefers-color-scheme: light)` block in `tokens.css`

### 9.4 JavaScript

A single `main.js` file handles:

1. **Mobile navigation toggle** — open/close hamburger menu with `aria-expanded`.
2. **Scroll-spy** — highlight the active navigation link as sections enter the viewport via `IntersectionObserver`.
3. **Scroll-reveal** — fade/slide elements into view as they scroll in via `IntersectionObserver`; respects `prefers-reduced-motion`.
4. **Contact form** — client-side validation, submission to Formspree endpoint, success/error state display.
5. **Smooth scroll** — supplement `scroll-behavior: smooth` where needed.

No third-party JavaScript libraries are required.

### 9.5 Assumptions — status

Items confirmed by the stakeholders are marked ✅.

| #   | Item                            | Status       | Resolution                                                                                                    |
| --- | ------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| 1   | **Domain**                      | ✅ Confirmed | `jindasoftconsulting.com`                                                                                     |
| 2   | **Hosting / deployment target** | ✅ Confirmed | Cloudflare Pages                                                                                              |
| 3   | **Contact form backend**        | ✅ Confirmed | Web3Forms — static HTML form endpoint with AJAX submission and email delivery to info@jindasoftconsulting.com |
| 4   | **Analytics**                   | ✅ Confirmed | Not required for launch; defer analytics until there is a defined measurement need                            |
| 5   | **Logo source files**           | ✅ Confirmed | No SVG available — PNG only. Colour tokens derived from visual inspection.                                    |
| 6   | **Hero headline**               | ✅ Confirmed | Option A: “Technology solutions built around your business.”                                                  |
| 7   | **Sneaker Shop screenshots**    | ✅ Confirmed | Supplied in `assets`.                                                                                         |
| 8   | **Contact details**             | ✅ Confirmed | info@jindasoftconsulting.com, +27 65 614 8404, https://www.linkedin.com/company/jindasoft-consulting          |
| 9   | **Legal / POPIA**               | ✅ Confirmed | No privacy policy or terms page required at launch                                                            |

---

## 10. SEO, Accessibility & Performance

### 10.1 SEO

| Item              | Implementation                                                          |
| ----------------- | ----------------------------------------------------------------------- | --------------------- | ------------------ |
| Page title        | JindaSoft Consulting – IT Consulting                                    | SharePoint Architects | Software Solutions |
| Meta description  | Concise, keyword-relevant, ≤ 160 characters                             |
| Canonical URL     | `<link rel="canonical" href="https://jindasoftconsulting.com/">`        |
| Open Graph        | `og:title`, `og:description`, `og:image` (1200 × 630), `og:url`         |
| Twitter/X Card    | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` |
| Heading hierarchy | Single `<h1>` in the hero; `<h2>` per section; `<h3>` within sections   |
| Semantic HTML     | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<address>`     |
| Structured data   | `Organization` schema (JSON-LD): name, URL, contactPoint, logo          |
| robots.txt        | Allow all; reference sitemap                                            |
| sitemap.xml       | Single-page sitemap with `lastmod`                                      |
| Favicon set       | `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`                 |

Primary keyword targets: SharePoint consulting South Africa · Microsoft 365 consulting · SharePoint architecture · Microsoft 365 implementation · IT consulting South Africa.

### 10.2 Accessibility

Target: **WCAG 2.2 AA** where practical.

| Requirement          | Implementation                                                      |
| -------------------- | ------------------------------------------------------------------- |
| Semantic HTML        | See §10.1                                                           |
| Keyboard navigation  | All interactive elements reachable by Tab; logical focus order      |
| Visible focus states | `:focus-visible` with brand-accent outline; never removed or hidden |
| Skip link            | "Skip to main content" as the first focusable element               |
| Mobile nav           | `aria-expanded`, `aria-controls`; focus trap while open             |
| Colour contrast      | Text ≥ 4.5 : 1 (normal) / 3 : 1 (large) against background          |
| Images               | Meaningful `alt` text; decorative images use `alt=""`               |
| Forms                | `<label>` for every input; errors linked via `aria-describedby`     |
| Reduced motion       | `@media (prefers-reduced-motion: reduce)` disables all animations   |
| Language attribute   | `<html lang="en">`                                                  |

### 10.3 Performance

Target: Lighthouse Performance ≥ 90 on mobile (throttled 4G).

| Concern            | Approach                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| Images             | Export WebP with PNG fallback via `<picture>`; include `width` and `height` to prevent layout shift |
| Fonts              | Preconnect to `fonts.googleapis.com`; use `font-display: swap`                                      |
| JavaScript         | Loaded with `defer`; no render-blocking scripts                                                     |
| CSS                | Single linked stylesheet in `<head>`; no `@import` chains                                           |
| Animations         | `will-change` only where genuinely needed; prefer CSS transitions over JS animation loops           |
| Lazy loading       | `loading="lazy"` on all below-the-fold images                                                       |
| No heavy libraries | No jQuery, no animation library, no component framework                                             |
| Caching            | `Cache-Control` headers configured at hosting level                                                 |
| Compression        | Gzip / Brotli enabled at hosting level                                                              |

---

## 11. Proposed Changes

The project currently contains only `assets/` and `Documentation/`. All of the following are new files.

### New files

| File                          | Purpose                                              |
| ----------------------------- | ---------------------------------------------------- |
| `index.html`                  | Single-page corporate site                           |
| `css/tokens.css`              | Design token custom properties                       |
| `css/reset.css`               | Modern CSS reset                                     |
| `css/base.css`                | Base element styles                                  |
| `css/layout.css`              | Grid, container, section scaffolding                 |
| `css/components.css`          | Buttons, cards, badges                               |
| `css/navigation.css`          | Header, nav, mobile hamburger menu                   |
| `css/hero.css`                | Hero section styles                                  |
| `css/sections.css`            | All remaining page sections                          |
| `css/utilities.css`           | Spacing and text utility classes                     |
| `js/main.js`                  | Nav toggle, scroll-spy, scroll-reveal, form handling |
| `assets/favicon.ico`          | Generated from `icon.png`                            |
| `assets/favicon-32.png`       | Generated from `icon.png`                            |
| `assets/apple-touch-icon.png` | Generated from `icon.png`                            |
| `assets/og-image.png`         | Open Graph social image (1200 × 630)                 |
| `robots.txt`                  | Crawler instructions                                 |
| `sitemap.xml`                 | XML sitemap                                          |

### Existing assets to optimise

| File                  | Action                                          |
| --------------------- | ----------------------------------------------- |
| `assets/wordmark.png` | Export WebP variant; add `width`/`height`       |
| `assets/icon.png`     | Export WebP variant; generate all favicon sizes |

---

## 12. Implementation Procedure

Implementation should proceed in the following order to minimise rework:

1. **Asset preparation** — optimise `icon.png`, `wordmark.png`, and Online Sneaker Shop screenshots; generate favicon set and OG image.
2. **Design tokens** — create `css/tokens.css` with the complete colour, typography, and spacing system.
3. **Reset and base** — `css/reset.css` and `css/base.css` establishing sensible defaults on top of the token layer.
4. **Layout scaffolding** — `css/layout.css` with grid, container, and section classes.
5. **HTML structure** — skeleton `index.html` with all sections, semantic landmarks, and placeholder content.
6. **Navigation** — sticky header, wordmark/icon responsive switch, accessible mobile hamburger menu.
7. **Hero section** — gradient background, headline, subheading, CTA buttons.
8. **Core capabilities section** — service cards for five capability areas.
9. **Why JindaSoft section** — four-pillar grid (Business-first, Architecture-led, Practical, Modern engineering).
10. **How we work section** — four-step process (Understand → Architect → Implement → Improve).
11. **Selected work section** — implement the Online Sneaker Shop as a five-step visual journey (Storefront → Product → Cart → Shipping → Order confirmed); label explicitly as personal/engineering work; include “View live project” link to `https://sneakers.jindasoftconsulting.com/`. See §7.5 for full content direction.
12. **Microsoft focus section** — ecosystem explanation copy; placeholder for future partner badge.
13. **Call-to-action section** — full-width invitation with primary CTA.
14. **Footer** — company information, contact details, legal links.
15. **Contact section** — email address, contact form with validation.
16. **JavaScript** — `js/main.js`: nav toggle, scroll-spy, scroll-reveal, form handling.
17. **SEO metadata** — all `<head>` meta tags and JSON-LD structured data.
18. **Favicon and touch icons** — inject favicon links into `<head>`.
19. **robots.txt and sitemap.xml** — generated from the confirmed domain.
20. **Accessibility audit** — keyboard navigation, colour contrast, focus states, screen-reader labels.
21. **Performance audit** — Lighthouse on mobile; address any category below target score.
22. **Cross-browser review** — Chrome, Firefox, Safari, Edge; iOS Safari, Android Chrome.
23. **Content review** — verify no fabricated claims have been introduced.
24. **Production deployment** — configure hosting, custom domain, HTTPS.

---

## 13. Verification Plan

### Automated checks

| Check         | Tool                                    |
| ------------- | --------------------------------------- |
| HTML validity | W3C Validator                           |
| CSS validity  | W3C CSS Validator                       |
| Accessibility | axe DevTools / Lighthouse Accessibility |
| Performance   | Lighthouse (mobile, throttled)          |
| SEO           | Lighthouse SEO                          |
| Broken links  | `htmlproofer` or equivalent             |

Lighthouse score targets:

| Category       | Minimum |
| -------------- | ------- |
| Performance    | 90      |
| Accessibility  | 95      |
| Best Practices | 95      |
| SEO            | 95      |

### Manual verification

- [ ] Site displays correctly at 375 px (iPhone SE), 390 px (iPhone 14), 768 px (iPad), and 1440 px (desktop).
- [ ] QR-code journey tested end-to-end: scan → mobile browser → homepage visible within 3 seconds.
- [ ] All navigation links scroll to the correct section.
- [ ] Mobile nav opens, closes, and traps focus correctly.
- [ ] Primary CTA links to the contact section or opens an email compose.
- [ ] Contact form submits, shows success state, and delivers email to the nominated address.
- [ ] No fabricated content is present anywhere on the page.
- [ ] Logo assets display correctly in both light and dark OS environments.
- [ ] All images have meaningful alt text.
- [ ] Site renders acceptably with JavaScript disabled.
- [ ] HTTPS is enforced on the production domain; no mixed-content warnings.
- [ ] Open Graph image renders correctly in LinkedIn and WhatsApp link previews.

---

## 14. Deployment & Production Configuration

**Domain confirmed:** `jindasoftconsulting.com`

### 14.1 Hosting options analysis

Two approaches were evaluated against the requirements: use of the already-owned domain at no extra cost, managed CI/CD, HTTPS, and good global performance.

#### Option A — Cloudflare Pages (recommended)

Cloudflare Pages is a fully managed static hosting platform with a generous free tier.

| Factor                 | Detail                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Custom domain          | Free — point `jindasoftconsulting.com` DNS to Cloudflare Pages; no platform subdomain required |
| HTTPS                  | Automatic; Cloudflare issues and renews TLS certificates                                       |
| CI/CD                  | Built-in: push to the GitHub repository → Cloudflare Pages automatically builds and deploys    |
| CDN                    | Cloudflare’s global CDN is included; assets served from the edge closest to the visitor        |
| Compression            | Brotli and Gzip served automatically                                                           |
| Cache-Control          | Configurable via `_headers` file in the repository                                             |
| Free tier limits       | 500 builds/month, unlimited requests and bandwidth — more than sufficient for this site        |
| Operational complexity | Very low — no infrastructure to manage                                                         |
| Cost                   | Free (custom domain + hosting + CDN + CI/CD)                                                   |

This is the **recommended** approach. It delivers the requirement (custom domain, no platform subdomain, managed CI/CD) with minimal operational overhead and no infrastructure to maintain.

**Setup steps:**

1. Transfer DNS management for `jindasoftconsulting.com` to Cloudflare (or add the domain to Cloudflare with existing registrar nameservers).
2. Connect the GitHub repository to Cloudflare Pages.
3. Configure the build settings (no build command; output directory = `/`).
4. Add `jindasoftconsulting.com` as the custom domain in the Cloudflare Pages dashboard.
5. Add a `_headers` file to the repository to set `Cache-Control` headers.
6. Add a `_redirects` file if www → non-www (or vice versa) redirect is needed.

#### Option B — Oracle Always Free VM + Cloudflare Tunnel

This approach runs an nginx (or Caddy) static file server on an Oracle Always Free VM, with a Cloudflare Tunnel providing HTTPS and public access without opening inbound firewall ports.

| Factor                 | Detail                                                                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Custom domain          | Free — Cloudflare Tunnel routes `jindasoftconsulting.com` to the VM                                                                    |
| HTTPS                  | Cloudflare-terminated TLS; the tunnel handles certificate issuance                                                                     |
| CI/CD                  | Requires manual setup — e.g. a GitHub Actions workflow that SSH-deploys to the VM on push                                              |
| CDN                    | Cloudflare proxy provides edge caching                                                                                                 |
| Compression            | Configured on the web server (nginx/Caddy)                                                                                             |
| Cache-Control          | Configured on the web server                                                                                                           |
| Operational complexity | High — VM provisioning, OS patching, web server configuration, SSH key management, tunnel daemon maintenance, CI/CD pipeline authoring |
| Cost                   | Free (Oracle Always Free tier + Cloudflare free tier) but significant ongoing time cost                                                |
| Risk                   | Oracle Always Free VMs are not covered by an SLA; instances have historically been reclaimed during capacity events                    |

This option is viable and may make sense if JindaSoft plans to host other services (databases, APIs, future SaaS workloads) on the same VM. For a static corporate website alone, the operational overhead is disproportionate relative to Cloudflare Pages.

#### Recommendation summary

|                     | Cloudflare Pages           | Oracle VM + CF Tunnel             |
| ------------------- | -------------------------- | --------------------------------- |
| Setup time          | ~30 minutes                | ~3–5 hours                        |
| Ongoing maintenance | None                       | OS/server patching, tunnel daemon |
| CI/CD               | Built-in                   | Requires GitHub Actions setup     |
| Custom domain       | ✅ Free                    | ✅ Free                           |
| HTTPS               | ✅ Automatic               | ✅ Cloudflare-terminated          |
| CDN                 | ✅ Global                  | ✅ Cloudflare proxy               |
| SLA / reliability   | Cloudflare managed         | No Oracle SLA on free tier        |
| Best for            | Static site (this project) | Multi-service VM workloads        |

**Proceed with Cloudflare Pages unless there is a specific reason to prefer the VM approach** (e.g. a plan to co-host other services on the same instance in the near term).

### 14.2 Configuration

| Item                          | Value                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------- |
| Domain                        | `jindasoftconsulting.com`                                                     |
| www redirect                  | `www.jindasoftconsulting.com` → `jindasoftconsulting.com` (non-www canonical) |
| HTTPS                         | Automatic (Cloudflare)                                                        |
| Cache-Control (HTML)          | `no-cache` — ensures visitors always receive the current version              |
| Cache-Control (static assets) | `max-age=31536000, immutable` — long-lived cache for versioned assets         |
| Compression                   | Brotli / Gzip (Cloudflare automatic)                                          |
| Build step                    | None — files deployed as-is                                                   |
| Analytics                     | To be configured (see §9.5 item 4)                                            |

---

## 15. Success Criteria

The website meets its success criteria when a visitor arriving via QR code on a mobile device can quickly and clearly answer all of the following:

| Question                                          | Target answer                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| What is JindaSoft?                                | A Microsoft-focused IT consultancy and software solutions company.                                |
| What does JindaSoft specialise in?                | SharePoint, Microsoft 365, and related business technology solutions.                             |
| Can JindaSoft actually implement things?          | Yes — the site demonstrates architecture and software-engineering capability.                     |
| Why should I trust JindaSoft?                     | Genuine technical specificity, honest credentials, professional execution — no fabricated claims. |
| How do I contact JindaSoft?                       | The answer is immediately obvious.                                                                |
| Does the site work on my phone?                   | Yes, without compromise.                                                                          |
| Does this site still make sense after the Summit? | Yes — it is a permanent corporate website, not an event microsite.                                |

Additionally:

- Lighthouse Performance ≥ 90 on mobile.
- Lighthouse Accessibility ≥ 95.
- No fabricated claims anywhere on the page.
- HTTPS enforced on the production domain.
- Site loads visibly within 2 seconds on a 4G mobile connection.

---

## 16. Estimated Timeline

Estimates assume a single developer working full-time. Four of nine open questions are now confirmed.

|     Phase | Task                                              |      Estimated effort |
| --------: | :------------------------------------------------ | --------------------: |
|         1 | HTML structure, navigation, hero section          |                 1 day |
|         2 | All remaining page sections                       |              1.5 days |
|         3 | JavaScript (nav, scroll-spy, scroll-reveal, form) |               0.5 day |
|         4 | SEO metadata, structured data, favicon, sitemap   |               0.5 day |
|         5 | Accessibility audit and fixes                     |               0.5 day |
|         6 | Performance audit and fixes                       |               0.5 day |
|         7 | Cross-browser and mobile review                   |               0.5 day |
|         8 | Content review and copy refinement                |               0.5 day |
|         9 | Production deployment, domain, HTTPS              |               0.5 day |
| **Total** |                                                   | **~6–7 working days** |

> **Note:** Domain, hosting approach, and hero headline are now confirmed, removing the most common early-phase schedule risks. The primary remaining risk is confirmation of contact details (§9.5 item 8) — without a real email address the contact section and form cannot be finalised.

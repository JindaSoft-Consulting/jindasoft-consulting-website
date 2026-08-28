# Changelog

All notable changes to the JindaSoft Consulting Website will be documented in this file.

The format is based on [Keep a Changelog][Keep a Changelog url], and this project adheres to [Semantic Versioning][Semantic Versioning url].

### Fixed

## [1.0.1] (28 August 2026)

### Fixed

1. Horizontal side-scrolling on mobile — `overflow-x: hidden` was applied only to `body`, which does not prevent the `html` root element from scrolling horizontally; the property is now set on both `html` and `body` in `reset.css`.
2. Hero highlights grid could force a column wider than the viewport on narrow screens because `minmax(200px, 1fr)` uses a hard 200 px minimum; replaced with `minmax(min(200px, 100%), 1fr)` so the minimum never exceeds the available container width.
3. `og:image` and `twitter:image` meta tags referenced `assets/og-image.png`, which does not exist; corrected to `assets/og-image.jpg` so social-media scrapers (Facebook, WhatsApp, X) receive a valid JPEG content type.

## [1.0.0] (28 August 2026)

### Added

1. Single-page corporate website
2. Semantic HTML
3. Modular CSS (design tokens + light/dark/system theming)
4. TypeScript (Vite)
5. Sticky navigation with mobile menu, scroll-spy, and reveal animations
6. Accessible theme selector (light / dark / system) with FOUC prevention and localStorage persistence
7. Web3Forms contact form with client-side validation and status feedback
8. Selected-work showcase for the Online Sneaker Shop (engineering capability demonstration)
9. Microsoft ecosystem focus section
10. SEO metadata
11. Open Graph cards
12. Twitter cards
13. JSON-LD structured data
14. Favicons
15. Robots.txt
16. Sitemap
17. Main implementation plan documentation
18. Theming documentation
19. TypeScript migration documentation
20. Cloudflare Pages deployment documentation

<!-- References -->

[Keep a Changelog url]: https://keepachangelog.com/en/1.0.0/
[Semantic Versioning url]: https://semver.org/spec/v2.0.0.html
[1.0.1]: https://github.com/JindaSoft-Consulting/jindasoft-consulting-website/releases/tag/v1.0.1
[1.0.0]: https://github.com/JindaSoft-Consulting/jindasoft-consulting-website/releases/tag/v1.0.0

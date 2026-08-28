# Theming Implementation Plan

## Table of Contents

<details>

   <summary>Contents</summary>

1. [1. Executive Summary](#1-executive-summary)
1. [2. Background](#2-background)
1. [3. Goals and Non-Goals](#3-goals-and-non-goals)
   1. [Goals](#goals)
   1. [Non-Goals](#non-goals)
1. [4. Implementation Details](#4-implementation-details)
   1. [Theme Preference Model & Precedence](#theme-preference-model--precedence)
      1. [Preference Behavior Rules:](#preference-behavior-rules)
   1. [First-Paint & FOUC Prevention](#first-paint--fouc-prevention)
   1. [Theme Selector UI & Accessibility Architecture](#theme-selector-ui--accessibility-architecture)
      1. [Interaction & Focus Management:](#interaction--focus-management)
   1. [CSS Architecture & Token System Audit](#css-architecture--token-system-audit)
      1. [Declarative `color-scheme` Handling](#declarative-color-scheme-handling)
      1. [Codebase CSS File Audit & Specific Proposed Changes](#codebase-css-file-audit--specific-proposed-changes)
   1. [Theme Transition Management](#theme-transition-management)
   1. [System Preference Synchronization](#system-preference-synchronization)
1. [5. Proposed Changes](#5-proposed-changes)
   1. [Component: Pre-Paint Script & HTML Structure](#component-pre-paint-script--html-structure)
      1. [[MODIFY] [index.html](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/index.html)](#modify-indexhtmlfilehomesherpadreposwebjindasoft20consultingjindasoft20consulting20websiteindexhtml)
   1. [Component: Design Tokens & CSS Architecture](#component-design-tokens--css-architecture)
      1. [[MODIFY] [tokens.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/tokens.css)](#modify-tokenscssfilehomesherpadreposwebjindasoft20consultingjindasoft20consulting20websitecsstokenscss)
      1. [[MODIFY] [reset.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/reset.css)](#modify-resetcssfilehomesherpadreposwebjindasoft20consultingjindasoft20consulting20websitecssresetcss)
      1. [[MODIFY] [navigation.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/navigation.css)](#modify-navigationcssfilehomesherpadreposwebjindasoft20consultingjindasoft20consulting20websitecssnavigationcss)
      1. [[MODIFY] [layout.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/layout.css)](#modify-layoutcssfilehomesherpadreposwebjindasoft20consultingjindasoft20consulting20websitecsslayoutcss)
      1. [[MODIFY] [components.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/components.css)](#modify-componentscssfilehomesherpadreposwebjindasoft20consultingjindasoft20consulting20websitecsscomponentscss)
      1. [[MODIFY] [hero.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/hero.css)](#modify-herocssfilehomesherpadreposwebjindasoft20consultingjindasoft20consulting20websitecssherocss)
      1. [[MODIFY] [sections.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/sections.css)](#modify-sectionscssfilehomesherpadreposwebjindasoft20consultingjindasoft20consulting20websitecsssectionscss)
   1. [Component: Application Logic & Event Handling](#component-application-logic--event-handling)
      1. [[MODIFY] [main.js](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/js/main.js)](#modify-mainjsfilehomesherpadreposwebjindasoft20consultingjindasoft20consulting20websitejsmainjs)
1. [6. Procedure](#6-procedure)
1. [7. Success Criteria](#7-success-criteria)
1. [8. Verification Plan](#8-verification-plan)
1. [9. Risks and Mitigation](#9-risks-and-mitigation)
1. [10. Rollback Plan](#10-rollback-plan)
1. [11. Estimated Timeline](#11-estimated-timeline)
1. [12. Implementation Decision Summary](#12-implementation-decision-summary)
   1. [Preference Precedence Summary](#preference-precedence-summary)

</details>

## 1. Executive Summary

This implementation plan details the production-ready strategy for integrating an accessible, 3-option theme selector (`light`, `dark`, and `system`) into the JindaSoft Consulting corporate website.

By default, first-time visitors receive a clean, executive **Light Theme** (`light`), aligning with B2B corporate consultation brand standards. OS preferences are ignored for first-time visitors until an explicit preference (`system`) is selected. Developer visitors and technical stakeholders can switch between **Light**, **Dark**, or **System** preferences via a header-integrated control. The preference is stored under `localStorage` key `theme-preference`, with active themes derived dynamically without observable flash of an incorrect theme during normal page load via a synchronous head script.

## 2. Background

During architectural reviews, developer visitors indicated a strong preference for Dark mode during technical evaluation. While enterprise buyers favor Light theme defaults, providing a 3-choice theme model (`light`, `dark`, `system`) addresses developer ergonomics while ensuring full accessibility, no observable flash of an incorrect theme during normal page load, and robust preference persistence.

## 3. Goals and Non-Goals

### Goals

- Implement a 3-preference model (`light`, `dark`, `system`) stored under `localStorage` key `theme-preference`.
- Default first-time visitors unconditionally to **Light Theme** without reading OS settings initially.
- Prevent FOUC via an inline, zero-dependency pre-paint script in `<head>`.
- Replace hard-coded CSS color values across the codebase with tokenized variables supporting `[data-theme="dark"]`.
- Declaratively set `color-scheme: light` and `color-scheme: dark` in CSS for corresponding `[data-theme]` states (with the pre-paint script setting inline `colorScheme` property for first-paint correctness).
- Implement an accessible theme selector using native HTML form semantics (`<fieldset>`, `<legend class="sr-only">`, and styled `<input type="radio">` options) inside a popover menu with keyboard navigation, focus management, focus restoration, and Escape-to-close behavior.
- Dynamically listen to OS `prefers-color-scheme` changes **only** when active preference is `system`.
- Provide scoped CSS property transitions respecting `prefers-reduced-motion: reduce` without relying on universal `*` selectors or `!important` declarations.

### Non-Goals

- Scheduled automatic theme switching based on local geographic time/sunrise/sunset.
- Arbitrary custom accent color themes or contrast customization beyond standard WCAG AA compliant Light and Dark themes.

## 4. Implementation Details

### Theme Preference Model & Precedence

The application clearly separates **User Preference** (`light` | `dark` | `system`) from **Derived Active Theme** (`light` | `dark`):

- **Key**: `localStorage.getItem('theme-preference')`
- **Allowed Preference Values**: `'light'`, `'dark'`, `'system'`
- **Derived Active Theme**: `'light'` or `'dark'`, applied to `<html data-theme="...">`

#### Preference Behavior Rules:

1. **No Stored Preference** (`null` / invalid / first-time visitor) $\rightarrow$ Default to **Light**. OS preference is ignored.
2. **Stored `light`** $\rightarrow$ Always active theme `light`. OS preference changes are ignored.
3. **Stored `dark`** $\rightarrow$ Always active theme `dark`. OS preference changes are ignored.
4. **Stored `system`** $\rightarrow$ Active theme follows `window.matchMedia('(prefers-color-scheme: dark)')` dynamically (`dark` if matches, `light` otherwise). OS preference changes update active theme automatically.

### First-Paint & FOUC Prevention

To ensure no observable flash of an incorrect theme during normal page load:

An inline, synchronous `<script>` block is placed in `<head>` **before the application CSS `<link>` elements** in [`index.html`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/index.html). The Google Fonts preconnect hints at lines 31–33 are non-blocking and do not affect theme resolution. The script must execute before `css/tokens.css` is parsed so that `[data-theme]` attribute selectors resolve immediately.

```javascript
(function () {
  try {
    var rawPref = localStorage.getItem("theme-preference");
    var pref =
      rawPref === "light" || rawPref === "dark" || rawPref === "system"
        ? rawPref
        : "light";
    var theme = pref;
    if (pref === "system") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.colorScheme = "light";
  }
})();
```

### Theme Selector UI & Accessibility Architecture

The selector control is positioned within the site navigation bar:

- **Trigger Control**: A `<button id="theme-selector-trigger">` with `popovertarget="theme-menu"` and a state-aware accessible label (e.g., `aria-label="Theme: Light. Change theme"`). The Popover API provides the invoker relationship and `aria-expanded` state automatically. `aria-haspopup` and `aria-controls` should not be added because the popup contains a radio group rather than a menu.

- **Menu Container**: A `<div id="theme-menu" popover="auto">` containing a `<fieldset>` with `<legend class="sr-only">Choose theme preference</legend>`. The native Popover API (`popover="auto"`) is appropriate here: it provides built-in Escape-to-close, outside-click-to-close, and top-layer positioning without extra JavaScript. Baseline browser support covers all modern browsers (Baseline 2024).

- **Options**: Native HTML radio inputs (`<input type="radio" name="theme-preference" value="light|dark|system">`) with associated `<label>` elements.

- **Active State Identification**: The `checked` attribute on the radio input matching the current preference provides native browser and screen reader semantics. A CSS `:checked` style provides the visual indicator.

#### Interaction & Focus Management:

- **Opening Menu**: Clicking the trigger (or pressing `Enter`/`Space` when focused on it) toggles the Popover API panel. A `toggle` event listener on the popover moves focus to the currently checked radio input when the popover opens. Optionally, `Down Arrow` on the trigger may also open the popover — this is the only custom keyboard behavior required.

- **Keyboard Navigation**: Arrow key navigation between radio options (`Up`/`Down`/`Left`/`Right`) is handled natively by the browser within the `<fieldset>`. No custom JavaScript arrow-key handling is needed inside the popover.

- **Selection**: When a radio input's `change` event fires, JavaScript reads the selected value, derives and applies the active theme, persists the preference to `localStorage`, and updates the trigger button's `aria-label` to reflect the current preference.

- **Dismissal & Focus**: The Popover API natively handles `Escape` dismissal, light-dismissal via outside interaction, and restoration of focus to the invoking button when closed. JavaScript should not duplicate these behaviors. Use the `toggle` event only where application-specific behavior is required.

- **Mobile Menu Integration**: On mobile screens, the selector is rendered within the collapsible mobile drawer layout with touch targets $\ge 44 \times 44\text{px}$.

### CSS Architecture & Token System Audit

#### Declarative `color-scheme` Handling

`color-scheme` ownership is split between two layers intentionally:

1. **CSS (declarative, authoritative for all subsequent paints)**: In [`css/tokens.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/tokens.css), add `color-scheme` declarations scoped to the `[data-theme]` attribute. [`css/reset.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/reset.css) currently hardcodes `color-scheme: light` on `html`; this must be removed so `tokens.css` becomes the sole CSS authority:

```css
:root,
html[data-theme="light"] {
  color-scheme: light;
}

html[data-theme="dark"] {
  color-scheme: dark;
}
```

2. **Pre-paint script (`style` property, first-paint only)**: The synchronous head script sets `document.documentElement.style.colorScheme = theme` as an inline style so native browser chrome adapts before the CSS files parse. Once `tokens.css` loads, the CSS `[data-theme]` rule takes effect. No ongoing JavaScript management of `color-scheme` is required after initial bootstrap.

#### Codebase CSS File Audit & Specific Proposed Changes

A repository audit reveals theme-sensitive hard-coded colors that require attention. **Brand-fixed colors** — specifically `color: #FFFFFF` applied as text over teal interactive surfaces (`.skip-link`, `.btn-primary`, `.card:hover`, `.highlight-item:hover`, `.process-step:hover`) — are intentional design choices that work correctly in both themes and must **not** be replaced with tokens.

1. **[`css/tokens.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/tokens.css)**:
   - Add `[data-theme="dark"]` token mapping (background `#0F172A`, surface `#1E293B`, surface-2 `#334155`, border `#334155`, text `#F8FAFC`, muted text `#94A3B8`, faint text `#64748B`).
   - Add declarative `color-scheme: light` and `color-scheme: dark` rules.
   - Add dark-mode equivalents for special surfaces: `--color-notice-bg`, `--color-notice-border` (for `.showcase-notice`), and `--gradient-surface` (for `.ms-focus-box`).

2. **[`css/reset.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/reset.css)**:
   - Remove hard-coded `color-scheme: light` from the `html` rule. `tokens.css` becomes the sole CSS authority for `color-scheme`.

3. **[`css/navigation.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/navigation.css)**:
   - Replace hard-coded header background `rgba(255, 255, 255, 0.9)` with `--color-header-bg` (define in `tokens.css` with a dark-mode equivalent using a dark-slate translucent value).
   - Replace mobile menu background with `var(--color-surface)` (already token-referenced in the `.nav-menu` block, but verify the fixed path has no residual hex).
   - Add styling for `#theme-selector-trigger` and `#theme-menu` popover panel including `:popover-open` state, position, and radio option styles.

4. **[`css/layout.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/layout.css)**:
   - `.bg-surface-alt` uses hard-coded `#F1F5F9` as background. Replace with `var(--color-surface-2)` (already defined as a token with that same light-mode value).

5. **[`css/components.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/components.css)**:
   - `.btn-secondary` box shadow uses `rgba(0, 0, 0, 0.05)`. Verify or add a dark-mode equivalent shadow token.
   - `.card:hover` and `.card:hover .badge/.card-icon` use literal `white` — these are **intentional brand-fixed colors** (white on teal hover surface) and must not be replaced.
   - `.form-control` focus ring uses `rgba(13, 127, 140, 0.15)`. Verify this renders with sufficient contrast on dark form backgrounds, or add a token.
   - `.card-icon` and `.badge` use `rgba(13, 127, 140, 0.08)` teal tint. Verify these semi-transparent values remain legible on dark surfaces.

6. **[`css/hero.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/hero.css)**:
   - `.highlight-item` box shadow uses `rgba(15, 23, 42, 0.02)` — a dark-slate shadow that becomes invisible on dark surfaces. Replace with a token (`--shadow-card`) with a light-mode and dark-mode variant defined in `tokens.css`.

7. **[`css/sections.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/sections.css)**:
   - `.showcase-notice` background (`#EFF6FF`) and border (`#BFDBFE`) are hard-coded light-blue surfaces. Replace with `var(--color-notice-bg)` and `var(--color-notice-border)`, providing dark-mode equivalents in `tokens.css`.
   - `.ms-focus-box` gradient (`linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)`) is a hard-coded light surface. Replace with `var(--gradient-surface)` defined with a dark-mode equivalent.
   - `.process-step` and `.showcase-item` box shadows use `rgba(15, 23, 42, 0.04/0.03)`. Verify or add a dark-mode shadow token.

### Theme Transition Management

- Avoid universal `*` transition rules or `!important` overrides.
- Apply smooth theme transitions by adding `.theme-transitioning` to specific theme-sensitive component selectors — **not** to `html` or `body`, as that would transitively affect all descendants via inheritance. Scope to: `.site-header`, `.nav-menu`, `.card`, `.highlight-item`, `.process-step`, `.ms-focus-box`, `.showcase-notice`, `.form-control`, and `body` (for background-color and color only, explicitly declared, not inherited).
- Remove `.theme-transitioning` via JavaScript `setTimeout` after 300ms (matching `--transition-normal`).
- **Reduced motion**: [`css/reset.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/reset.css) already applies `transition-duration: 0.01ms !important` under `@media (prefers-reduced-motion: reduce)` globally. Theme transitions are therefore suppressed automatically for reduced-motion users — no additional reduced-motion handling in the theme transition CSS is required.

### System Preference Synchronization

- Attach a listener to `window.matchMedia('(prefers-color-scheme: dark)')`:
  ```javascript
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    if (getStoredPreference() === "system") {
      applyDerivedTheme("system");
    }
  });
  ```
- If stored preference is `light` or `dark`, the media query callback immediately exits without altering `data-theme`.

---

## 5. Proposed Changes

### Component: Pre-Paint Script & HTML Structure

#### [MODIFY] [index.html](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/index.html)

- Insert synchronous head script **before the application CSS `<link>` elements** for pre-paint theme setting.
- Add theme selector markup to the navigation header: a trigger `<button>` with `popovertarget="theme-menu"` and a `<div popover="auto">` containing a `<fieldset>` with native radio inputs.

### Component: Design Tokens & CSS Architecture

#### [MODIFY] [tokens.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/tokens.css)

- Add declarative `color-scheme` rules for `light` and `dark`.
- Add `[data-theme="dark"]` token mapping for slate dark palette.

#### [MODIFY] [reset.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/reset.css)

- Remove the static `color-scheme: light` declaration from the `html` rule. `color-scheme` is now managed declaratively in `tokens.css` via `[data-theme]` selectors.

#### [MODIFY] [navigation.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/navigation.css)

- Add dropdown popover styles for `#theme-menu` including focus rings, radio input styling, and mobile drawer layout rules.
- Replace hard-coded `#FFFFFF` and `rgba` backgrounds with theme tokens.

#### [MODIFY] [layout.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/layout.css)

- Refactor `.bg-surface-alt` to use `var(--color-surface-2)`.

#### [MODIFY] [components.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/components.css)

- Verify `.btn-secondary` shadow, `.form-control` focus ring, `.card-icon`, and `.badge` teal tints adapt correctly on dark surfaces. Intentional brand-fixed white-on-teal colors must not be changed.

#### [MODIFY] [hero.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/hero.css)

- Replace `.highlight-item` dark-slate box shadow with tokenized `--shadow-card` having a dark-mode variant.

#### [MODIFY] [sections.css](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/sections.css)

- Refactor `.showcase-notice` background and border, `.ms-focus-box` gradient, and dark-slate box shadows to use tokenized variables with dark-mode equivalents.

### Component: Application Logic & Event Handling

#### [MODIFY] [main.js](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/js/main.js)

- Implement theme preference module (`getPreference`, `setPreference`, `applyTheme`).
- Implement native radio change handlers and popover open/close focus restoration logic for `#theme-menu`.
- Bind `prefers-color-scheme` media query listener for `system` preference changes.
- Handle `localStorage` exception fallbacks gracefully.

---

## 6. Procedure

1. **CSS Audit & Tokenization**: Scan and refactor theme-sensitive hard-coded colors in `tokens.css`, `reset.css`, `navigation.css`, `layout.css`, `components.css`, `hero.css`, and `sections.css`. Preserve intentional brand-fixed colors (white text on teal interactive surfaces).
2. **Head Script Implementation**: Insert synchronous pre-paint script into [`index.html`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/index.html).
3. **HTML UI Structure**: Add accessible menu markup with native radio inputs into [`index.html`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/index.html).
4. **CSS Styling**: Add selector styles and transitions into [`css/navigation.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/navigation.css) and [`css/tokens.css`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/css/tokens.css).
5. **JavaScript Modules**: Add menu interaction, radio input bindings, focus restoration, and preference synchronization in [`js/main.js`](file:///home/sherpad/Repos/Web/JindaSoft%20Consulting/JindaSoft%20Consulting%20Website/js/main.js).
6. **Execution of 19-Step Verification Plan**.

---

## 7. Success Criteria

- First-time visitors without stored preference receive Light Theme unconditionally.
- Theme preference `light`, `dark`, or `system` persists in `localStorage` under `theme-preference`.
- `system` preference dynamically responds to OS theme changes; `light` and `dark` ignore OS changes.
- No observable flash of an incorrect theme during normal page load.
- Complete keyboard accessibility using native radio semantics with visible focus rings and explicit focus restoration to trigger button on close.
- All components pass WCAG AA contrast ratios ($\ge 4.5:1$ text, $\ge 3:1$ UI controls) in both themes.
- Graceful degradation when `localStorage` is disabled or throws exceptions.

---

## 8. Verification Plan

The implementation must pass all 19 verification test scenarios:

1. **Fresh Visitor Test**: Clear `localStorage` $\rightarrow$ Page loads in Light Theme (`data-theme="light"`).
2. **Select Light**: Select the Light radio option $\rightarrow$ Light active; reload page $\rightarrow$ Light persists.
3. **Select Dark**: Select the Dark radio option $\rightarrow$ Dark active; reload page $\rightarrow$ Dark persists.
4. **Select System (OS Light)**: Set OS to Light, select System $\rightarrow$ Site renders Light.
5. **Select System (OS Dark)**: Set OS to Dark, select System $\rightarrow$ Site renders Dark.
6. **Dynamic OS Switch (System Active)**: Select System; toggle OS Light $\leftrightarrow$ Dark $\rightarrow$ Site updates dynamically.
7. **Dynamic OS Switch (Light Active)**: Select Light; toggle OS to Dark $\rightarrow$ Site remains Light.
8. **Dynamic OS Switch (Dark Active)**: Select Dark; toggle OS to Light $\rightarrow$ Site remains Dark.
9. **Corrupted Preference Fallback**: Set `localStorage.setItem('theme-preference', 'invalid_value')` $\rightarrow$ Page safely falls back to Light.
10. **Storage Exception Test**: Block/disable `localStorage` $\rightarrow$ Page loads without errors, theme selector functions for current session.
11. **FOUC Test**: Throttle CPU/network and reload repeatedly in Dark/Light modes $\rightarrow$ No observable flash of an incorrect theme during normal page load.
12. **Keyboard Navigation Test**: Tab to trigger, activate with `Enter`/`Space` to open popover, verify focus moves to the currently checked radio input, use Arrow keys to move between options and confirm theme updates on selection; `Escape` or trigger re-activation closes popover $\rightarrow$ Focus returns to `#theme-selector-trigger`.
13. **Screen Reader Accessibility Test**: Verify native radio semantics announce the fieldset legend ("Choose theme preference") and the checked/unchecked state of each option. Verify the trigger button's accessible label reflects the current preference.
14. **Dismissal & Focus Test**:
    - **Escape Key**: Open menu popover, press `Escape` $\rightarrow$ Menu closes and focus returns to `#theme-selector-trigger`.
    - **Outside Click**: Open menu popover, click outside the popover surface $\rightarrow$ Popover closes via native light-dismiss; verify resulting focus location/behavior is smooth and acceptable without forcing unwanted focus override.
15. **Mobile Layout & Navigation Test**: Resize viewport to $< 768\text{px}$, open mobile menu $\rightarrow$ Theme selector is visible, accessible, and tap target $\ge 44\times 44\text{px}$.
16. **Reduced Motion Test**: Enable `prefers-reduced-motion: reduce` in browser $\rightarrow$ Theme switching occurs instantaneously without transition animations.
17. **Contrast Verification**: Audit contrast using DevTools for primary text, muted text, form inputs, buttons, and card borders in both Light and Dark modes.
18. **Native Browser UI Adaptation**: Verify scrollbars and form controls automatically adapt native styling via declarative `color-scheme` CSS rules.
19. **Complete Site Visual Audit**: Inspect Hero, Services, Technology Stack, Case Studies, and Contact Form sections in both themes for un-tokenized hard-coded colors.

---

## 9. Risks and Mitigation

| Risk                                            | Severity | Mitigation Strategy                                                                                                                                           |
| :---------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **FOUC / Flash of Incorrect Theme**             | High     | Synchronous `<script>` in `<head>` reads preference and sets `data-theme` prior to initial paint.                                                             |
| **Invalid / Unavailable `localStorage`**        | Medium   | Wrap storage access in `try...catch` blocks with fallback default to `'light'`.                                                                               |
| **OS Preference Overriding Explicit Selection** | Medium   | Media query event listener checks `getPreference() === 'system'` before taking action.                                                                        |
| **Inaccessible Dropdown / Menu**                | High     | Use native HTML radio semantics inside `<fieldset>`; native Popover API provides Escape-to-close and outside-click-to-close natively.                         |
| **Theme-Sensitive Hard-Coded Colors**           | High     | Audit `tokens.css`, `reset.css`, `navigation.css`, `layout.css`, `components.css`, `hero.css`, and `sections.css`. Preserve brand-fixed white-on-teal colors. |
| **Insufficient Secondary Contrast**             | Medium   | Audit all muted text (`--color-text-muted`), borders, and button states against WCAG AA standards ($>4.5:1$).                                                 |
| **Theme Transitions Interfering with Motion**   | Low      | Scope transitions to specific components via `.theme-transitioning` for 300ms without universal `*` selectors, and disable under `prefers-reduced-motion`.    |
| **Mobile Menu/ Navigation Conflicts**           | Medium   | Ensure popover menu handles mobile z-index stacking and responsive positioning inside mobile drawer.                                                          |

---

## 10. Rollback Plan

If critical defects emerge, revert the single, dedicated theme selector Git commit:

```bash
git revert <commit-hash>
```

---

## 11. Estimated Timeline

| Phase                                          | Tasks                                                                                    | Duration    |
| :--------------------------------------------- | :--------------------------------------------------------------------------------------- | :---------- |
| **Phase 1: CSS Audit & Token Refactoring**     | Audit all CSS files, replace hard-coded colors with tokens, set up dark theme variables. | 45 mins     |
| **Phase 2: HTML & Pre-Paint Head Script**      | Add head script for FOUC prevention and native radio menu DOM markup.                    | 30 mins     |
| **Phase 3: JS Selector Logic & Accessibility** | Implement radio navigation, focus restoration, ARIA state updates, and storage logic.    | 45 mins     |
| **Phase 4: System Preference Listener**        | Bind dynamic media query listeners conditioned on `system` preference.                   | 15 mins     |
| **Phase 5: Comprehensive QA & Verification**   | Execute full 19-step verification suite across themes, devices, and accessibility tools. | 45 mins     |
| **Total Duration**                             |                                                                                          | **3 Hours** |

---

## 12. Implementation Decision Summary

### Preference Precedence Summary

$$\text{No Stored Preference} \longrightarrow \mathbf{Light}$$
$$\text{Explicit Stored Preference: } \mathbf{light} \longrightarrow \mathbf{Light} \quad (\text{Ignores OS})$$
$$\text{Explicit Stored Preference: } \mathbf{dark} \longrightarrow \mathbf{Dark} \quad (\text{Ignores OS})$$
$$\text{Explicit Stored Preference: } \mathbf{system} \longrightarrow \mathbf{OS\ Preference\ (Dynamic\ Light/Dark)}$$

This architecture ensures total clarity between **User Preference** (`light` | `dark` | `system`), **Initial Theme Bootstrapping** (pre-paint head script), **Interactive Theme Selection** (native radio popover menu control with focus restoration), and **System Preference Synchronization** (dynamic media query listener).

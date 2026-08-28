# Cloudflare Pages Deployment Implementation Plan

## Table of Contents

<details>

   <summary>Contents</summary>

1. [1. Executive Summary](#1-executive-summary)
1. [2. Background](#2-background)
1. [3. Goals and Non-Goals](#3-goals-and-non-goals)
   1. [Goals](#goals)
   1. [Non-Goals](#non-goals)
1. [4. Prerequisites](#4-prerequisites)
1. [5. Architecture & Build Configuration](#5-architecture--build-configuration)
   1. [Cloudflare Pages Settings](#cloudflare-pages-settings)
   1. [Build Pipeline Flow](#build-pipeline-flow)
1. [6. Domain Routing & Canonical Strategy](#6-domain-routing--canonical-strategy)
   1. [Cloudflare Custom Domain Configuration](#cloudflare-custom-domain-configuration)
1. [7. Caching & Header Strategy](#7-caching--header-strategy)
   1. [Header Configuration (`public/_headers`)](#header-configuration-publicheaders)
1. [8. Pre-Deployment Quality Gate](#8-pre-deployment-quality-gate)
1. [9. Procedure](#9-procedure)
   1. [Step 1: Local Pre-Deployment Gate Check](#step-1-local-pre-deployment-gate-check)
   1. [Step 2: Repository State Audit & Git Commit](#step-2-repository-state-audit--git-commit)
   1. [Step 3: Push to GitHub Organization](#step-3-push-to-github-organization)
   1. [Step 4: Cloudflare Pages Integration](#step-4-cloudflare-pages-integration)
   1. [Step 5: Custom Domain & Redirect Configuration](#step-5-custom-domain--redirect-configuration)
1. [10. Success Criteria](#10-success-criteria)
1. [11. Verification Plan](#11-verification-plan)
   1. [Automated Checks](#automated-checks)
   1. [Manual QA & Live Network Verification](#manual-qa--live-network-verification)
1. [12. Risks and Mitigation](#12-risks-and-mitigation)
1. [13. Rollback Plan](#13-rollback-plan)
1. [14. Estimated Timeline](#14-estimated-timeline)

</details>

---

## 1. Executive Summary

This document defines the production deployment plan for publishing the **JindaSoft Consulting Website** to **Cloudflare Pages**.

Following the completion of the TypeScript and Vite toolchain migration, this deployment plan explicitly establishes Vite's build pipeline (`npm run build` targeting `dist`) as the single source of truth for Cloudflare Pages builds. It details repository initialization under the **JindaSoft-Consulting** GitHub organization, deployment gates, canonical domain routing (`jindasoftconsulting.com` with apex redirect for `www`), asset caching strategy via `public/_headers`, and step-by-step verification procedures.

---

## 2. Background

The JindaSoft Consulting website is a client-side application built with HTML5, CSS, and TypeScript, bundled using **Vite**.

Rather than serving raw root static files, Cloudflare Pages acts as an automated CI/CD environment that executes the Vite production compilation upon every push to `main`, publishing the generated artifacts from the `dist/` output directory to Cloudflare's global edge network.

---

## 3. Goals and Non-Goals

### Goals

- **Vite Build Pipeline Integration**: Configure Cloudflare Pages to build the application with `npm run build` using Node.js 20 and serve the compiled `dist/` directory.
- **GitHub Organization Deployment**: Push local code to a newly created public GitHub repository under `JindaSoft-Consulting/jindasoft-consulting-website`.
- **Enforce Pre-Deployment Quality Gates**: Require local type checking, production build, and preview QA to pass before pushing deployment commits to `main`.
- **Apex Domain Canonicalization**: Bind `jindasoftconsulting.com` as the canonical domain and configure automatic redirect rules for `www.jindasoftconsulting.com`.
- **Optimal Edge Caching**: Implement `_headers` configuration in `public/_headers` (copied to `dist/_headers`) to deliver aggressive caching for fingerprinted assets and zero-cache for `index.html`.

### Non-Goals

- Raw root directory (`/`) deployment without running the Vite build.
- Moving domain registration away from the existing domain registrar (only DNS nameservers or CNAME records will be managed via Cloudflare).
- Configuring server-side dynamic renderers or serverless Workers functions (the application is completely static client-side).

---

## 4. Prerequisites

Before initiating the deployment procedure, verify that the following prerequisites are met:

1. **GitHub CLI (`gh`)**: Installed and authenticated with permissions to create repositories in the `JindaSoft-Consulting` organization.
2. **Repository Visibility Decision**: The repository is intentionally public. Ensure no API keys, credentials, `.env` files, or confidential data are tracked.
3. **Cloudflare Account Access**: Active Cloudflare account with administrative access.
4. **Domain Active in Cloudflare**: `jindasoftconsulting.com` is added to the Cloudflare account with active DNS management.
5. **Local Toolchain**: Node.js v20+ and `npm` installed locally.
6. **Local Quality Verification**:
   - `npm run type-check` passes cleanly with zero errors.
   - `npm run build` compiles clean production artifacts into `dist/`.
   - Local browser QA against `npm run preview` server passes all functional checks.

---

## 5. Architecture & Build Configuration

> **Authoritative Deployment Rule**:
> The website is deployed strictly using the Vite production build pipeline. Cloudflare Pages **must** run `npm run build` and deploy the generated `dist/` directory. The repository root is **not** the production artifact directory.

### Cloudflare Pages Settings

| Configuration Option       | Production Value  | Note                                                                                      |
| :------------------------- | :---------------- | :---------------------------------------------------------------------------------------- |
| **Framework Preset**       | `None`            | Cloudflare has no standalone Vite preset; build settings are entered manually (see below) |
| **Build Command**          | `npm run build`   | Runs `tsc -b && vite build`                                                               |
| **Build Output Directory** | `dist`            | Generated bundle folder                                                                   |
| **Production Branch**      | `main`            | Production branch                                                                         |
| **Environment Variable**   | `NODE_VERSION=20` | Guarantees modern Node runtime                                                            |

> **Note on Framework Preset**: Cloudflare's preset list does not include a standalone Vite option — presets like "React (Vite)" or "Vue" are framework-specific bundles. For a vanilla HTML/TypeScript/Vite project, select **None** and specify the build command and output directory manually. The preset is cosmetic; it only pre-populates those two fields.

### Build Pipeline Flow

```text
GitHub (`main` branch)
    │
    │ push to main
    ▼
Cloudflare Pages CI/CD
    │
    ├── Node.js 20 environment
    ├── npm ci
    ├── npm run build (tsc -b && vite build)
    │
    ▼
dist/ Directory Generated
    ├── index.html
    ├── assets/site-[hash].js
    ├── assets/style-[hash].css
    ├── assets/images...
    └── _headers
    │
    ▼
Cloudflare Global Edge Network
    │
    ├── https://jindasoftconsulting.com/ (Canonical)
    └── https://www.jindasoftconsulting.com/* (Redirect -> Apex)
```

---

## 6. Domain Routing & Canonical Strategy

To avoid duplicate content indexing and ensure a consistent URL structure, the site enforces a strict apex-canonical domain rule:

- **Canonical URL**: `https://jindasoftconsulting.com/`
- **Redirect Rule**: Redirect every request from `www.jindasoftconsulting.com` to the equivalent path on `https://jindasoftconsulting.com/` with HTTP 301.

### Cloudflare Custom Domain Configuration

1. Configure both the apex (`jindasoftconsulting.com`) and `www` hostnames as required for Cloudflare routing.
2. Implement the `www` $\rightarrow$ apex redirect using a Cloudflare Redirect Rule (or Page Rule):
   - **Requirement**: Any incoming request to `www.jindasoftconsulting.com/*` must return HTTP `301 Permanent Redirect` pointing to `https://jindasoftconsulting.com/*` preserving URI path and query string.

---

## 7. Caching & Header Strategy

Vite compiles JavaScript, CSS, and static sub-assets with content hashing in filenames (e.g. `assets/main-C1a2B3x4.js`). This allows aggressive immutable browser caching for assets, paired with strict revalidation for `index.html`.

### Header Configuration (`public/_headers`)

Create a `_headers` file in `public/_headers` so Vite copies it directly into `dist/_headers` during build:

```text
# HTML Entrypoint: Require immediate revalidation
/index.html
  Cache-Control: public, max-age=0, must-revalidate

# Hashed Vite Build Assets: Immutable 1-year caching
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Security Headers (Global)
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
```

---

## 8. Pre-Deployment Quality Gate

**No deployment commit shall be pushed to `main` until the local deployment gate has passed.**

```text
Local Code Change
       │
       ▼
npm run type-check   (Automated Type Audit)
       │ (Pass)
       ▼
npm run build        (Automated Production Build)
       │ (Pass)
       ▼
npm run preview      (Local Preview Server)
       │
       ▼
Functional QA Pass   (Manual Browser Check)
       │ (Approved)
       ▼
git commit           (Staged Commit)
       │
       ▼
git push origin main (Triggers Cloudflare Deployment)
       │
       ▼
Live Site Verification
```

---

## 9. Procedure

### Step 1: Local Pre-Deployment Gate Check

1. Run automated compilation checks in terminal:

   ```sh
   # Verify TypeScript types compile cleanly
   npm run type-check

   # Build production distribution bundle
   npm run build
   ```

2. Start local preview server for manual QA:
   ```sh
   npm run preview
   ```
3. Perform browser QA against local preview URL (`http://localhost:4173`).

### Step 2: Repository State Audit & Git Commit

1. Inspect local workspace state prior to staging:

   ```sh
   git status
   ```

   _Verify that no `.env` files, credentials, or `node_modules` are tracked._

2. Stage files and create initial commit:

   ```sh
   # Stage code files, configs, and public/_headers
   git add .

   # Create formal initial commit
   git commit
   ```

### Step 3: Push to GitHub Organization

Create remote repository under `JindaSoft-Consulting` organization and push `main`:

```sh
# 1. Create remote public repository under JindaSoft-Consulting org using GitHub CLI
gh repo create JindaSoft-Consulting/jindasoft-consulting-website --public --description "Official website for JindaSoft Consulting" --source=. --remote=origin

# 2. Push main branch and set upstream tracking
git push -u origin main
```

### Step 4: Cloudflare Pages Integration

1. Open the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the `JindaSoft-Consulting` GitHub organization and select `jindasoft-consulting-website`.
4. Configure production build settings:
   - **Project Name**: `jindasoft-consulting-website`
   - **Production Branch**: `main`
   - **Framework Preset**: `None`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Environment Variables**:
     - Key: `NODE_VERSION`, Value: `20`
5. Click **Save and Deploy**.

### Step 5: Custom Domain & Redirect Configuration

1. In the Cloudflare Pages project overview, open **Custom domains**.
2. Click **Set up a custom domain** and add `jindasoftconsulting.com`.
3. Add `www.jindasoftconsulting.com` as a secondary domain.
4. In Cloudflare DNS / Rules, configure a Redirect Rule so any request to `www.jindasoftconsulting.com` issues an HTTP `301 Permanent Redirect` to the corresponding path on `https://jindasoftconsulting.com/`.

---

## 10. Success Criteria

- Clean CI/CD build execution in Cloudflare Pages via `npm run build` outputting `dist`.
- GitHub repository hosted under `JindaSoft-Consulting/jindasoft-consulting-website`.
- Automatic production deployments triggered on every push to `main`.
- `https://jindasoftconsulting.com/` loads over HTTPS with active SSL certificate.
- `https://www.jindasoftconsulting.com/` redirects cleanly with HTTP 301 to apex domain.
- `public/_headers` correctly sets immutable cache-control headers on `dist/assets/*` files.

---

## 11. Verification Plan

### Automated Checks

- **TypeScript Type Check**: `npm run type-check` returns exit code 0.
- **Vite Production Build**: `npm run build` generates `dist/index.html` and `dist/assets/` without warnings or bundle errors.
- **Cloudflare Pages Build Logs**: Confirm build output log states `Finished: Success`.

### Manual QA & Live Network Verification

1. **Live SSL & Domain**: Verify `https://jindasoftconsulting.com` presents valid Cloudflare SSL certificate.
2. **Canonical Redirect**: Request `http://jindasoftconsulting.com`, `http://www.jindasoftconsulting.com`, and `https://www.jindasoftconsulting.com` via `curl -I` and confirm 301 redirects to `https://jindasoftconsulting.com/`.
3. **Cache Headers**: Inspect response headers in Developer Tools Network tab:
   - `index.html` -> `Cache-Control: public, max-age=0, must-revalidate`
   - `assets/*.js` -> `Cache-Control: public, max-age=31536000, immutable`
4. **Interactive Features QA**: Verify scrollspy, theme toggle, mobile navigation, and contact form AJAX submissions on live site.

---

## 12. Risks and Mitigation

| Risk                                          | Likelihood | Impact | Mitigation                                                                  |
| :-------------------------------------------- | :--------- | :----- | :-------------------------------------------------------------------------- |
| **Outdated Node version in Cloudflare Pages** | Low        | High   | Explicitly set `NODE_VERSION=20` in Cloudflare Pages environment variables. |
| **Missing build output files**                | Low        | High   | Enforce local `npm run build` verification gate prior to git push.          |
| **DNS Propagation Lag**                       | Medium     | Low    | Use Cloudflare DNS for instant record updates and low TTL propagation.      |
| **Wrong asset paths in dist**                 | Low        | Medium | Ensure Vite `base` setting is `/` (default) in `vite.config.ts`.            |

---

## 13. Rollback Plan

If a production deployment encounters issues:

1. **Instant Cloudflare Rollback**: Go to Cloudflare Dashboard > **Workers & Pages** > `jindasoft-consulting-website` > **Deployments**. Locate the previous successful deployment and click **Rollback to this deployment**.
2. **Git Revert**: Revert breaking commit on `main` branch locally, verify quality gate, and push to GitHub:
   ```sh
   git revert HEAD
   git push origin main
   ```

---

## 14. Estimated Timeline

| Task                                                               |       Duration |
| :----------------------------------------------------------------- | -------------: |
| Local Pre-Deployment Gate (`type-check`, `build`, `preview`)       |      5 minutes |
| Repository status audit, git staging & commit                      |      5 minutes |
| GitHub repository creation (`JindaSoft-Consulting`) & initial push |      5 minutes |
| Cloudflare Pages project setup & initial production build          |      5 minutes |
| Custom domain (`jindasoftconsulting.com`) & `www` redirect setup   |     10 minutes |
| Final network & live QA verification                               |      5 minutes |
| **Total Estimated Time**                                           | **35 minutes** |

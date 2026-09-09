# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers evaluating Andrew for a full-time, intern, or junior developer role. Situation: rapid screening alongside many portfolios. Job: assess capability fit from real projects and stack, then start contact via email and resume.

No secondary audience confirmed.

## Product Purpose

Personal portfolio for Andrew that proves employability through shipped work. It presents who he is, five selected projects with full story, working stack, and contact paths. Success means a recruiter understands fit quickly and acts: emails andrewrennn@gmail.com, opens a GitHub repo, or pulls the resume.

## Positioning

Breadth plus craft, equally: an end-to-end builder across Laravel, React/TypeScript, and native Android who also obsesses over fast, accessible, motion-rich frontend detail. A neighboring portfolio could claim one side; this one proves both with repos spanning thrift e-commerce, HR/payroll, storefront, billing, and Android push-to-talk.

## Operating Context

Single-page scroll portfolio with numbered sections: About (01), Work (02), Skills (03), Contact (04). Anchor navbar with theme toggle and mobile drawer, resume link, Lenis smooth scroll with GSAP pinned horizontal project sections, light/dark via class, reduced-motion fallback to stacked layout. Used on desktop and mobile web in a hiring-review context.

## Capabilities and Constraints

Confirmed functionality: hero with name, rotating roles, intro, Get-in-touch mailto, open-to-work status and GitHub/LinkedIn/email links; five featured projects each with overview, tech stack, features, tags, year, role, repo link, and Safari/iPhone mock; skills grouped as Languages, Frameworks & Libraries, Tools & Platforms; contact footer with email CTA, socials, copyright, back-to-top; light/dark theme toggle.

Technical constraints: existing static Vite React 19 + TypeScript + Tailwind CSS 4 SPA with client-side anchor navigation; skill icons loaded from skillicons.dev and simpleicons CDNs (network dependency); resume linked at `/resume.pdf` in UI but no file exists in repo.

Explicitly undecided: freelance or client positioning, target role titles and seniority, availability start date, location and remote policy.

## Brand Commitments

Name: Andrew. Title: `Andrew //A_ — Developer`. Logo mark: `//A_`. Voice: direct, craft-focused, people-aware ("fast, accessible, and detail-obsessed"). Confirmed binding accent `#00B8DB`, existing Raleway Variable body with mono section kickers, profile assets `/tree.png` and `/man.png`, contact `andrewrennn@gmail.com`, GitHub `github.com/dreamerrri`, open-to-work status.

## Evidence on Hand

Real: five projects with descriptions, tags, years, roles, repo URLs, and images defined in `src/components/ProjectShowcase.tsx`; public images `akisthrift.png`, `logify.png`, `frascio.png`, `invoicify.png`, `telemetry.jpg`; profile images `tree.png`, `man.png`; contact email and GitHub above.

Absences future work must not fabricate: `resume.pdf` is linked but missing from `public/`; LinkedIn URL is generic `linkedin.com/`; no testimonials, clients, metrics, case studies, pricing, or deployment claims confirmed.

## Product Principles

1. Proof over claims: every capability points to a repo, stack, or feature list.
2. Speed to judgment: a recruiter can assess fit in under a minute before scrolling deep.
3. Craft is the credential: performance, accessibility, and interaction detail carry hiring signal.
4. Breadth without dilution: each project tells its full loop from overview to tech to features.

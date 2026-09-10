---
target: individual project section cards
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\Andrew\\Desktop\\renzpf\\src\\components\\ProjectShowcase.tsx"
target_fingerprint: "sha256:339f296df458f25c705a4d82fbd5377caf6d607c4871a36cf40717cbd7fa792e"
target_path: "C:\\Users\\Andrew\\Desktop\\renzpf\\src\\components\\ProjectShowcase.tsx"
timestamp: 2026-09-09T02-26-50Z
slug: src-components-projectshowcase-tsx
closed: true
---
Method: dual-agent (A: design-review · B: detector) — executed degraded single-context, see report header.

# Critique — Individual Project Section Cards (`src/components/ProjectShowcase.tsx`)

## Design Health Score — 22/32 (Acceptable)

Experience surface; heuristics 7 and 10 scored n/a.

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Progress `01 / 04` + cyan hairline exist but `hidden sm:block`, no `role=progressbar`, no live region |
| 2 | Match System / Real World | 2 | `Visit live site` links to GitHub repo; Safari URL pill shows `github.com/...` |
| 3 | User Control and Freedom | 2 | Pinned scrub traps 5 full-svh chapters; no skip, arrows, or dots |
| 4 | Consistency and Standards | 3 | Link labels and alt text diverge mobile vs desktop |
| 5 | Error Prevention | 3 | External links safe (`noopener`, labels) but no guard for dead image/repo |
| 6 | Recognition Rather Than Recall | 4 | Stack, features, stats all visible; no memory bridge |
| 7 | Flexibility and Efficiency | n/a | Experience showcase — no accelerators expected |
| 8 | Aesthetic and Minimalist Design | 3 | Clean tonal cards, but 4 cards × 5 projects is dense for rapid scan |
| 9 | Error Recovery | 3 | No error states to recover; link safety only |
| 10 | Help and Documentation | n/a | Showcase cards need no docs |
| **Total** | | **22/32** | **Acceptable (68.8%)** |

## Design Specificity Verdict

**LLM assessment:** Authored, not interchangeable. The `01–05 / year · role` header, mono cyan tagline + black Raleway title, naked mono tags, `Overview / Technologies / Features` triple, Safari + iPhone chrome, and cursor-tracking BorderGlow form a coherent `Signal in the Grid` world. Category sameness risk is low — few portfolios do pinned horizontal proof tracks with device chrome per project. Missed character: cards underuse proof (no outcome, no year comparison, stats repeat stack words like `React 19`, `Tailwind 4` across 3 projects).

**Deterministic scan:** `impeccable detect --json src/components/ProjectShowcase.tsx` → `[]` clean (exit 0). No mechanical findings to reconcile. Manual review above carries the critique.

**Visual overlays:** No browser automation exposed in this session, no live-server injection attempted. No user-visible overlay exists. Fallback signal is source + token review (`ProjectShowcase.tsx:267-420`, `BorderGlow.tsx`, `safari.tsx`, `iphone.tsx`, `index.css`).

## Overall Impression

Proof-first system with strong craft signals, undermined by one lie (`Visit live site` → GitHub), one tax (5× pinned full-screen chapters for a <60s recruiter scan), and hover-only glow with thin text contrast. Biggest opportunity: make the Featured card scannable in 10 seconds and honest about where its CTA goes.

## What's Working

1. **Proof pairing works.** Featured copy + device mock (`38%` Safari / `130px` iPhone on `lg+`, `16/9` inline image or `110–130px` phone on mobile, `ProjectShowcase.tsx:342-358`) plus Overview/Technologies/Features detail cards matches PRODUCT principle `Breadth without dilution`.
2. **Tonal flat + reactive glow.** `GlowCard` (`ProjectShowcase.tsx:249-265`, `borderRadius 20`, `fillOpacity 0.4/0.45`) keeps rest flat per DESIGN.md Flat-By-Default, glow answers pointer only.
3. **Theme + reduced-motion discipline.** `useIsDark` observer, `ring-1 ring-slate-900/[0.07] dark:ring-0`, Safari `#E5E5E5 / #404040` shell, stacked `flex-col gap-6` fallback (`ProjectShowcase.tsx:548-551,583-587`) preserve function without motion.

## Priority Issues

### [P1] What: `Visit live site` goes to GitHub
**Why it matters:** Recruiter expects product, lands on code. Breaks trust at the hire decision moment and violates PRODUCT `Proof over claims` (repo vs deployed proof conflated). Affects 4/5 browser projects (`PROJECTS` urls all `github.com`, `ProjectShowcase.tsx:54,91,127,165`).
**Fix:** Rename to `View repository` everywhere (Telemetry already does), set Safari `url` pill to short repo path, keep `aria-label ... open repository`. Only claim `Visit live site` when a deployed URL exists; do not fabricate one.
**Suggested command:** /impeccable clarify

### [P1] What: 5 pinned chapters cost the 60-second scan
**Why it matters:** `tl` pins each section with `hold 0.5×viewport + distance + hold` (`ProjectShowcase.tsx:472-532`, `scrub 1.8`). PRODUCT requires fit judgment in under a minute. Forced horizontal scrub with `SCROLL ↓ to explore X details` inverts expectation (vertical gesture → horizontal motion) with no skip, dots, or arrows.
**Fix:** Add visible escape: sticky project jump list or `Skip track` link per chapter, clickable progress dots (`01/04`), keyboard arrows driving `track.scrollBy`. Reduce hold to `0.25×viewport` on first pass.
**Suggested command:** /impeccable harden

### [P1] What: Hover-only glow, thin cyan text, empty alts
**Why it matters:** `BorderGlow` opacity driven by `isHovered/sweepActive` only (`BorderGlow.tsx:172-178`); outer card `div` not focusable, inner links only `hover:opacity-80` (`ProjectShowcase.tsx:327`). Mono tags `text-[#007A94] dark:text-[#00B8DB]/80` at 12px and stat values `text-[#00B8DB]` on `#131a22` are below 4.5:1 in dark. Safari/iPhone `alt=""` (`safari.tsx:79-83`, `iphone.tsx:82-86`) hides proof from SR; mobile featured img has `alt preview` — inconsistent.
**Fix:** Add `:focus-visible` cyan outline to card links + make `GlowCard` show glow on `:focus-within`; bump dark tags to full `#00B8DB` at 13px+ or `#4FD6F0`; give Safari/iPhone meaningful `alt` (`${title} — desktop storefront screenshot`); add `role=progressbar aria-valuenow` to hairline bar.
**Suggested command:** /impeccable audit

### [P2] What: Progress + header collapse on mobile
**Why it matters:** Counter + bar `hidden sm:block` (`ProjectShowcase.tsx:563`), so phone recruiters (Casey) get no position signal across 4 cards. `h2.truncate` (`ProjectShowcase.tsx:558`) risks clipping; `md:mt-auto` pins stats/bullets to bottom leaving large void when body is one line (Frascio Technologies, `ProjectShowcase.tsx:142-144`).
**Fix:** Keep compact counter on mobile (`01/04` mono 11px, no bar or 64px bar), remove `truncate` allow wrap, set `min-h` on body block so stat row aligns without cavernous gap.
**Suggested command:** /impeccable layout

## Persona Red Flags

**Jordan (First-Timer, non-technical hiring manager):** Jargon wall — `Pest`, `Inertia.js v3`, `DomPDF`, `TanStack`, `UDP :50005`, `Opus WebRTC` with no inline gloss. `Visit live site` → GitHub confirms fear of clicking wrong thing. No 5-second first action inside a pinned chapter except scroll harder.
**Sam (Keyboard + SR, low vision):** Tab order enters 4 cards × links with no skip; no focus ring on glow; cyan-on-dark tag/stat text low contrast; proof images silent (`alt=""`); progress `scaleX` + counter `textContent` not announced.
**Casey (Distracted mobile, one thumb, 3G):** 5× `h-svh` pins + `85vw/78vw` cards demand long vertical drag for horizontal payoff; top-positioned progress hidden; touch targets are small mono links (`text-xs`, no 44px pad); 5 full screenshots + Lenis + GSAP heavy on slow connection.
**Morgan (Recruiter rapid-screener, project-specific from PRODUCT.md):** Needs fit in <60s across Laravel/React/Android breadth. Current path forces ~5 pins × ~200vh each before Skills. No at-a-glance matrix (stack/year/role) — must open each track to compare. Will skip to Contact without seeing Telemetry (last).

## Minor Observations

- `glowColor="188 90 58"` vs `colors [#00B8DB,#2dd4bf,#38bdf8]` obscure: parses to cyan via `parseHSL` but reads as warm beige; use `#00B8DB` or `188 90% 58%` literal.
- Tag list `gap-x-3 gap-y-1` borderless mono correct per DESIGN.md, but light `#007A94` vs dark `#00B8DB/80` hue shift breaks One Voice continuity.
- Detail header repeats `project.title` truncated right-aligned (`ProjectShowcase.tsx:388`) competing with card kicker; drop it, keep kicker only.
- Edge dim `opacity 0.55 scale 0.94` (`ProjectShowcase.tsx:504-510`) + `Reveal` fade may double-dim entering cards; verify combined opacity never drops body below 4.5:1.
- Year strings `2024-2025` vs `2024` vs `2026` inconsistent granularity; pick year or range consistently.

## Questions to Consider

- What if the Featured card alone had to hire you — what would it keep if detail cards disappeared?
- Does vertical-scroll-to-horizontal-pan earn its cost, or would a stacked Featured + tabbed details scan faster?
- What would a confident proof version show — outcome first, stack second — instead of stack-as-stats?

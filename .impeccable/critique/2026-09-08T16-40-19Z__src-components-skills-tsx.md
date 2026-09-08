---
target: skills section
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\Andrew\\Desktop\\renzpf\\src\\components\\Skills.tsx"
target_fingerprint: "sha256:d95608d9aa1e857ff4d7754b5e1f9be1ebdbbf3befa9faac2ff4ee5704a56f45"
target_path: "C:\\Users\\Andrew\\Desktop\\renzpf\\src\\components\\Skills.tsx"
timestamp: 2026-09-08T16-40-19Z
slug: src-components-skills-tsx
---
# Critique — src/components/Skills.tsx (Skills 03)

Method: dual-agent unavailable — sequential single-context assessments (A then B).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Reveal stagger communicates arrival; top mask fade can hide content edge on scroll-in |
| 2 | Match System / Real World | 2 | Cryptic shorts (Jc, Al, Lk, EJS) + vague "Pulled from my public repos." with no repo link |
| 3 | User Control and Freedom | 3 | Anchor section, no traps; nothing to undo |
| 4 | Consistency and Standards | 2 | Icon tiles vs mono-short tiles vary in weight; black CDN icons break dark-mode adaptive rule; cursor-pointer vs cursor:default conflict |
| 5 | Error Prevention | 3 | Display-only is low-risk, but CDN icons have no onerror fallback |
| 6 | Recognition Rather Than Recall | 2 | Initials require recall; no tooltips, proficiency, or project context across 24 equal tiles |
| 7 | Flexibility and Efficiency | n/a | Display-only cloud; no expert path applicable (Persuade surface) |
| 8 | Aesthetic and Minimalist Design | 3 | Clean one-voice flat system, but 24 equal-weight tiles read monotonous after Work chapters |
| 9 | Error Recovery | 2 | Broken CDN image leaves a broken tile; no fallback UI |
| 10 | Help and Documentation | n/a | No help needed on display section (Persuade surface) |
| **Total** | | **20/32** | **Acceptable (62.5%)** |

## Design Specificity Verdict

**LLM assessment**: Coherent with "Signal in the Grid" — cyan mono kickers, 10px card tiles, flat-by-default with glare-on-hover all match DESIGN.md. But the composition itself is category-interchangeable: any developer portfolio could ship this exact tile cloud unchanged. The one authored line ("Pulled from my public repos.") makes a proof promise the UI does not keep — no repo links, no project cross-reference, no signal of depth vs familiarity. Missed opportunity to express breadth-plus-craft (e.g. which skills shipped which of the five projects).

**Deterministic scan**: 1 advisory finding in `src/components/Skills.tsx:105` — `design-system-font-size`: `text-[0.6rem]` initials sit off the DESIGN.md type ramp. True positive at advisory severity; the 0.6rem micro-badge is a deliberate fit-inside-24px choice, but it is an undocumented step. Fix by reusing the 0.75rem label size or documenting a badge-micro size.

**Visual overlays**: No browser visualization — no browser automation tool is exposed in this session, so no overlay was injected and no console findings exist. Assessment rests on source inspection + CLI scan.

## Overall Impression

Disciplined tokens, forgettable story. The section looks like the system but does not advance the hiring argument: a recruiter sees 24 names and learns nothing about fit. Biggest opportunity: connect each skill to proof (repos/projects) or at least to weight.

## What's Working

1. **Token discipline.** 10px tiles, card/border vars, cyan kickers (`03.`, group labels), Raleway + mono split all honor DESIGN.md. Flat at rest, glare only on hover.
2. **Accessible names done right.** Every CDN icon has `alt="<name> logo"`, `loading="lazy"`, explicit 24px size, `draggable={false}`; short fallbacks are `aria-hidden` so SR hears the real name.
3. **Section rhythm preserved.** `max-w-6xl`, `pt-24/pb-24`, staggered Reveal delays keep Skills breathing at the same pace as About/Work/Contact.

## Priority Issues

- **[P1] Dark-mode CDN icons can vanish + no image fallback**
  **Why it matters**: `railway/black` and `inertia` simpleicons are near-black badges served as `<img>` with no `onError` handling. On `#131a22` cards they approach invisible; if skillicons.dev/simpleicons is blocked, the tile shows a broken image. A hiring manager on dark mode literally cannot see part of the stack.
  **Fix**: Self-host light/dark icon variants or add `onError` fallback to the mono-short badge; add a `filter: invert()` or theme-aware src for black marks. Test all 19 CDN tiles in both themes.
  **Suggested command**: `/impeccable harden`

- **[P1] Skills claim proof they do not show**
  **Why it matters**: PRODUCT principle #1 is "Proof over claims" and the subcopy says "Pulled from my public repos" — but there is not one repo link, project tag, or depth signal in the section. A recruiter screening in under a minute cannot tell React-expert from React-touched.
  **Fix**: Link each tile or each group to its evidence (e.g. small repo/project refs, or at minimum link the subcopy to GitHub `github.com/dreamerrri`). Do not invent proficiency percentages; use real repo/project mapping from `ProjectShowcase.tsx`.
  **Suggested command**: `/impeccable clarify`

- **[P1] Group titles are not headings; tiles have no keyboard path**
  **Why it matters**: Group labels (`Languages`, `Frameworks & Libraries`, `Tools & Platforms`) are `<p>` elements — screen-reader users lose section navigation. `GlareHover` is a `div` with mouse-only handlers and no `:focus-visible` equivalent, violating the system's own "every glow has a focus ring" rule. `cursor-pointer` class + `cursor: default` style conflict signals uncertainty about interactivity.
  **Fix**: Promote group labels to `<h3>` (keep mono styling), make the glare trigger `:focus-visible` too or mark tiles `tabIndex={-1}` + `aria-hidden` as pure display, and resolve the cursor to `default`.
  **Suggested command**: `/impeccable harden`

- **[P2] 10-item wall with equal weight; energy valley after Work**
  **Why it matters**: Tools (10) + Frameworks (8) exceed the ≤4-per-group chunking guideline; 24 identical tiles force a linear scan with no entry point. Coming after five full-viewport pinned chapters, this static wall drops momentum right before Contact.
  **Fix**: Differentiate weight (e.g. primary vs supporting), break Tools into two rows/groups, or add a lead-in summary line naming the hireable core. Keep `flex-wrap gap-3` but give the eye a starting point.
  **Suggested command**: `/impeccable layout`

## Persona Red Flags

**Jordan (Confused First-Timer / non-technical screener)**: Stalls on `Jc`, `Al`, `Lk`, `EJS` mono badges — no expansion, no tooltip. "Inertia.js", "LiveKit", "Jetpack Compose" appear without one-line context. Vague "Pulled from my public repos." with no link leaves Jordan unsure what was actually used vs listed.

**Sam (Accessibility-Dependent)**: Tab walk hits zero stops in the tile grid (mouse-only glare, no focus); heading rotor shows "What I work with" (h2) with no h3 children; top `skills-band-mask` 64px fade can wash out focused content scrolling in; black-on-dark Railway/Inertia marks fail contrast.

**Casey (Distracted Mobile)**: 24 `whitespace-nowrap` tiles (`Tailwind CSS`, `Jetpack Compose`) squeeze a 360px viewport into long ragged wraps; no summary above the fold — Casey must scroll the entire wall to reach Contact. CDN icons add ~19 network requests on a hiring-manager's phone with no placeholder.

## Minor Observations

- `text-[0.6rem]` badge size is off-ramp (detector advisory) — document or consolidate to 0.75rem label.
- `GlareHover` bakes `cursor-pointer` into its base class, forcing every consumer to override for display use; move cursor into props.
- Header block (`pb-8`) and group block are separate `<section>`s with a visual disconnect between "What I work with" and the first group; consider one section with tighter `mt`.
- `whitespace-nowrap` prevents tile-label wrapping but risks overflow on narrow screens for long names; allow wrap or smaller gap on mobile.
- No `prefers-reduced-motion` issue — `Reveal` already short-circuits to visible. Good.

## Questions to Consider

- What if the section named its hireable core in one line instead of showing 24 equals?
- Does a recruiter need all 24 skills, or the 8 that map to the five shipped projects?
- What would a confident version look like — one that points every claim at a repo?

---
target: hero section
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\Andrew\\Desktop\\renzpf\\src\\components\\UglyHero.tsx"
target_fingerprint: "sha256:92b3f3d8d7404bb8816d768a2557e91eabd8449485c2eb68de08f2a4fbbcc1dc"
target_path: "C:\\Users\\Andrew\\Desktop\\renzpf\\src\\components\\UglyHero.tsx"
timestamp: 2026-09-08T16-09-18Z
slug: src-components-uglyhero-tsx
---
Method: degraded single-context (see chat header for banner)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Typing name starts blank (400ms + 150ms/char); rotating role has no pause/progress; draggable badge + hidden UFO give no affordance |
| 2 | Match System / Real World | 2 | `Chill Guy` in rotating roles + generic intro mismatches recruiter hiring language; proof (stack, repos) absent from hero |
| 3 | User Control and Freedom | 3 | No traps, but rotating text cannot pause/skip and dragged sticker always snaps back |
| 4 | Consistency and Standards | 2 | `Get in touch` uses `button onClick=mailto` instead of link — breaks middle-click/copy/open; conflicts with DESIGN.md link standards |
| 5 | Error Prevention | 2 | Generic `linkedin.com/` link and missing `/resume.pdf` are clickable dead-ends with no guardrail; mailto has no fallback |
| 6 | Recognition Rather Than Recall | 2 | Drag-to-reveal sticker and parked UFO pet are undiscoverable; no label hints interaction |
| 7 | Flexibility and Efficiency | n/a | Persuade surface — no power-user accelerators expected |
| 8 | Aesthetic and Minimalist Design | 3 | One-cyan-voice + flat slate holds; double typing motion + CursorGrid + WebGL rim + parallax compete for attention |
| 9 | Error Recovery | 2 | No inline recovery for failed mailto / dead social / missing resume |
| 10 | Help and Documentation | n/a | Persuade surface — no docs expected |
| **Total** | | **18/32** | **Acceptable (56%)** |

## Design Specificity Verdict

**LLM assessment**: Coherent with "Signal in the Grid" — mono `01.` kicker, Raleway black `Andrew.` with cyan period, single `#00B8DB` voice, flat slate, specular CTA. That part feels authored. But the hero's *content* is category-interchangeable: "fast, accessible, detail-obsessed" + rotating generic titles could belong to any frontend portfolio. Missed product character: no breadth signal (Laravel/React/Android), no repo/stack proof, no recruiter-oriented scannability. The draggable sticker + parked UFO pet + cursor grid add playfulness, but for a rapid-screening hiring context they read as hidden toys rather than craft credentials. Filename `UglyHero.tsx` also signals incumbent/temporary identity.

**Deterministic scan**: `impeccable detect --json src/components/UglyHero.tsx` returned `[]` — 0 findings, exit clean. It caught none of the semantic issues above (tone, missing resume CTA, button-as-link, motion a11y), which is expected: the detector is mechanical, not a copy/strategy reviewer. No false positives to flag — just limited recall on Persuade-copy and interaction-semantics issues.

**Visual overlays**: No browser overlay available for this run — no browser automation tool is exposed in this session, so live injection (`live-server` + `detect.js`) was skipped. Fallback signal is source inspection + detector CLI only. No user-visible overlay was created.

## Overall Impression

Structure and tokens are right; story and actionability are not. A recruiter sees a name, a spinning title ending in `Chill Guy`, a generic sentence, and one mailto button — then must scroll to learn fit. Biggest opportunity: make the hero answer "what stack, what proof, how to contact" in under 10 seconds without adding clutter.

## What's Working

1. **One-voice hierarchy holds** — `src/components/UglyHero.tsx:43-58`: mono cyan `01.` kicker, Raleway 900 `Andrew.` with typed `_` + cyan period, cyan rotating role. Matches DESIGN.md Numbers Talk / One Family rules and scans instantly.
2. **Flat-by-default with reactive CTA** — `SpecularButton` specular rim + flat hero surface respects the Tonal Floor rule; hover answers interaction instead of resting gradients. No gradient-soup hero blob.
3. **Contact strip is scannable** — `UglyHero.tsx:90-122`: `Open to work` + GitHub/LinkedIn/email in one mono row lowers the cost of the primary hiring action.

## Priority Issues

- **[P1] No fast path to proof or resume**
  - **Why it matters**: PRODUCT.md success = email, open repo, or pull resume in under a minute. Hero offers only mailto; no resume link, no stack line, no project anchor. Rapid screeners bounce.
  - **Fix**: Add secondary actions in `UglyHero.tsx:80-88`: outline pill `View work → #work` + text link `Resume (PDF)`. Add one mono proof line under intro: e.g. `Laravel · React/TS · Android — 5 shipped projects below`. Do not invent metrics/testimonials.
  - **Suggested command**: `/impeccable clarify`

- **[P1] `Chill Guy` + generic intro breaks hiring tone**
  - **Why it matters**: `ROLES = [... 'Chill Guy']` (`UglyHero.tsx:7`) and "pixel-perfect UI to silky interactions" read as meme/casual in a recruiter screen. Undermines Positioning "breadth plus craft".
  - **Fix**: Replace with role titles tied to proof: `Frontend Developer`, `React/TypeScript UI Engineer`, `Laravel Full-Stack`, `Android (Kotlin)` — or keep 3 max. Rewrite intro to name breadth + craft: who you build for, stack, and what proof follows.
  - **Suggested command**: `/impeccable clarify`

- **[P2] CTA is a button that fakes a link; motion has no accessible equivalent**
  - **Why it matters**: `onClick={() => window.location.href='mailto:...'}` breaks middle-click, copy-link, long-press, SR link announcement. `RotatingRole` (`UglyHero.tsx:9-36`) and `TextType` (`TextType.tsx:15-72`) animate on every load with no `prefers-reduced-motion` guard and no `aria-live`/static fallback — SR users hear partial slices, motion-sensitive users get double animation.
  - **Fix**: Use `<a href="mailto:...">` styled as specular button (or `SpecularButton` rendered as anchor). Add `prefers-reduced-motion` early-return showing full `Andrew` + static role; wrap rotating role in `aria-live="polite"` with pause on hover/focus.
  - **Suggested command**: `/impeccable harden`

- **[P2] Competing motion delays first meaning**
  - **Why it matters**: Name types at 150ms/char after 400ms delay + role types/deletes on independent timers + parallax badge + CursorGrid + WebGL rim. First paint can be near-empty; attention splits between two typewriters.
  - **Fix**: Render `Andrew.` statically (keep blinking cursor as accent only), keep one motion source (role rotator) with reduced-motion static fallback. Tighten `min-h-[1.5em]` to reserve longest-role width to stop layout shift. Defer CursorGrid intensity in hero or lower opacity.
  - **Suggested command**: `/impeccable layout`

## Persona Red Flags

**Jordan (First-Timer / first-glance recruiter)**: Lands on blank-ish H1 during 400ms+ typing delay; first decision ("is this fit?") has no stack or proof above the fold. Icon-only GitHub/LinkedIn links (`size={18}`, `UglyHero.tsx:99-112`) have aria-labels but no visible labels — hesitant clickers skip them. Draggable sticker gives zero hint it drags; hidden UFO never discovered. Will scroll past without context.

**Riley (Stress Tester)**: Clicks generic `https://www.linkedin.com/` — lands on LinkedIn homepage, reads as broken. Clicks Resume in nav — `/resume.pdf` missing from `public/` per PRODUCT.md constraints. Pastes long role string or zooms 200% — `min-h-[1.5em]` role line wraps/shifts layout; full `andrewrennn@gmail.com` string in mono row overflows on 320px. Refresh mid-typing restarts animation from zero.

**Casey (Distracted Mobile User)**: Social icons at 18px with `gap-5` are ~18px tap targets, well under 44x44pt, clustered in one row. `ProfileBadge` root uses `touch-none` + absolute `-inset-2` grab layer (`ProfileBadge.tsx:101,182`) — swipe over the badge cannot scroll. Scroll-mouse cue (`UglyHero.tsx:124-129`) is `hidden md:block` with no animation — no mobile progress signal. WebGL `SpecularButton` + OGL `pointermove` listener cost on low-end devices for a single mailto.

## Minor Observations

- Double gutter: `App.tsx:69` wrapper `px-6 pt-32` + `UglyHero.tsx:42` section `px-6 md:px-12` stacks padding; hero `min-h-svh` inside parent `min-h-svh` can push Work below two viewports on short screens.
- `section id="about"` labeled `01.` while nav likely counts Resume as `05.` — verify numbering matches DESIGN.md `01.–04.` + Resume convention.
- Open-to-work `●` in cyan at 12px mono on light `#F1F5F9` is low-contrast decor — pair with text (already does) and check 4.5:1 for the text itself.
- Scroll indicator is static SVG — either animate subtly (reduced-motion safe) or remove; currently promises scroll without motion cue.
- Filename `UglyHero.tsx` leaks internal judgment into the codebase; rename to `Hero.tsx` when touching the file.

## Questions to Consider

- What if the hero's one-line proof (`stack + 5 repos + contact`) replaced the second typewriter?
- Would a confident, non-spinning role line convert faster for a 30-second recruiter scan?
- What would this hero look like if the only motion allowed were the specular CTA glow?

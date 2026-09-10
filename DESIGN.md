---
name: Andrew //A_ — Developer Portfolio
description: Single-page hiring portfolio proving breadth plus craft through five shipped projects.
colors:
  workbench-cyan: "#00B8DB"
  glow-teal: "#2dd4bf"
  glow-sky: "#38bdf8"
  background-light: "#F1F5F9"
  background-dark: "#0d1117"
  card-dark: "#131a22"
  card-light: "oklch(1 0 0)"
  ink: "oklch(0.148 0.004 228.8)"
  paper: "oklch(0.987 0.002 197.1)"
  muted-slate: "oklch(0.56 0.021 213.5)"
  line-mist: "oklch(0.925 0.005 214.3)"
  slate-deep: "oklch(0.275 0.011 216.9)"
typography:
  display:
    fontFamily: "'Raleway Variable', sans-serif"
    fontSize: "clamp(3rem, 8vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.25
    letterSpacing: "normal"
  headline:
    fontFamily: "'Raleway Variable', sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "'Raleway Variable', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "'Raleway Variable', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.1em"
rounded:
  sm: "4.32px"
  md: "5.76px"
  lg: "7.2px"
  tile: "10px"
  specular: "18px"
  card: "20px"
  pill: "28px"
spacing:
  gutter: "24px"
  section: "96px"
  card-gap: "20px"
  tile-gap: "12px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.specular}"
    padding: "18px 40px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.specular}"
    padding: "18px 40px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.workbench-cyan}"
    rounded: "{rounded.pill}"
    padding: "16px 48px"
  skill-tile:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "10px 16px"
  project-card:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "48px"
---

# Design System: Andrew //A_ — Developer Portfolio

## Overview

**Creative North Star: "Signal in the Grid"**

This is a quiet slate grid with one electric voice cutting through it. Surfaces stay flat and forensic — light slate (`#F1F5F9`) or GitHub-dark (`#0d1117`) with tonal cards — so the single Workbench Cyan signal (`#00B8DB`) reads instantly as interactive, numbered, and hireable. Density is editorial but spare: one centered column, numbered mono kickers (`01.`–`04.`), generous section air, and proof-first project cards.

The personality is craft-warm: precise and engineering-led, but people-aware. Raleway Variable carries confident black headlines and relaxed muted body copy ("fast, accessible, and detail-obsessed"), while mono labels, a blinking `//A_` logo cursor, draggable profile sticker, cursor-reactive grid, and specular button edges add playful luminous detail without becoming marketing noise. It never does gradient-soup hero blobs, glassmorphism overload, or generic SaaS illustration — glow only answers interaction.

**Key Characteristics:**
- One cyan voice on a flat slate grid — rarity is the point
- Mono-numbered editorial sections (`01.` About, `02.` Work, `03.` Skills, `04.` Contact)
- Precise and tactile components: pill buttons, 10px tiles, 20px glow cards
- Motion as credential: Lenis smooth scroll, pinned horizontal project pans, cursor glow
- Proof over claims: every project pairs overview + stack + features + repo link

## Colors

A single-accent system: Workbench Cyan carries all action and wayfinding; neutrals carry everything else via tonal layering.

### Primary
- **Workbench Cyan** (#00B8DB): the only saturated hue. Logo `//` + `_` cursor, section numbers, role rotator, tags, links, hovers, CursorGrid lines, footer hairline gradient, specular button edge. Used on ≤10% of any screen.
- **Glow Teal** (#2dd4bf): secondary stop in the BorderGlow mesh gradient only. Never used as text or flat fill.
- **Glow Sky** (#38bdf8): tertiary stop in the BorderGlow mesh gradient only. Never used as text or flat fill.

### Neutral
- **Slate Paper Light** (#F1F5F9): light-mode page background.
- **Canvas Dark** (#0d1117): dark-mode page background.
- **Raised Card Dark** (#131a22): dark-mode card / popover / drawer fill on top of Canvas Dark.
- **Card White** (oklch(1 0 0)): light-mode card / popover fill.
- **Ink Navy** (oklch(0.148 0.004 228.8)): light-mode foreground, headings, primary button dark text fallback.
- **Paper White** (oklch(0.987 0.002 197.1)): dark-mode foreground, primary button light text.
- **Muted Slate** (oklch(0.56 0.021 213.5)): light-mode muted body / placeholder text.
- **Mist Line** (oklch(0.925 0.005 214.3)): light-mode borders and inputs.
- **Deep Slate Fill** (oklch(0.275 0.011 216.9)): dark-mode muted / secondary / accent fills.

### Named Rules (optional, powerful)
**The One Voice Rule.** Workbench Cyan is the only saturated color on screen. Its rarity is the point — if everything glows, nothing signals.
**The Tonal Floor Rule.** Surfaces differ by tonal step (background → card → muted), never by resting shadow or gradient wash.

## Typography

**Display Font:** Raleway Variable (with system sans fallback)
**Body Font:** Raleway Variable (with system sans fallback)
**Label/Mono Font:** UI monospace stack (Menlo / SFMono-Regular / monospace) — kickers, nav, tags, stats, footer. Functional mono (nav links, tags, links, meta) floors at `13px` for legibility; uppercase tracked-out group labels stay `12px`.

**Character:** Confident black headlines with relaxed muted body; forensic mono labels do the wayfinding. Raleway's tight black display against small tracked-out mono creates the terminal-meets-editorial tension.

### Hierarchy
- **Display** (900 black, clamp 3rem–4.5rem / text-5xl–7xl, 1.25 tight): hero `Andrew.` name only, with typed cursor `_` and cyan period.
- **Headline** (700 bold, 1.875rem–2.25rem / text-3xl–4xl, 1.2): section titles (`Selected projects`, `What I work with`, `Get in touch`) and featured project titles (up to text-5xl on desktop).
- **Title** (700 bold, 1.25rem–1.5rem / text-xl–2xl, 1.25): project detail headings (`Storefront with real inventory`), skill group is instead mono label.
- **Body** (400 regular, 1rem–1.125rem / text-base–lg, 1.625 relaxed): hero intro and project descriptions in muted-foreground, capped at measure (max-w-xl / 65–75ch).
- **Label** (500 medium, 0.75rem mono / text-xs, 1.5, 0.1em tracking, uppercase for groups): numbered kickers (`01. Hi, my name is`), nav links with cyan numbers, tag lists, stat labels, footer meta.

### Named Rules (optional)
**The Numbers Talk Rule.** Every section and nav item carries its mono number (`01.`–`04.`); numbers are cyan, names are muted/foreground.
**The One Family Rule.** Raleway does all prose and headlines; monospace never sets sentences — labels and data only.

## Layout

Single centered column on a full-viewport interactive grid. Container is `max-w-5xl` for hero, `max-w-6xl` for section intros / skills / footer, `max-w-7xl` for pinned project tracks. Gutter is edge-to-edge `24px` (px-6, md:px-12). Vertical rhythm is airy: hero `pt-32` full-screen centered, sections `pt-24 / pb-8–24`, project pins full `h-svh` with `py-10–24`.

Work (`02.`) is five full-screen pinned chapters; each chapter pans a horizontal card track (featured card `86vw / max 1150px` + three `420–460px` detail cards, `20–28px` gaps) driven by GSAP ScrollTrigger scrub before handing back to vertical scroll. Skills are wrapped tile clouds (`12px` gaps). Contact is centered narrow (`max-w-md`) CTA.

Responsive: desktop shows Safari browser mock (`38%` column) / iPhone (`130px`) beside copy; mobile stacks copy first with inline `16/9` image or `110–130px` phone below tags. Nav is fixed transparent, hides on scroll-down, compacts `5rem → 4rem` after 50px; drawer takes over below `768px` (`min(75vw, 400px)` right sheet). Reduced-motion (`prefers-reduced-motion`) disables Lenis, pinning, and parallax — everything stacks vertically with full opacity.

## Elevation & Depth

Flat-by-default with reactive glow. There are no resting drop shadows on cards, tiles, or sections — depth comes from tonal steps (background → card → muted/50 stat wells) plus interaction-only luminosity.

### Shadow Vocabulary (if applicable)
- **Specular button bed** (`inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.25)` dark / `inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 24px rgba(15,23,42,0.12)` light): the only permanent shadow, grounding the primary CTA.
- **Drawer edge** (`box-shadow: -10px 0 30px -15px rgba(0,0,0,0.3)`): right-sheet separation on mobile nav only.
- **Cursor glow wash** (BorderGlow conic mesh in cyan/teal/sky, `0.25s` fade-in / `0.75s` fade-out, `55%` opacity in light): hover-only aura that tracks the pointer angle around project cards; fill layer uses `soft-light` (dark) / `overlay` (light).

### Named Rules (optional)
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadow and glow appear only as a response to state (hover, focus, pointer proximity).

## Shapes

Tactile precision: small radii for system parts, large radii for signature cards, pill for actions, device-accurate mocks for proof.

System radii derive from `--radius: 7.2px` (lg): gently curved small edges (`4.32px` sm, `5.76px` md, `7.2px` lg). Signature radii break out: skill tiles are compactly rounded (`10px`), specular CTAs are softly mechanical (`18px`), project GlowCards are broadly welcoming (`20px`), shadcn buttons are fully pill (`28px` rounded-4xl), stat wells are small cards (`8–12px` rounded-lg), mobile screenshot is clipped (`12px` rounded-xl), profile photo/sticker is `12px` rounded-xl inside a `16px` dashed-active frame.

Borders are hairlines (`1px` Mist Line / white-10% in dark) unless they are the glow itself; the footer divider is a fading cyan hairline (`transparent → #00B8DB/40 → transparent`). No clipping tricks beyond device mocks and the skills fade mask (`transparent → black 64px` top fade).

## Components

### Buttons
Signature CTA is the specular shader button, not the shadcn default — precise and tactile with light that follows the cursor.
- **Shape:** softly mechanical (18px radius)
- **Primary:** transparent tinted bed, adaptive text (near-white `#f5f5f5` dark / slate `#0f172a` light), Workbench Cyan edge light (`lineColor #00B8DB`), large padding (`18px 40px` lg, `14px 30px` md, `10px 22px` sm), Raleway 500. Active presses to `0.97` scale.
- **Hover / Focus:** WebGL rim highlight steers toward pointer (250px proximity, `0.35` idle drift); focus shows `2px` offset outline. Glow intensity is proximity-driven, not a static hover color.
- **Secondary / Ghost / Tertiary (if applicable):** Resume uses shadcn outline pill (`28px` radius, `16px 48px` padding, cyan text, `border-border` hairline, `bg-input/30 → /50` hover). Nav theme toggle is ghost icon (`36px` box, `16px` icon, muted → cyan hover). Text links are mono `12px` cyan with external-arrow icon and opacity fade.

### Chips (if used)
Skill tiles are the chip system; project tags are naked mono text.
- **Style:** tile is card-fill (`var(--card)`), hairline border (`var(--border)`), compact rounding (`10px` radius), `10px 16px` padding, `24px` icon or cyan mono short (`EJS`, `Al`, `Jc`, `Lk`) + `14px` Raleway 500 name. Tags are borderless mono `12px` cyan/80 wrap lists.
- **State:** tiles show white glare sweep (`0.3` opacity, `-30°`, `300px`, `800ms`) on hover, cursor default; no selected state — this is a display cloud, not a filter.

### Cards / Containers
- **Corner Style:** broadly welcoming (20px radius)
- **Background:** adaptive card (`#131a22` dark / white light)
- **Shadow Strategy:** flat at rest per Elevation section; conic BorderGlow aura + soft fill on pointer only
- **Border:** transparent in dark (glow provides edge), hairline Mist in light
- **Internal Padding:** generous (`24px` mobile / `36–48px` desktop featured, `24–36px` detail). Featured card splits copy + device mock (`38%` Safari / `130px` iPhone on `lg+`); detail cards stack kicker + heading + body + pinned stat grid or bullet list.

### Inputs / Fields
No text inputs exist — contact is `mailto:` CTAs only. Do not invent field styles for this system. Form-adjacent patterns (stat wells, bullet rows) use `8–12px` rounded boxes on `muted/50` with mono labels.

### Navigation
Fixed transparent top bar, mono `12px`, muted names with cyan numbers (`01.`–`05.` incl. Resume). Default is muted-foreground; hover/focus is Workbench Cyan with no underline. Scroll-down hides (`-translate-y-full`), scroll-up / top reveals; height compacts on scroll. Entrance uses staggered fade-down (`300ms` ease, `100ms` per item). Mobile replaces links with a 3-line cyan hamburger morphing to X, opening a right card sheet with stacked `18px` links, cyan numbers above names, and outline Resume CTA. Theme toggle sits inline (sun/moon morph, `600ms`).

### Signature Component
**Pinned project showcase.** Each project is a full-viewport pinned chapter with header (mono tagline + bold title + `01 / 04` progress + cyan progress hairline), a horizontal card track (1 featured + 3 detail: Overview / Technologies / Features), and a `SCROLL ↓ to move through X` mono hint. Cards dim/scale at viewport edges (`0.55 opacity`, `0.94` scale). Reduced-motion falls back to a stacked vertical list.
**Device mocks.** Desktop projects render in a Safari chrome frame (traffic dots, URL pill, `11px` bottom radius, theme-aware `#E5E5E5 / #404040` shell); the Android project renders in an iPhone frame (`55.75px` screen radius, notch/island, side keys). Both crop screenshots `object-top`.
**CursorGrid + ProfileBadge.** Fixed full-page `70px` cyan grid (`140px` radius, smooth falloff, click pulse) at `z-0` behind content; hero badge is a `112–144px` draggable sticker stack with parallax (±24px) and press `0.9` scale.

## Do's and Don'ts

Concrete guardrails from the implemented system. Lead each with "Do" or "Don't" and include exact values only when established.

### Do:
- **Do** reserve Workbench Cyan (`#00B8DB`) for signal only — kickers, numbers, links, tags, active states — on ≤10% of any viewport.
- **Do** number every section in mono (`01.`–`04.`) with cyan number + muted label, and keep prose in Raleway.
- **Do** keep surfaces flat at rest and let BorderGlow / specular / glare answer hover (fade-in `0.25s`, fade-out `0.75s`).
- **Do** use the pinned horizontal track for project detail (featured `86vw / max 1150px` + `420–460px` detail cards) with a stacked fallback under reduced-motion.
- **Do** render project proof in device chrome (Safari with URL pill on web, iPhone frame on mobile) with `object-top` crops.
- **Do** keep the theme adaptive — every card, tile, and button must resolve in both `#F1F5F9` light and `#0d1117 / #131a22` dark.

### Don't:
- **Don't** introduce a second saturated accent or gradient-wash hero — no purple/blue blobs, no glassmorphism panels, no generic illustration.
- **Don't** set sentences in monospace or headlines in anything but Raleway Variable black/bold.
- **Don't** add resting drop shadows to cards or tiles — depth is tonal step + interaction glow only (specular CTA bed and drawer edge excepted).
- **Don't** invent input, pricing, testimonial, or metric patterns — the system has no forms; proof is repos, stacks, and feature lists.
- **Don't** break the single-column measure — body copy stays `max-w-xl`, sections `max-w-5xl–6xl`, pinned tracks `max-w-7xl`.
- **Don't** ship hover-only meaning without a focus/reduced-motion equivalent — every glow has a `:focus-visible` ring and a stacked static fallback.

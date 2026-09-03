import { useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BorderGlow from '@/components/BorderGlow'

gsap.registerPlugin(ScrollTrigger)

const ACCENT = '#00B8DB'
const GLOW_COLORS = ['#00B8DB', '#2dd4bf', '#38bdf8']

interface ProjectStat {
  label: string
  value: string
}

interface ProjectDetail {
  kicker: string
  heading: string
  body: string
  items?: string[]
  stats?: ProjectStat[]
}

interface Project {
  index: string
  title: string
  tagline: string
  description: string
  tags: string[]
  year: string
  role: string
  details: ProjectDetail[]
}

function cardCount(project: Project): number {
  return project.details.length + 1
}

const PROJECTS: Project[] = [
  {
    index: '01',
    title: "Aki's Thrift Shop",
    tagline: 'E-commerce/Inventory system',
    description:
      'A realtime analytics dashboard that turns raw event streams into clear, interactive visualizations. Swap this placeholder for a real project title, summary, tags, and links.',
    tags: ['React', 'TypeScript', 'D3.js', 'Tailwind', 'WebSockets'],
    year: '2024-2025',
    role: 'Lead Developer',
    details: [
      {
        kicker: 'Overview',
        heading: 'Built for speed at scale',
        body: 'Designed to render thousands of data points without dropping frames. Data flows in over WebSockets and is batched into animation-friendly updates, keeping the UI at a steady 60fps even under heavy load.',
        stats: [
          { label: 'Latency', value: '<50ms' },
          { label: 'Data points', value: '10k+' },
          { label: 'Lighthouse', value: '98' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Tech stack',
        body: 'A carefully chosen stack focused on type safety, rendering performance, and developer velocity.',
        items: ['React 19 + TypeScript', 'D3.js custom charts', 'Tailwind CSS design system', 'WebSocket live feeds', 'Vite + Vitest tooling']
      },
      {
        kicker: 'Features',
        heading: 'What it does',
        body: 'Everything on the dashboard is live, filterable, and shareable — no page reloads, no stale data.',
        items: ['Live-updating charts & heatmaps', 'Drag-and-drop widget layout', 'Saved views & share links', 'Dark / light theming', 'Keyboard-first navigation']
      }
    ]
  },
  {
    index: '02',
    title: 'Techstacks Logify',
    tagline: 'HR/Payroll management system',
    description:
      'A progressive web app for capturing notes and photos anywhere — fully functional offline, syncs when you reconnect. Swap this placeholder for a real project title, summary, tags, and links.',
    tags: ['React', 'PWA', 'IndexedDB', 'Service Workers', 'Tailwind'],
    year: '2024',
    role: 'Design & Development',
    details: [
      {
        kicker: 'Overview',
        heading: 'Works with zero connection',
        body: 'Every note is written locally first and synced in the background. Conflict-free merging means you can jot things down on a train, in a basement, or on a hike — nothing is ever lost.',
        stats: [
          { label: 'Offline', value: '100%' },
          { label: 'Install size', value: '<200kb' },
          { label: 'Sync conflicts', value: '0' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Tech stack',
        body: 'Built entirely on web platform primitives — no native wrappers, installable from the browser.',
        items: ['React + TypeScript', 'IndexedDB local storage', 'Service Worker caching', 'Background Sync API', 'Workbox precaching']
      },
      {
        kicker: 'Features',
        heading: 'What it does',
        body: 'A focused writing experience with just enough structure to keep months of notes organized.',
        items: ['Markdown & photo entries', 'Full-text local search', 'Tag & timeline organization', 'One-tap install', 'Encrypted cloud backup']
      }
    ]
  },
  {
    index: '03',
    title: 'Frascio',
    tagline: 'E-commerce storefront',
    description:
      'A headless commerce storefront focused on conversion: instant search, optimistic cart updates, and a checkout flow measured in seconds. Swap this placeholder for a real project title, summary, tags, and links.',
    tags: ['React', 'TypeScript', 'Stripe', 'Tailwind', 'Edge Functions'],
    year: '2024',
    role: 'Frontend Engineer',
    details: [
      {
        kicker: 'Overview',
        heading: 'Checkout without friction',
        body: 'Cart state updates optimistically, search results stream in as you type, and the entire checkout fits on a single screen. Fewer steps, fewer drop-offs.',
        stats: [
          { label: 'Checkout time', value: '~40s' },
          { label: 'Conversion lift', value: '+18%' },
          { label: 'TTI', value: '1.2s' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Tech stack',
        body: 'Headless architecture with edge-rendered pages and a fully typed API layer.',
        items: ['React + TypeScript', 'Stripe payment elements', 'Edge Functions rendering', 'Algolia instant search', 'Tailwind CSS UI kit']
      },
      {
        kicker: 'Features',
        heading: 'What it does',
        body: 'A storefront tuned around the details that actually move the numbers.',
        items: ['Optimistic cart & wishlist', 'Streaming product search', 'Single-screen checkout', 'Guest + saved payments', 'Order tracking portal']
      }
    ]
  },
  {
    index: '04',
    title: 'Invoicify',
    tagline: 'Invoice & billing platform',
    description:
      'A collaborative whiteboard where cursors, comments, and edits appear instantly for every participant. Swap this placeholder for a real project title, summary, tags, and links.',
    tags: ['React', 'TypeScript', 'CRDTs', 'Canvas API', 'Tailwind'],
    year: '2023',
    role: 'Creative Developer',
    details: [
      {
        kicker: 'Overview',
        heading: 'Everyone in the same room',
        body: 'CRDT-based state replication keeps every session in sync without a central lock. Presence, cursors, and comments render at the canvas layer for buttery-smooth multi-user editing.',
        stats: [
          { label: 'Sync', value: '<30ms' },
          { label: 'Max users', value: '50/room' },
          { label: 'Frame budget', value: '16ms' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Tech stack',
        body: 'Low-level canvas rendering paired with conflict-free replicated data types.',
        items: ['React + TypeScript', 'Yjs CRDT documents', 'Canvas 2D renderer', 'WebRTC data channels', 'Tailwind CSS interface']
      },
      {
        kicker: 'Features',
        heading: 'What it does',
        body: 'Collaboration features that feel native rather than bolted on.',
        items: ['Live multi-user cursors', 'Threaded canvas comments', 'Infinite pan & zoom canvas', 'Session replay', 'Export to PNG / SVG']
      }
    ]
  }
]

function MockScreenshot() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0d141d]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="ml-3 h-4 flex-1 rounded-sm bg-white/5" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[auto_1fr] gap-3 p-3">
        <div className="hidden flex-col gap-2 sm:flex">
          {[0, 1, 2, 3].map(i => (
            <span key={i} className="h-2.5 w-10 rounded-sm bg-white/10" />
          ))}
        </div>
        <div className="grid min-h-0 grid-rows-[1fr_auto] gap-3">
          <div
            className="min-h-16 rounded-md border border-white/5"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,184,219,0.35) 0%, rgba(45,212,191,0.18) 45%, rgba(56,189,248,0.08) 100%)'
            }}
          />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map(i => (
              <span key={i} className="h-8 rounded-md bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function GlowCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <BorderGlow
      backgroundColor="#131a22"
      glowColor="188 90 58"
      colors={GLOW_COLORS}
      fillOpacity={0.4}
      borderRadius={20}
      glowRadius={36}
      animated={false}
      className={className}
    >
      {children}
    </BorderGlow>
  )
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <GlowCard className="project-card h-full w-[92vw] max-w-[1150px] shrink-0 md:w-[86vw]">
      <article className="flex h-full min-h-0 flex-col justify-center gap-6 p-7 md:p-12 lg:flex-row lg:items-center lg:gap-12">
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between">
            <FolderIcon />
            <span className="font-mono text-xs text-muted-foreground">
              {project.index} / {project.year} · {project.role}
            </span>
          </div>

          <p className="font-mono text-sm text-[#00B8DB]">{project.tagline}</p>
          <h3 className="mt-2 text-3xl font-black leading-tight text-foreground md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[#00B8DB]/80">
            {project.tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          <p className="mt-8 hidden items-center gap-2 font-mono text-xs text-muted-foreground sm:flex">
            Keep scrolling
            <span className="inline-block animate-pulse" aria-hidden="true">
              →
            </span>
          </p>
        </div>

        <div className="hidden h-64 min-h-0 w-[38%] shrink-0 lg:block xl:h-80">
          <MockScreenshot />
        </div>
      </article>
    </GlowCard>
  )
}


function FolderIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}


function DetailCard({ project, detail }: { project: Project; detail: ProjectDetail }) {
  return (
    <GlowCard className="project-card h-full w-[86vw] shrink-0 sm:w-[70vw] md:w-[420px] xl:w-[460px]">
      <article className="flex h-full min-h-0 flex-col p-7 md:p-9">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-[#00B8DB]">
            {detail.kicker}
          </span>
          <span className="truncate font-mono text-xs text-muted-foreground">{project.title}</span>
        </div>

        <h4 className="text-xl font-bold text-foreground md:text-2xl">{detail.heading}</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{detail.body}</p>

        {detail.stats && (
          <dl className="mt-auto grid grid-cols-3 gap-3 pt-8">
            {detail.stats.map(stat => (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <dt className="font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-lg font-bold text-[#00B8DB]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {detail.items && (
          <ul className="mt-auto space-y-2.5 pt-8 font-mono text-xs text-foreground/90 md:text-sm">
            {detail.items.map(item => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-[0.45em] block size-1.5 shrink-0 rounded-full bg-[#00B8DB]" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </article>
    </GlowCard>
  )
}


interface ProjectSectionProps {
  project: Project
  projectNumber: number
  totalProjects: number
  reducedMotion: boolean
}

function ProjectSection({ project, projectNumber, totalProjects, reducedMotion }: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (reducedMotion) return

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const cards = gsap.utils.toArray<HTMLElement>('.project-card', track)
    const totalCards = cards.length

    // Horizontal distance the track must travel across the pinned section.
    const getDistance = () => Math.max(0, track.scrollWidth - track.clientWidth)

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          // Give extra vertical runway so 1px of scroll !== 1px of horizontal
          // travel. More runway = slower, smoother-feeling pan.
          end: () => '+=' + (getDistance() * 1.5 + window.innerHeight * 0.25),
          pin: true,
          // Higher scrub = more inertia/lag = less stiff.
          // 1 is nearly 1:1 (snappy). 1.5–2 feels buttery.
          scrub: 1.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const progress = self.progress

            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${progress})`
            }
            if (counterRef.current && totalCards > 0) {
              const current = Math.min(
                totalCards,
                Math.max(1, Math.round(progress * (totalCards - 1)) + 1)
              )
              counterRef.current.textContent = String(current).padStart(2, '0')
            }

            // Subtle depth: cards near the viewport center are fully visible,
            // cards entering/leaving are slightly smaller and dimmed.
            // Use gsap.set (GPU-composited, batched) instead of raw
            // style.transform writes to avoid layout thrash / jank.
            const viewportCenter = window.innerWidth / 2
            for (const card of cards) {
              const rect = card.getBoundingClientRect()
              const center = rect.left + rect.width / 2
              const d = Math.min(Math.abs(center - viewportCenter) / viewportCenter, 1)
              // Ease the falloff so edges fade gradually instead of linearly.
              const eased = d * d * (3 - 2 * d) // smoothstep
              gsap.set(card, {
                opacity: 1 - eased * 0.45,
                scale: 1 - eased * 0.06,
                transformOrigin: 'center center',
                overwrite: 'auto',
              })
            }
          }
        }
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])


  return (
    <section
      ref={sectionRef}
      className={`relative z-10 overflow-hidden ${reducedMotion ? '' : 'h-svh'}`}
      aria-label={`${project.title} — project ${projectNumber} of ${totalProjects}`}
    >
      <div
        className={
          reducedMotion
            ? 'mx-auto flex w-full max-w-7xl flex-col gap-8 px-0 py-24'
            : 'flex h-full min-h-0 flex-col justify-center gap-5 py-20 md:gap-7 md:py-24'
        }
      >
        <header className="flex items-end justify-between gap-4 px-6 md:px-12">
          <div className="min-w-0">
            <p className="font-mono text-sm text-[#00B8DB]">
              <span className="mr-2 text-muted-foreground">{project.index}.</span>
              {project.tagline}
            </p>
            <h2 className="truncate text-2xl font-bold text-foreground md:text-4xl">
              {project.title}
            </h2>
          </div>

          <div className="hidden shrink-0 text-right font-mono text-xs text-muted-foreground sm:block">
            <div>
              <span ref={counterRef} className="text-[#00B8DB]">
                01
              </span>{' '}
              / {String(cardCount(project)).padStart(2, '0')}
            </div>
            <div className="mt-2 h-px w-36 bg-border md:w-48">
              <div
                ref={barRef}
                className="h-px w-full origin-left bg-[#00B8DB]"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>
        </header>

        <div
          ref={trackRef}
          className={`${
            reducedMotion
              ? 'flex flex-col gap-6'
              : 'flex min-h-0 flex-1 items-stretch gap-5 will-change-transform md:gap-7'
          } px-6 md:px-12`}
        >
          <FeaturedCard project={project} />
          {project.details.map(detail => (
            <DetailCard key={detail.kicker} project={project} detail={detail} />
          ))}
        </div>

        {!reducedMotion && (
          <p className="px-6 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground md:px-12">
            Scroll ↓ to move through {project.title} · {project.index} /{' '}
            {String(totalProjects).padStart(2, '0')}
          </p>
        )}
      </div>
    </section>
  )
}

export default function ProjectShowcase() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <div id="work" className="relative z-10">
      <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-24">
        <p className="mb-2 font-mono text-sm text-[#00B8DB]">
          <span className="mr-2 text-muted-foreground">02.</span> My work
        </p>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Selected projects</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Four projects, each with the full story — keep scrolling and each showcase pans
          sideways through its details before handing you back to the next one.
        </p>
      </section>

      {PROJECTS.map((project, i) => (
        <ProjectSection
          key={project.index}
          project={project}
          projectNumber={i + 1}
          totalProjects={PROJECTS.length}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  )
}


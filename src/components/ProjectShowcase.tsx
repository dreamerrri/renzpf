import { useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BorderGlow from '@/components/BorderGlow'
import Reveal from '@/components/Reveal'
import { Safari } from '@/components/ui/safari'
import { Iphone } from '@/components/ui/iphone'

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
  url: string
  image: string
  device?: 'browser' | 'phone'
  details: ProjectDetail[]
}

function cardCount(project: Project): number {
  return project.details.length + 1
}

const PROJECTS: Project[] = [
  {
    index: '01',
    title: "Aki's Thrift Shop",
    tagline: 'E-commerce / Inventory system',
    description:
      'Online thrift store — browse variants, track stock live, pay by card.',
    tags: ['E-commerce', 'Inventory', 'Card payments', 'S3 uploads', 'Pest tested'],
    year: '2024-2025',
    role: 'Lead Developer',
    url: 'https://github.com/dreamerrri/aki-sys',
    image: '/akisthrift.png',
    details: [
      {
        kicker: 'Overview',
        heading: 'Stock stays correct at checkout',
        body: 'Hard part was keeping variant stock consistent through payment — S3 for photos, PayMongo for cards, Pest suite locking it in.',
        stats: [
          { label: 'Payments', value: 'PayMongo' },
          { label: 'Storage', value: 'S3' },
          { label: 'Tests', value: 'Pest' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Server-rendered Laravel core',
        body: 'Classic server-rendered Laravel with reactivity only where the shop needs it.',
        items: ['Laravel 11 + Blade', 'Alpine.js interactions', 'Tailwind CSS 3', 'MySQL + Eloquent', 'AWS S3 media storage']
      },
      {
        kicker: 'Features',
        heading: 'Browse to paid order',
        body: 'Variant stock decrements at payment time, so two buyers can’t checkout the last item.',
        items: ['Product catalog & variants', 'Stock-level inventory tracking', 'PayMongo card checkout', 'Order management', 'S3 image uploads']
      }
    ]
  },
  {
    index: '02',
    title: 'Techstacks Logify',
    tagline: 'HR / Payroll management system',
    description:
      'HR and payroll in one place — records, attendance, runs, printable payslips.',
    tags: ['HR', 'Payroll', 'Attendance', 'Payslips', 'Access control'],
    year: '2024',
    role: 'Design & Development',
    url: 'https://github.com/dreamerrri/techstacks',
    image: '/logify.png',
    details: [
      {
        kicker: 'Overview',
        heading: 'Payday without spreadsheets',
        body: 'Hard part was keeping payroll auditable — one schema for records, attendance and runs, with printable PDF payslips per period.',
        stats: [
          { label: 'Payslips', value: 'PDF' },
          { label: 'Auth', value: 'JWT' },
          { label: 'Frontend', value: 'React 19' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Laravel with SPA feel',
        body: 'Laravel backend with a React feel through Inertia — no separate API to maintain.',
        items: ['Laravel 12', 'Inertia.js v3 + React 19', 'Tailwind CSS 4', 'MySQL payroll schema', 'DomPDF payslip generation']
      },
      {
        kicker: 'Features',
        heading: 'Hire to payday',
        body: 'Calendar attendance feeds directly into payroll runs — no spreadsheet export step.',
        items: ['Employee records', 'Payroll runs & PDF payslips', 'Attendance calendar', 'Role-based access', 'Deployed on Railway']
      }
    ]
  },
  {
    index: '03',
    title: 'Frascio',
    tagline: 'E-commerce storefront',
    description:
      'Marketing storefront where every page transition feels physical.',
    tags: ['Storefront', 'Marketing site', 'Design system', 'Page transitions', 'Responsive'],
    year: '2024',
    role: 'Frontend Engineer',
    url: 'https://github.com/dreamerrri/frascio',
    image: '/frascio.png',
    details: [
      {
        kicker: 'Overview',
        heading: 'Motion as a feature',
        body: 'Hard part was holding 60fps without layout shift — route-driven transitions over a shared component system, fully type-safe.',
        stats: [
          { label: 'Stack', value: 'React 19' },
          { label: 'Styling', value: 'Tailwind 4' },
          { label: 'Motion', value: '60fps' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Vite SPA + design system',
        body: 'Modern Vite SPA with a design-system foundation.',
        items: ['React 19 + TypeScript', 'Vite 8 builds', 'Tailwind CSS 4', 'shadcn/ui components', 'Motion page animation']
      },
      {
        kicker: 'Features',
        heading: 'Animated browsing end to end',
        body: 'Shared layout transitions across pages, responsive from mobile to desktop.',
        items: ['Animated page transitions', 'Responsive layouts', 'shadcn component system', 'React Router pages', 'Deployed on Vercel']
      }
    ]
  },
  {
    index: '04',
    title: 'Invoicify',
    tagline: 'Invoice & billing platform',
    description:
      'Billing workspace — build invoices on validated forms over filterable tables.',
    tags: ['Invoicing', 'Clients', 'Data tables', 'Validated forms', 'Status tracking'],
    year: '2023',
    role: 'Developer',
    url: 'https://github.com/MagicBeans54/Invoicify',
    image: '/invoicify.png',
    details: [
      {
        kicker: 'Overview',
        heading: 'Invoices without the chaos',
        body: 'Hard part was keeping dense tables fast and correct — TanStack tables with strictly validated forms for clients, items and statuses.',
        stats: [
          { label: 'Tables', value: 'TanStack' },
          { label: 'Forms', value: 'Zod' },
          { label: 'UI', value: 'shadcn' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Inertia + TypeScript frontend',
        body: 'Laravel + Inertia with a TypeScript React frontend.',
        items: ['Laravel 12 + Inertia v3', 'React 19 + TypeScript', 'Tailwind CSS 4', 'TanStack Table', 'React Hook Form + Zod']
      },
      {
        kicker: 'Features',
        heading: 'Small billing workflow',
        body: 'Zod-validated forms over TanStack tables — fast filtering even on dense invoice lists.',
        items: ['Invoice builder', 'Client management', 'Filterable data tables', 'Validated forms', 'Status tracking']
      }
    ]
  },
  {
    index: '05',
    title: 'Telemetry',
    tagline: 'LAN + Cloud push-to-talk',
    description:
      'Android walkie-talkie — push-to-talk over local Wi-Fi with no internet, or join internet rooms with one word.',
    tags: ['Push-to-talk', 'Offline voice', 'Voice rooms', 'Foreground service', 'Android'],
    year: '2026',
    role: 'Solo Developer',
    url: 'https://github.com/dreamerrri/telemetry',
    image: '/telemetry.jpg',
    device: 'phone',
    details: [
      {
        kicker: 'Overview',
        heading: 'One button, offline or online',
        body: 'Phone-to-phone voice over local Wi-Fi with no account, or join-by-word internet rooms — audio runs as a foreground service so it keeps talking screen-off.',
        stats: [
          { label: 'LAN', value: 'UDP' },
          { label: 'Cloud', value: 'LiveKit' },
          { label: 'Audio', value: '16kHz' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Native Android + cloud minter',
        body: 'Native Android with a tiny Cloudflare token minter — no API secret lives in the app.',
        items: ['Kotlin + Jetpack Compose M3', 'Foreground service voice + UDP :50005', 'LiveKit Cloud rooms + Opus WebRTC', 'Cloudflare Worker token minter', 'UDP beacons :50006 presence']
      },
      {
        kicker: 'Features',
        heading: 'Hold-to-talk everywhere',
        body: 'Volume-button push-to-talk that keeps running screen-off, with signal dots for quality.',
        items: ['Hold-to-talk + volume-key PTT', 'LAN Direct no-internet voice', 'Cloud channels join-by-word', 'NEARBY discovery + quick texts', 'Screen-off service + quality dots']
      }
    ]
  }
]

function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : true
  )
  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains('dark'))
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])
  return isDark
}

function GlowCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const isDark = useIsDark()
  return (
    <BorderGlow
      glowColor="188 90 58"
      colors={GLOW_COLORS}
      fillOpacity={isDark ? 0.4 : 0.45}
      borderRadius={20}
      glowRadius={28}
      coneSpread={14}
      animated={false}
      className={`${className} ring-1 ring-slate-900/[0.07] dark:ring-0`}
    >
      {children}
    </BorderGlow>
  )
}

function FeaturedCard({ project }: { project: Project }) {
  const isPhone = project.device === 'phone'
  return (
    <GlowCard className="project-card h-auto w-[85vw] max-w-[1150px] shrink-0 self-center md:h-full md:w-[86vw] md:self-auto">
      <article className="flex h-auto flex-col justify-center gap-4 p-6 md:h-full md:min-h-0 md:gap-6 md:p-12 lg:flex-row lg:items-center lg:gap-12">
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between">
            <FolderIcon />
            <span className="font-mono text-xs text-muted-foreground">
              Featured
            </span>
          </div>

          <p className="font-mono text-sm text-[#00B8DB]">{project.tagline}</p>
          <h3 className="mt-2 text-3xl font-black leading-tight text-foreground md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[#007A94] dark:text-[#00B8DB]/80">
            {project.tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          {isPhone ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — open repository`}
              className="mt-5 flex justify-center lg:hidden"
            >
              <span className="block w-[110px] sm:w-[130px]">
                <Iphone src={project.image} />
              </span>
            </a>
          ) : (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — open live site`}
              className="mt-5 block overflow-hidden rounded-xl border border-border lg:hidden"
            >
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover object-top"
              />
            </a>
          )}

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-[#00B8DB] transition-opacity hover:opacity-80"
          >
            {isPhone ? 'View repository' : 'Visit live site'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 17 17 7M8 7h9v9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className={`hidden min-h-0 shrink-0 self-center lg:block ${isPhone ? 'w-auto' : 'w-[38%]'}`}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} — ${isPhone ? 'open repository' : 'open live site'}`}
            className="block"
          >
            {isPhone ? (
              <span className="block w-[130px] xl:w-[130px]">
                <Iphone src={project.image} />
              </span>
            ) : (
              <Safari url={project.url} imageSrc={project.image} />
            )}
          </a>
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
    <GlowCard className="project-card h-auto w-[78vw] shrink-0 self-center sm:w-[70vw] md:h-full md:w-[420px] md:self-auto xl:w-[460px]">
      <article className="flex h-auto flex-col p-6 md:h-full md:min-h-0 md:p-9">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-[#00B8DB]">
            {detail.kicker}
          </span>
          <span className="truncate font-mono text-xs text-muted-foreground">{project.title}</span>
        </div>

        <h4 className="text-xl font-bold text-foreground md:text-2xl">{detail.heading}</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{detail.body}</p>

        {detail.stats && (
          <dl className="mt-6 grid grid-cols-3 gap-3 pt-6 md:mt-auto md:pt-8">
            {detail.stats.map(stat => (
              <div key={stat.label} className="rounded-lg border border-border bg-muted/50 p-3">
                <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-lg font-bold text-[#00B8DB]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {detail.items && (
          <ul className="mt-6 space-y-2.5 pt-6 font-mono text-xs text-foreground/90 md:mt-auto md:pt-8 md:text-sm">
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
  const innerRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (reducedMotion) return

    const section = sectionRef.current
    const track = trackRef.current
    const inner = innerRef.current
    if (!section || !track) return

    const cards = gsap.utils.toArray<HTMLElement>('.project-card', track)
    const totalCards = cards.length

    ScrollTrigger.config({ ignoreMobileResize: true })

    const getDistance = () => Math.max(0, track.scrollWidth - track.clientWidth)

    const ctx = gsap.context(() => {
      if (inner) {
        gsap.fromTo(
          inner,
          { y: 60, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 95%',
              end: 'top 35%',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        )
      }

      const getHold = () => window.innerHeight * 0.5

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + (getHold() + getDistance() + getHold()),
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
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

            const viewportCenter = window.innerWidth / 2
            for (const card of cards) {
              const rect = card.getBoundingClientRect()
              const center = rect.left + rect.width / 2
              const d = Math.min(Math.abs(center - viewportCenter) / viewportCenter, 1)
              const eased = d * d * (3 - 2 * d)
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

      tl.to(
        {},
        {
          duration: () => Math.max(getHold(), 1),
        }
      )
      tl.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        duration: () => Math.max(getDistance(), 1),
      })
      tl.to(
        {},
        {
          duration: () => Math.max(getHold(), 1),
        }
      )
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
        ref={innerRef}
        className={
          reducedMotion
            ? 'mx-auto flex w-full max-w-7xl flex-col gap-8 px-0 py-24'
            : 'flex h-full min-h-0 flex-col justify-center gap-4 py-10 will-change-transform md:gap-7 md:py-24'
        }
      >
        <header className="flex items-end justify-between gap-4 px-6 md:px-12">
          <div className="min-w-0">
            <p className="font-mono text-sm text-muted-foreground">
              {project.index} / {project.year} · {project.role}
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

        <Reveal className="flex min-h-0 flex-none flex-col justify-center md:flex-1">
          <div
            ref={trackRef}
            className={`${
              reducedMotion
                ? 'flex flex-col gap-6'
                : 'flex min-h-0 flex-none items-center gap-5 will-change-transform md:flex-1 md:items-stretch md:gap-7'
            } px-6 md:px-12`}
          >
            <FeaturedCard project={project} />
            {project.details.map(detail => (
              <DetailCard key={detail.kicker} project={project} detail={detail} />
            ))}
          </div>
        </Reveal>

        {!reducedMotion && (
          <p className="flex items-center gap-2 px-6 font-mono text-xs uppercase tracking-widest text-muted-foreground md:px-12">
            <span>Scroll</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 5v14m-6-6 6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              to explore {project.title} details
            </span>
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
    <div id="work" className="relative z-10 scroll-mt-16">
      <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-24">
        <Reveal>
          <p className="mb-2 font-mono text-sm text-[#00B8DB]">
            <span className="mr-2 text-muted-foreground">02.</span> My work
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Selected projects</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Five shipped projects — each pans sideways to show outcome, stack, and code.
          </p>
        </Reveal>
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


import { useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BorderGlow from '@/components/BorderGlow'
import Reveal from '@/components/Reveal'
import { Safari } from '@/components/ui/safari'

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
      'Online thrift store with stock-level inventory, hosted product images, and card payments at checkout.',
    tags: ['Laravel', 'Blade', 'Alpine.js', 'Tailwind', 'MySQL'],
    year: '2024-2025',
    role: 'Lead Developer',
    url: 'https://github.com/dreamerrri/aki-sys',
    image: 'https://picsum.photos/seed/aki-shop/800/600',
    details: [
      {
        kicker: 'Overview',
        heading: 'Storefront with real inventory',
        body: 'Every listing tracks variants and stock counts, product photos live on S3, and checkout collects card payments — all covered by a Pest test suite.',
        stats: [
          { label: 'Payments', value: 'PayMongo' },
          { label: 'Storage', value: 'S3' },
          { label: 'Tests', value: 'Pest' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Tech stack',
        body: 'Classic server-rendered Laravel with sprinkles of reactivity where the shop needs it.',
        items: ['Laravel 11 + Blade', 'Alpine.js interactions', 'Tailwind CSS 3', 'MySQL + Eloquent', 'AWS S3 media storage']
      },
      {
        kicker: 'Features',
        heading: 'What it does',
        body: 'A complete small-shop loop from browsing to paid order.',
        items: ['Product catalog & variants', 'Stock-level inventory tracking', 'PayMongo card checkout', 'Order management', 'S3 image uploads']
      }
    ]
  },
  {
    index: '02',
    title: 'Techstacks Logify',
    tagline: 'HR/Payroll management system',
    description:
      'HR and payroll suite — employee records, attendance, payroll runs, and printable payslips.',
    tags: ['Laravel', 'Inertia', 'React', 'Tailwind', 'MySQL'],
    year: '2024',
    role: 'Design & Development',
    url: 'https://github.com/dreamerrri/techstacks',
    image: 'https://picsum.photos/seed/logify-app/800/600',
    details: [
      {
        kicker: 'Overview',
        heading: 'Payday without spreadsheets',
        body: 'Employee records, attendance, and payroll runs live in one place, with printable PDF payslips generated per pay period.',
        stats: [
          { label: 'Payslips', value: 'PDF' },
          { label: 'Auth', value: 'JWT' },
          { label: 'Frontend', value: 'React 19' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Tech stack',
        body: 'Laravel backend with a React SPA feel through Inertia — no separate API to maintain.',
        items: ['Laravel 12', 'Inertia.js v3 + React 19', 'Tailwind CSS 4', 'MySQL payroll schema', 'DomPDF payslip generation']
      },
      {
        kicker: 'Features',
        heading: 'What it does',
        body: 'The full HR loop from hire to payday.',
        items: ['Employee records', 'Payroll runs & PDF payslips', 'Attendance calendar', 'Role-based access', 'Deployed on Railway']
      }
    ]
  },
  {
    index: '03',
    title: 'Frascio',
    tagline: 'E-commerce storefront',
    description:
      'Motion-rich marketing site built with React 19, shadcn components, and physics-feeling page animation.',
    tags: ['React', 'TypeScript', 'Tailwind', 'shadcn', 'Motion'],
    year: '2024',
    role: 'Frontend Engineer',
    url: 'https://github.com/dreamerrri/frascio',
    image: 'https://picsum.photos/seed/frascio-store/800/600',
    details: [
      {
        kicker: 'Overview',
        heading: 'Motion as a feature',
        body: 'Route-driven pages with physics-feeling transitions, a shadcn component system, and type-safe code throughout.',
        stats: [
          { label: 'Stack', value: 'React 19' },
          { label: 'Styling', value: 'Tailwind 4' },
          { label: 'Motion', value: '60fps' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Tech stack',
        body: 'Modern Vite SPA with a design-system foundation.',
        items: ['React 19 + TypeScript', 'Vite 8 builds', 'Tailwind CSS 4', 'shadcn/ui components', 'Motion page animation']
      },
      {
        kicker: 'Features',
        heading: 'What it does',
        body: 'A polished, animated browsing experience end to end.',
        items: ['Animated page transitions', 'Responsive layouts', 'shadcn component system', 'React Router pages', 'Deployed on Vercel']
      }
    ]
  },
  {
    index: '04',
    title: 'Invoicify',
    tagline: 'Invoice & billing platform',
    description:
      'Billing workspace for building invoices on validated forms over dense, filterable data tables.',
    tags: ['Laravel', 'Inertia', 'React', 'TypeScript', 'Tailwind'],
    year: '2023',
    role: 'Creative Developer',
    url: 'https://github.com/MagicBeans54/Invoicify',
    image: 'https://picsum.photos/seed/invoicify-bill/800/600',
    details: [
      {
        kicker: 'Overview',
        heading: 'Invoices without the chaos',
        body: 'Clients, line items, and statuses managed through dense data tables and strictly validated forms.',
        stats: [
          { label: 'Tables', value: 'TanStack' },
          { label: 'Forms', value: 'Zod' },
          { label: 'UI', value: 'shadcn' }
        ]
      },
      {
        kicker: 'Technologies',
        heading: 'Tech stack',
        body: 'Laravel + Inertia with a TypeScript React frontend.',
        items: ['Laravel 12 + Inertia v3', 'React 19 + TypeScript', 'Tailwind CSS 4', 'TanStack Table', 'React Hook Form + Zod']
      },
      {
        kicker: 'Features',
        heading: 'What it does',
        body: 'Everything a small billing workflow needs.',
        items: ['Invoice builder', 'Client management', 'Filterable data tables', 'Validated forms', 'Status tracking']
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
      fillOpacity={isDark ? 0.4 : 0.25}
      borderRadius={20}
      glowRadius={28}
      coneSpread={14}
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

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-[#00B8DB] transition-opacity hover:opacity-80"
          >
            Visit live site
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

        <div className="hidden min-h-0 w-[38%] shrink-0 self-center lg:block">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} — open live site`}
            className="block"
          >
            <Safari url={project.url} imageSrc={project.image} />
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
              <div key={stat.label} className="rounded-lg border border-border bg-muted/50 p-3">
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
            : 'flex h-full min-h-0 flex-col justify-center gap-5 py-20 will-change-transform md:gap-7 md:py-24'
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

        <Reveal className="flex min-h-0 flex-1 flex-col justify-center">
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
        </Reveal>

        {!reducedMotion && (
          <p className="flex items-center gap-2 px-6 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground md:px-12">
            <span>Scroll</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="animate-bounce"
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
              to move through {project.title} · {project.index} /{' '}
              {String(totalProjects).padStart(2, '0')}
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
    <div id="work" className="relative z-10">
      <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-24">
        <Reveal>
          <p className="mb-2 font-mono text-sm text-[#00B8DB]">
            <span className="mr-2 text-muted-foreground">02.</span> My work
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Selected projects</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Four projects, each with the full story — keep scrolling and each showcase pans
            sideways through its details before handing you back to the next one.
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


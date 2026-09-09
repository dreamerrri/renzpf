import { useEffect, useState } from 'react'
import GlareHover from '@/components/GlareHover'
import Reveal from '@/components/Reveal'

const GH = 'https://github.com/dreamerrri'
const REPO_AKI = 'https://github.com/dreamerrri/aki-sys'
const REPO_LOGIFY = 'https://github.com/dreamerrri/techstacks'
const REPO_FRASCIO = 'https://github.com/dreamerrri/frascio'
const REPO_TELEMETRY = 'https://github.com/dreamerrri/telemetry'

interface SkillItem {
  name: string
  src?: string
  /** Icon variant used on dark backgrounds (fixes black-on-dark marks). */
  darkSrc?: string
  /** Short badge rendered when there is no icon or the CDN image fails. */
  short?: string
  /** Proof link — the repo where this skill shipped. Omitted when no direct evidence. */
  href?: string
  /** Short project tag shown next to linked tiles (e.g. "Aki"). */
  proof?: string
  placeholder?: boolean
}

interface SkillSection {
  title: string
  items: SkillItem[]
}

const SECTIONS: SkillSection[] = [
  {
    title: 'Languages',
    items: [
      { name: 'JavaScript', src: 'https://skillicons.dev/icons?i=js', short: 'JS', href: REPO_FRASCIO, proof: 'Frascio' },
      { name: 'PHP', src: 'https://skillicons.dev/icons?i=php', short: 'PHP', href: REPO_AKI, proof: 'Aki' },
      { name: 'TypeScript', src: 'https://skillicons.dev/icons?i=ts', short: 'TS', href: REPO_FRASCIO, proof: 'Frascio' },
      { name: 'Kotlin', src: 'https://skillicons.dev/icons?i=kotlin', short: 'Kt', href: REPO_TELEMETRY, proof: 'Telemetry' },
      { name: 'CSS', src: 'https://skillicons.dev/icons?i=css', short: 'CSS', href: REPO_FRASCIO, proof: 'Frascio' },
      { name: 'HTML', src: 'https://skillicons.dev/icons?i=html', short: 'HTML', href: REPO_FRASCIO, proof: 'Frascio' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      { name: 'React', src: 'https://skillicons.dev/icons?i=react', short: 'Re', href: REPO_FRASCIO, proof: 'Frascio' },
      { name: 'Tailwind CSS', src: 'https://skillicons.dev/icons?i=tailwind', short: 'Tw', href: REPO_FRASCIO, proof: 'Frascio' },
      { name: 'Laravel', src: 'https://skillicons.dev/icons?i=laravel', short: 'La', href: REPO_AKI, proof: 'Aki' },
      {
        name: 'Inertia.js',
        src: 'https://cdn.simpleicons.org/inertia/black',
        darkSrc: 'https://cdn.simpleicons.org/inertia/white',
        short: 'In',
        href: REPO_LOGIFY,
        proof: 'Logify',
      },
      { name: 'Express', src: 'https://skillicons.dev/icons?i=express', short: 'Ex' },
      { name: 'Jetpack Compose', short: 'Jc', href: REPO_TELEMETRY, proof: 'Telemetry' },
      { name: 'EJS templates', short: 'EJS' },
      { name: 'Alpine.js', short: 'Al', href: REPO_AKI, proof: 'Aki' },
    ],
  },
  {
    title: 'Build & Deploy',
    items: [
      { name: 'GitHub', src: 'https://skillicons.dev/icons?i=github', short: 'Gh', href: GH, proof: 'Profile' },
      { name: 'Vite', src: 'https://skillicons.dev/icons?i=vite', short: 'Vi', href: REPO_FRASCIO, proof: 'Frascio' },
      { name: 'Vercel', src: 'https://skillicons.dev/icons?i=vercel', short: 'Ve', href: REPO_FRASCIO, proof: 'Frascio' },
      {
        name: 'Railway',
        src: 'https://cdn.simpleicons.org/railway/black',
        darkSrc: 'https://cdn.simpleicons.org/railway/white',
        short: 'Rw',
        href: REPO_LOGIFY,
        proof: 'Logify',
      },
      { name: 'Git', src: 'https://skillicons.dev/icons?i=git', short: 'Git', href: GH, proof: 'Profile' },
    ],
  },
  {
    title: 'Data & Cloud',
    items: [
      { name: 'MySQL', src: 'https://skillicons.dev/icons?i=mysql', short: 'My', href: REPO_AKI, proof: 'Aki' },
      { name: 'Node.js', src: 'https://skillicons.dev/icons?i=nodejs', short: 'Nd' },
      { name: 'MongoDB', src: 'https://skillicons.dev/icons?i=mongodb', short: 'Mg' },
      { name: 'AWS', src: 'https://skillicons.dev/icons?i=aws', short: 'AWS', href: REPO_AKI, proof: 'Aki S3' },
      { name: 'LiveKit', short: 'Lk', href: REPO_TELEMETRY, proof: 'Telemetry' },
    ],
  },
]

function useIsDark() {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark')
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

function initials(name: string) {
  const parts = name.split(/[^A-Za-z]+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 3)
  return parts
    .map(p => p[0])
    .join('')
    .slice(0, 3)
}

function SkillTile({ item, isDark }: { item: SkillItem; isDark: boolean }) {
  const [failed, setFailed] = useState(false)
  const showIcon = item.src && !failed
  const badge = item.short ?? initials(item.name)

  if (item.placeholder) {
    return (
      <span className="flex items-center gap-2.5 rounded-xl border border-dashed border-border px-4 py-2.5">
        <span
          aria-hidden="true"
          className="flex size-6 items-center justify-center rounded-md bg-muted font-mono text-xs text-muted-foreground"
        >
          ?
        </span>
        <span className="min-w-0 break-words text-sm font-medium text-muted-foreground">
          {item.name}
        </span>
      </span>
    )
  }

  const tile = (
    <GlareHover
      width="fit-content"
      height="auto"
      background="var(--card)"
      borderColor="var(--border)"
      borderRadius="10px"
      className="px-4 py-2.5"
      style={{ cursor: 'default' }}
      glareColor="#ffffff"
      glareOpacity={0.3}
      glareAngle={-30}
      glareSize={300}
      transitionDuration={800}
      playOnce={false}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        {showIcon ? (
          <img
            src={isDark && item.darkSrc ? item.darkSrc : item.src}
            alt={`${item.name} logo`}
            width={24}
            height={24}
            loading="lazy"
            draggable={false}
            onError={() => setFailed(true)}
            className="size-6 shrink-0"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted px-0.5 font-mono text-xs font-bold text-[#00B8DB]"
          >
            {badge}
          </span>
        )}
        <span className="min-w-0 break-words text-sm font-medium text-foreground">
          {item.name}
          {item.proof && (
            <span className="font-mono text-xs font-normal text-muted-foreground"> · {item.proof}</span>
          )}
        </span>
      </span>
    </GlareHover>
  )

  if (!item.href) {
    return <li title={item.name}>{tile}</li>
  }

  const label = item.proof
    ? `${item.name} — used in ${item.proof}, open repository`
    : `${item.name} — open repository`

  return (
    <li>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        title={item.proof ? `${item.name} — shipped in ${item.proof}` : item.name}
        aria-label={label}
        className="block rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB]"
      >
        {tile}
      </a>
    </li>
  )
}

export default function Skills() {
  const isDark = useIsDark()

  return (
    <div id="skills" className="skills-band-mask relative z-10 scroll-mt-[88px] bg-background">
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-24">
        <Reveal>
          <p className="mb-2 font-mono text-sm text-[#00B8DB]">
            <span className="mr-2 text-muted-foreground">03.</span> My skills
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">What I work with</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Linked tiles open the repo where each skill shipped — full history on{' '}
            <a
              href={GH}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-[#00B8DB] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB]"
            >
              GitHub
            </a>
            .
          </p>
        </Reveal>

        <div className="mt-8 space-y-8">
          {SECTIONS.map((section, si) => (
            <Reveal key={section.title} delay={si * 100}>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-[#00B8DB]">
                {section.title}
              </h3>
              <ul className="flex flex-wrap gap-2 sm:gap-3">
                {section.items.map((item, i) => (
                  <SkillTile key={`${item.name}-${i}`} item={item} isDark={isDark} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}

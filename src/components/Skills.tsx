import GlareHover from '@/components/GlareHover'
import Reveal from '@/components/Reveal'

interface SkillItem {
  name: string
  src?: string
  /** Short label rendered when there is no icon (e.g. "EJS"). */
  short?: string
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
      { name: 'JavaScript', src: 'https://skillicons.dev/icons?i=js' },
      { name: 'PHP', src: 'https://skillicons.dev/icons?i=php' },
      { name: 'TypeScript', src: 'https://skillicons.dev/icons?i=ts' },
      { name: 'CSS', src: 'https://skillicons.dev/icons?i=css' },
      { name: 'HTML', src: 'https://skillicons.dev/icons?i=html' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      { name: 'React', src: 'https://skillicons.dev/icons?i=react' },
      { name: 'Tailwind CSS', src: 'https://skillicons.dev/icons?i=tailwind' },
      { name: 'Laravel', src: 'https://skillicons.dev/icons?i=laravel' },
      { name: 'Inertia.js', src: 'https://cdn.simpleicons.org/inertia' },
      { name: 'Express', src: 'https://skillicons.dev/icons?i=express' },
      { name: 'EJS', short: 'EJS' },
      { name: 'Alpine.js', short: 'Al' },
    ],
  },
  {
    title: 'Tools & Platforms',
    items: [
      { name: 'GitHub', src: 'https://skillicons.dev/icons?i=github' },
      { name: 'Vite', src: 'https://skillicons.dev/icons?i=vite' },
      { name: 'Vercel', src: 'https://skillicons.dev/icons?i=vercel' },
      { name: 'Railway', src: 'https://cdn.simpleicons.org/railway/black' },
      { name: 'MySQL', src: 'https://skillicons.dev/icons?i=mysql' },
      { name: 'Node.js', src: 'https://skillicons.dev/icons?i=nodejs' },
      { name: 'MongoDB', src: 'https://skillicons.dev/icons?i=mongodb' },
      { name: 'AWS', src: 'https://skillicons.dev/icons?i=aws' },
      { name: 'Git', src: 'https://skillicons.dev/icons?i=git' },
    ],
  },
]

function SkillTile({ item }: { item: SkillItem }) {
  if (item.placeholder) {
    return (
      <span className="flex items-center gap-2.5 rounded-xl border border-dashed border-border px-4 py-2.5">
        <span
          aria-hidden="true"
          className="flex size-6 items-center justify-center rounded-md bg-muted font-mono text-xs text-muted-foreground"
        >
          ?
        </span>
        <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
          {item.name}
        </span>
      </span>
    )
  }
  return (
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
      <span className="flex items-center gap-2.5">
        {item.src ? (
          <img
            src={item.src}
            alt={`${item.name} logo`}
            width={24}
            height={24}
            loading="lazy"
            draggable={false}
            className="size-6"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-6 items-center justify-center rounded-md bg-muted font-mono text-[0.6rem] font-bold text-[#00B8DB]"
          >
            {item.short ?? '?'}
          </span>
        )}
        <span className="whitespace-nowrap text-sm font-medium text-foreground">
          {item.name}
        </span>
      </span>
    </GlareHover>
  )
}

export default function Skills() {
  return (
    <div id="skills" className="skills-band-mask relative z-10 scroll-mt-16 bg-background">
      <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-24">
        <Reveal>
          <p className="mb-2 font-mono text-sm text-[#00B8DB]">
            <span className="mr-2 text-muted-foreground">03.</span> My skills
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">What I work with</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Pulled from my public repos — the languages I write, the frameworks I
          build with, and the tools around them.
        </p>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-10 px-6 pb-24">
        {SECTIONS.map((section, si) => (
          <Reveal key={section.title} delay={si * 100}>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#00B8DB]">
              {section.title}
            </p>
            <div className="flex flex-wrap gap-3">
              {section.items.map((item, i) => (
                <SkillTile key={`${item.name}-${i}`} item={item} />
              ))}
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  )
}

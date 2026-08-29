import BorderGlow from '@/components/BorderGlow'

interface Project {
  title: string
  description: string
  tags: string[]
}

// Placeholder projects — replace these with your real previous projects.
const PROJECTS: Project[] = Array.from({ length: 16 }, (_, i) => ({
  title: `Project ${String(i + 1).padStart(2, '0')}`,
  description:
    'A previous project of mine. Swap this placeholder for a real project title, summary, tags, and links.',
  tags: ['React', 'TypeScript', 'Tailwind']
}))

const GLOW_COLORS = ['#00B8DB', '#2dd4bf', '#38bdf8']

export default function ProjectsGrid() {
  return (
    <section id="work" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-10">
        <p className="mb-2 font-mono text-sm text-[#00B8DB]">
          <span className="mr-2 text-muted-foreground">02.</span> My work
        </p>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Previous projects</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROJECTS.map(project => (
          <BorderGlow
            key={project.title}
            backgroundColor="#0b1118"
            glowColor="188 90 58"
            colors={GLOW_COLORS}
            fillOpacity={0.4}
            borderRadius={20}
            glowRadius={36}
            animated={false}
          >
            <article className="flex h-full min-h-[16rem] flex-col p-6">
              <div className="mb-4 flex items-center justify-between">
                {/* folder icon */}
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
                    fill="none"
                    stroke="#00B8DB"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-mono text-xs text-muted-foreground">{project.title}</span>
              </div>

              <h3 className="text-lg font-semibold text-foreground transition-colors hover:text-[#00B8DB]">
                {project.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[#00B8DB]/80">
                {project.tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          </BorderGlow>
        ))}
      </div>
    </section>
  )
}

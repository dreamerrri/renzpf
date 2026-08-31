import CursorGrid from '@/components/CursorGrid'
import Navbar from '@/components/Navbar'
import UglyHero from '@/components/UglyHero'
import ProjectsGrid from '@/components/ProjectsGrid'
import GradualBlur from '@/components/GradualBlur'

export function App() {
  return (
    <div className="relative min-h-svh">

      <div className="fixed inset-0 z-0" aria-hidden="true">
        <CursorGrid
          cellSize={70}
          color="#00B8DB"
          radius={140}
          falloff="smooth"
          holdTime={400}
          fadeDuration={800}
          lineWidth={1.2}
          maxOpacity={1}
          fillOpacity={0}
          gridOpacity={0}
          cellRadius={0}
          clickPulse
          pulseSpeed={600}
        />
      </div>

      <Navbar />

      <div className="relative z-10 flex min-h-svh flex-col px-6 pt-32">
        <UglyHero />
      </div>

      <ProjectsGrid />

      <div className="relative z-10 px-6 pb-8 font-mono text-xs text-muted-foreground">
        (Press <kbd>d</kbd> to toggle dark mode)
      </div>

              <GradualBlur
    target="page"
    position="bottom"
    height="7rem"
    strength={2}
    divCount={5}
    curve="bezier"
    exponential
    opacity={1}
  />
    </div>

  )
}

export default App


import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CursorGrid from '@/components/CursorGrid'
import Navbar from '@/components/Navbar'
import UglyHero from '@/components/UglyHero'
import ProjectShowcase from '@/components/ProjectShowcase'
import GradualBlur from '@/components/GradualBlur'

gsap.registerPlugin(ScrollTrigger)

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}

export function App() {
  useSmoothScroll()
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

      <ProjectShowcase />

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


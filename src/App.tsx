import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CursorGrid from '@/components/CursorGrid'
import Navbar from '@/components/Navbar'
import UglyHero from '@/components/UglyHero'
import ProjectShowcase from '@/components/ProjectShowcase'
import Skills from '@/components/Skills'
import Footer from '@/components/Footer'
import GradualBlur from '@/components/GradualBlur'

gsap.registerPlugin(ScrollTrigger)

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    })
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(tick)
      if ((window as unknown as { __lenis?: Lenis }).__lenis === lenis) {
        delete (window as unknown as { __lenis?: Lenis }).__lenis
      }
      lenis.destroy()
    }
  }, [])
}

export function App() {
  useSmoothScroll()
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

  return (
    <div id="top" className="relative min-h-svh">

      <div className="fixed inset-0 z-0" aria-hidden="true">
        <CursorGrid
          cellSize={70}
          color={isDark ? '#00B8DB' : '#009BBD'}
          radius={120}
          falloff="smooth"
          holdTime={400}
          fadeDuration={800}
          lineWidth={1}
          maxOpacity={isDark ? 0.6 : 0.8}
          fillOpacity={0}
          gridOpacity={0}
          cellRadius={0}
          clickPulse
          pulseSpeed={1200}
        />
      </div>

      <Navbar />

      <div className="relative z-10 flex min-h-svh flex-col px-6 pt-32">
        <UglyHero />

      </div>

      <ProjectShowcase />

      <Skills />

     

      <Footer />

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


import { useEffect, useRef, useState } from 'react'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { useTheme } from '@/components/theme-provider'

type ScrollDirection = 'up' | 'down'

interface NavLink {
  name: string
  url: string
}

const NAV_LINKS: NavLink[] = [
  { name: 'About', url: '#about' },
  { name: 'Work', url: '#work' },
  { name: 'Skills', url: '#skills' },
  { name: 'Contact', url: '#contact' }
]

function scrollToSection(hash: string) {
  window.history.replaceState(null, '', hash)
  const lenis = (
    window as unknown as {
      __lenis?: { scrollTo: (t: string | number, o?: Record<string, unknown>) => void }
    }
  ).__lenis
  if (lenis) {
    lenis.scrollTo(hash, { immediate: true, force: true, offset: -88 })
  } else {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.querySelector(hash)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }
}

function scrollToTop() {
  window.history.replaceState(null, '', '#top')
  const lenis = (
    window as unknown as {
      __lenis?: { scrollTo: (t: string | number, o?: Record<string, unknown>) => void }
    }
  ).__lenis
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true })
  } else {
    window.scrollTo({ top: 0 })
  }
}

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, url: string) {
  // Let modifier / middle clicks use the native anchor (new tab, copy-link).
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return
  e.preventDefault()
  scrollToSection(url)
}

function useScrollDirection(initialDirection: ScrollDirection): ScrollDirection {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>(initialDirection)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.scrollY
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up')
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrollDir
}

function useActiveSection(): string {
  const [active, setActive] = useState('#about')

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.url.slice(1))
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}

const Logo = () => (
  <a
    href="#top"
    onClick={e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return
      e.preventDefault()
      scrollToTop()
    }}
    aria-label="Back to top"
    className="rounded-md font-mono text-lg font-bold tracking-tight text-foreground transition-colors hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00B8DB]"
  >
    <span className="text-[#00B8DB]">//</span>
    <span>A</span>
    <span className="logo-cursor ml-[1px] text-[#00B8DB]">_</span>
  </a>
)

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [systemDark, setSystemDark] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => setSystemDark(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const resolved = theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : systemDark ? 'dark' : 'light'

  return (
    <AnimatedThemeToggler
      theme={resolved}
      onThemeChange={t => setTheme(t)}
      duration={600}
      className="flex size-11 cursor-pointer items-center justify-center rounded-md bg-transparent text-muted-foreground transition-colors hover:bg-transparent hover:text-[#00B8DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB] [&_svg]:size-4"
    />
  )
}

function Menu({ activeHash }: { activeHash: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  // Lock body scroll + Lenis while the drawer is open, focus first link.
  useEffect(() => {
    if (!menuOpen) return
    prevFocusRef.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    lenis?.stop()
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()

    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [menuOpen])

  const closeAndRestore = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
    const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis
    lenis?.start()
    ;(prevFocusRef.current ?? buttonRef.current)?.focus()
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeAndRestore()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current || wrapperRef.current.contains(e.target as Node)) return
      setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('touchstart', onClickOutside)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('touchstart', onClickOutside)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="md:hidden">
      <button
        ref={buttonRef}
        onClick={() => (menuOpen ? closeAndRestore() : setMenuOpen(true))}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        className="relative z-40 flex size-11 items-center justify-center rounded-md border-0 bg-transparent p-2 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB]"
      >
        <span className="relative inline-block h-6 w-[30px]">
          <span
            className={`absolute top-1/2 right-0 h-0.5 w-[30px] -translate-y-1/2 rounded bg-[#00B8DB] transition-all duration-200 before:absolute before:right-0 before:h-0.5 before:w-full before:rounded before:bg-[#00B8DB] before:content-[''] before:transition-all after:absolute after:right-0 after:h-0.5 after:w-full after:rounded after:bg-[#00B8DB] after:content-[''] after:transition-all ${
              menuOpen
                ? 'rotate-[225deg] before:top-0 before:-rotate-90 after:bottom-0 after:opacity-0'
                : 'rotate-0 before:-top-2.5 after:bottom-2.5'
            }`}
          />
        </span>
      </button>

      <aside
        ref={panelRef}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed inset-y-0 right-0 z-30 flex h-screen w-[min(75vw,400px)] flex-col items-center justify-center border-l border-border bg-card px-2.5 py-[50px] shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.3)] outline-none transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ visibility: menuOpen ? 'visible' : 'hidden' }}
      >
        <nav aria-label="Mobile" className="flex w-full flex-col items-center gap-2 text-center font-mono text-foreground">
          <ol className="m-0 flex w-full list-none flex-col p-0">
            {NAV_LINKS.map(({ url, name }, i) => {
              const isActive = activeHash === url
              return (
                <li key={url} className="relative my-1 text-lg">
                  <a
                    href={url}
                    aria-current={isActive ? 'true' : undefined}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={e => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return
                      e.preventDefault()
                      setMenuOpen(false)
                      scrollToSection(url)
                    }}
                    className={`block w-full rounded-md px-5 py-3 transition-colors hover:text-[#00B8DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB] ${
                      isActive ? 'text-[#00B8DB]' : 'text-foreground'
                    }`}
                  >
                    <span className="block text-sm text-[#00B8DB]">{String(i + 1).padStart(2, '0')}.</span>
                    {name}
                  </a>
                </li>
              )
            })}
          </ol>
          {/* Resume hidden until public/resume.pdf ships — avoids 404 at hiring moment. */}
        </nav>
      </aside>
    </div>
  )
}

const Navbar = () => {
  const [scrolledToTop, setScrolledToTop] = useState(true)
  const scrollDirection = useScrollDirection('down')
  const activeHash = useActiveSection()

  const handleScroll = () => {
    setScrolledToTop(window.scrollY < 50)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => void window.removeEventListener('scroll', handleScroll)
  }, [])

  const hidden = scrollDirection === 'down' && !scrolledToTop

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-foreground focus:outline-2 focus:outline-[#00B8DB]"
      >
        Skip to content
      </a>
      <header
        className={`fixed top-0 left-0 z-40 flex w-full items-center justify-between px-6 transition-all duration-300 md:px-10 lg:px-12 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${scrolledToTop ? 'bg-transparent' : 'border-b border-border bg-background/80 backdrop-blur-md'}`}
        style={{ height: scrolledToTop ? '5rem' : '4rem' }}
      >
        <nav
          aria-label="Primary"
          className="relative z-30 flex w-full items-center justify-between font-mono text-foreground"
        >
          <Logo />

          <div className="flex items-center gap-1 md:gap-2">
            <div className="hidden items-center md:flex">
              <ol className="m-0 flex list-none p-0">
                {NAV_LINKS.map(({ url, name }, i) => {
                  const isActive = activeHash === url
                  return (
                    <li key={url} className="relative mx-[5px] text-xs">
                      <a
                        href={url}
                        aria-current={isActive ? 'true' : undefined}
                        onClick={e => handleNavClick(e, url)}
                        className={`nav-fade-down inline-block rounded-md px-2.5 py-2.5 transition-colors hover:text-[#00B8DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB] ${
                          isActive ? 'text-[#00B8DB]' : 'text-muted-foreground'
                        }`}
                      >
                        <span className="mr-[5px] text-left text-[#00B8DB]">{String(i + 1).padStart(2, '0')}.</span>
                        {name}
                      </a>
                    </li>
                  )
                })}
              </ol>
              {/* Resume hidden until public/resume.pdf ships — avoids 404 at hiring moment. */}
            </div>

            <div className="nav-fade-down">
              <ThemeToggle />
            </div>

            <Menu activeHash={activeHash} />
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar

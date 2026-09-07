import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { LinkButton } from '@/components/ui/button'
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

const Logo = () => (
  <a
    href="#top"
    aria-label="home"
    className="font-mono text-lg font-bold tracking-tight text-foreground transition-colors hover:opacity-80"
  >
    <span className="text-[#00B8DB]">//</span>
    <span>A</span>
    <span className="logo-cursor ml-[1px] text-[#00B8DB]">_</span>
  </a>
)

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [resolved, setResolved] = useState<'dark' | 'light'>(() =>
    typeof window !== 'undefined' &&
    document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'
  )

  useEffect(() => {
    if (theme === 'dark' || theme === 'light') {
      setResolved(theme)
      return
    }
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => setResolved(mq.matches ? 'dark' : 'light')
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [theme])

  return (
    <AnimatedThemeToggler
      theme={resolved}
      onThemeChange={t => setTheme(t)}
      duration={600}
      className="flex size-9 cursor-pointer items-center justify-center rounded-md bg-transparent text-muted-foreground transition-colors hover:bg-transparent hover:text-[#00B8DB] [&_svg]:size-4"
    />
  )
}

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

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
        onClick={() => setMenuOpen(open => !open)}
        aria-label="Menu"
        aria-expanded={menuOpen}
        className="relative z-40 flex size-8 items-center justify-center border-0 bg-transparent p-2 text-foreground outline-none"
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
        aria-hidden={!menuOpen}
        className={`fixed inset-y-0 right-0 z-30 flex h-screen w-[min(75vw,400px)] flex-col items-center justify-center border-l border-border bg-card px-2.5 py-[50px] shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.3)] outline-none transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ visibility: menuOpen ? 'visible' : 'hidden' }}
      >
        <nav className="flex w-full flex-col items-center gap-2 text-center font-mono text-foreground">
          <ol className="m-0 flex w-full list-none flex-col p-0">
            {NAV_LINKS.map(({ url, name }, i) => (
              <li key={i} className="relative my-1 text-lg">
                <a
                  href={url}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-5 py-1 text-foreground transition-colors hover:text-[#00B8DB]"
                >
                  <span className="block text-sm text-[#00B8DB]">{String(i + 1).padStart(2, '0')}.</span>
                  {name}
                </a>
              </li>
            ))}
          </ol>
          <LinkButton href="/resume.pdf" variant="outline" className="mt-4 px-12 py-4 text-[#00B8DB]">
            Resume
          </LinkButton>
        </nav>
      </aside>
    </div>
  )
}
interface NavbarProps {
  isHome?: boolean
}

const Navbar = ({ isHome = false }: NavbarProps) => {
  const [scrolledToTop, setScrolledToTop] = useState(true)
  const scrollDirection = useScrollDirection('down')

  const handleScroll = () => {
    setScrolledToTop(window.scrollY < 50)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => void window.removeEventListener('scroll', handleScroll)
  }, [])

  const hidden = scrollDirection === 'down' && !scrolledToTop

  const resumeButton = (
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="nav-fade-down inline-block px-2.5 py-2.5 text-muted-foreground transition-colors hover:text-[#00B8DB]"
      style={{ transitionDelay: `${isHome ? NAV_LINKS.length * 100 : 0}ms` }}
    >
      <span className="mr-[5px] text-left text-[#00B8DB]">
        {String(NAV_LINKS.length + 1).padStart(2, '0')}.
      </span>
      Resume
    </a>
  )

  return (
    <header
      className={`fixed top-0 left-0 z-40 flex w-full items-center justify-between bg-transparent px-6 transition-transform duration-300 md:px-10 lg:px-12 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ height: scrolledToTop ? '5rem' : '4rem' }}
    >
      <nav
        className="relative z-30 flex w-full items-center justify-between font-mono text-foreground"
        style={{ counterReset: 'item 0' } as CSSProperties}
      >
        <Logo />

        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden items-center md:flex">
            <ol className="m-0 flex list-none p-0">
              {NAV_LINKS.map(({ url, name }, i) => (
                <li key={i} className="relative mx-[5px] text-xs">
                  <a
                    href={url}
                    className="nav-fade-down inline-block px-2.5 py-2.5 text-muted-foreground transition-colors hover:text-[#00B8DB]"
                    style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}
                  >
                    <span className="mr-[5px] text-left text-[#00B8DB]">{String(i + 1).padStart(2, '0')}.</span>
                    {name}
                  </a>
                </li>
              ))}
            </ol>
            <div className="relative mx-[5px] text-xs">{resumeButton}</div>
          </div>

          <div
            className="nav-fade-down"
            style={{ transitionDelay: `${isHome ? (NAV_LINKS.length + 1) * 100 : 0}ms` }}
          >
            <ThemeToggle />
          </div>

          <Menu />
        </div>
      </nav>
    </header>
  )
}

export default Navbar

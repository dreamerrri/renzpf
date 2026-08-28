import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { LinkButton } from '@/components/ui/button'
import TextType from '@/components/TextType'

type ScrollDirection = 'up' | 'down'

interface NavLink {
  name: string
  url: string
}

const NAV_LINKS: NavLink[] = [
  { name: 'About', url: '/#about' },
  { name: 'Experience', url: '/#jobs' },
  { name: 'Work', url: '/#projects' },
  { name: 'Contact', url: '/#contact' }
]

/** Tracks whether the user is scrolling up or down (used to hide the navbar). */
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
    href="/"
    aria-label="home"
    className="font-mono text-lg font-semibold text-foreground transition-colors hover:text-[#00B8DB]"
  >
    <TextType
      text="Andrew"
      typingSpeed={135}
      initialDelay={200}
      cursorCharacter="_"
      cursorBlinkDuration={0.6}
    />
  </a>
)

/** Mobile hamburger + slide-in sidebar. */
function Menu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  // Close when resized back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Close when clicking outside
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
      className="ml-4 inline-flex h-9 items-center rounded border border-[#00B8DB] px-4 text-xs text-[#00B8DB] transition-colors hover:bg-[#00B8DB] hover:text-background"
    >
      Resume
    </a>
  )

  return (
    <header
      className={`fixed top-0 left-0 z-40 flex w-full items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md transition-transform duration-300 md:px-10 lg:px-12 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ height: scrolledToTop ? '5rem' : '4rem' }}
    >
      <nav
        className="relative z-30 flex w-full items-center justify-between font-mono text-foreground"
        style={{ counterReset: 'item 0' } as CSSProperties}
      >
        <Logo />

        {/* Desktop links + resume */}
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
          <div className="nav-fade-down" style={{ transitionDelay: `${isHome ? NAV_LINKS.length * 100 : 0}ms` }}>
            {resumeButton}
          </div>
        </div>

        <Menu />
      </nav>
    </header>
  )
}

export default Navbar
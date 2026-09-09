import { useState } from 'react'
import { GithubLogo, EnvelopeSimple } from '@phosphor-icons/react'
import Reveal from '@/components/Reveal'
import SpecularButton from '@/components/SpecularButton'

const EMAIL = 'andrewrennn@gmail.com'

export default function Footer() {
  const year = new Date().getFullYear()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const backToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (t: number, o?: Record<string, unknown>) => void }
      }
    ).__lenis
    if (lenis) {
      if (reduced) {
        lenis.scrollTo(0, { immediate: true, force: true })
      } else {
        lenis.scrollTo(0)
      }
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    }
  }

  return (
    <footer id="contact" className="relative z-[1200] scroll-mt-24 bg-background">
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-transparent via-[#00B8DB]/40 to-transparent opacity-80"
      />
      <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-16 text-center">
        <Reveal>
          <p className="font-mono text-sm text-[#00B8DB]">
            <span className="mr-2 text-muted-foreground">04.</span> Contact
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">Open to work — let&apos;s talk</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            I reply within 24 hours — tell me the role and timeline, and I&apos;ll walk
            through the repo.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 flex justify-center">
            <SpecularButton
              lineColor="#00B8DB"
              size="md"
              href={`mailto:${EMAIL}`}
            >
              Email me
            </SpecularButton>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-muted-foreground">
            <a
              href="https://github.com/dreamerrri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub — open profile"
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 py-2 font-mono text-xs transition-colors hover:text-[#00B8DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB]"
            >
              <GithubLogo size={20} />
              GitHub
            </a>
            {/* LinkedIn removed until a real profile URL is confirmed — generic linkedin.com/ fails silently. */}
            <a
              href={`mailto:${EMAIL}`}
              aria-label={`Email ${EMAIL}`}
              className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-md px-3 py-2 font-mono text-xs transition-colors hover:text-[#00B8DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB]"
            >
              <EnvelopeSimple size={20} className="shrink-0" />
              <span className="break-all">Email</span>
            </a>
          </div>
        </Reveal>
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
        <p className="font-mono text-xs text-muted-foreground">
          © {year} <span className="text-[#00B8DB]">//A_</span> — built fast, accessible,
          detail-obsessed.
        </p>
        <button
          type="button"
          onClick={backToTop}
          className="rounded-md font-mono text-xs text-muted-foreground transition-colors hover:text-[#00B8DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB]"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}

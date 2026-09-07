import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react'
import Reveal from '@/components/Reveal'
import SpecularButton from '@/components/SpecularButton'

export default function Footer() {
  const year = new Date().getFullYear()

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
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">Get in touch</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Open to work — my inbox is always open. I&apos;ll get back to you as soon as I can.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 flex justify-center">
            <SpecularButton
              lineColor="#00B8DB"
              size="md"
              onClick={() => (window.location.href = 'mailto:you@example.com')}
            >
              you@example.com
            </SpecularButton>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-muted-foreground">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-[#00B8DB]"
          >
            <GithubLogo size={20} />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-[#00B8DB]"
          >
            <LinkedinLogo size={20} />
          </a>
          <a
            href="mailto:you@example.com"
            aria-label="Email"
            className="transition-colors hover:text-[#00B8DB]"
          >
            <EnvelopeSimple size={20} />
          </a>
          </div>
        </Reveal>
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
        <p className="font-mono text-xs text-muted-foreground">
          © {year} <span className="text-foreground">Andrew</span> — All rights reserved.
        </p>
        <button
          type="button"
          onClick={() => {
            const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: Record<string, unknown>) => void } }).__lenis
            if (lenis) {
              lenis.scrollTo(0, { immediate: true, force: true })
            } else {
              window.scrollTo({ top: 0 })
            }
          }}
          className="cursor-pointer font-mono text-xs text-muted-foreground transition-colors hover:text-[#00B8DB]"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import TextType from '@/components/TextType'
import ProfileBadge from '@/components/ProfileBadge'
import SpecularButton from '@/components/SpecularButton'
import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react'

const ROLES = ['Frontend Developer', 'UI Engineer', 'Backend Developer', 'Chill Guy']
const LONGEST_ROLE_CH = Math.max(...ROLES.map(r => r.length))

function RotatingRole({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reducedMotion || paused) return
    const current = words[wordIndex % words.length]
    let t: number

    if (!deleting && subIndex === current.length) {
      t = window.setTimeout(() => setDeleting(true), 1600)
    } else if (deleting && subIndex === 0) {
      t = window.setTimeout(() => {
        setDeleting(false)
        setWordIndex(i => (i + 1) % words.length)
      }, 60)
    } else {
      t = window.setTimeout(
        () => setSubIndex(s => s + (deleting ? -1 : 1)),
        deleting ? 40 : 90
      )
    }

    return () => window.clearTimeout(t)
  }, [deleting, subIndex, wordIndex, words, paused, reducedMotion])

  if (reducedMotion) {
    return (
      <span aria-live="polite" className="inline-block text-[#00B8DB]" style={{ minWidth: `${LONGEST_ROLE_CH}ch` }}>
        {words[0]}
      </span>
    )
  }

  const currentWord = words[wordIndex % words.length]

  return (
    <span
      aria-live="polite"
      aria-atomic="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="inline-block text-[#00B8DB]"
      style={{ minWidth: `${LONGEST_ROLE_CH}ch` }}
   
    >
      <span aria-hidden="true">{currentWord.slice(0, subIndex)}<span className="animate-pulse motion-reduce:animate-none">|</span></span>
      <span className="sr-only">{currentWord}</span>
    </span>
  )
}

const ACCENT = '#00B8DB'

export default function UglyHero() {
  return (
    <section id="about" className="relative z-10 mx-auto flex min-h-svh max-w-5xl scroll-mt-24 flex-col justify-center px-6 md:px-12">
      <p className="mb-4 font-mono text-sm text-[#00B8DB]">
        <span className="mr-2 text-muted-foreground">01.</span> Hi, my name is
      </p>

      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="min-w-0 flex-1">
          <h1 className="text-5xl font-black leading-tight text-foreground sm:text-6xl md:text-7xl">
            <TextType
              text="Andrew"
              typingSpeed={150}
              initialDelay={400}
              cursorCharacter="_"
              cursorBlinkDuration={0.6}
            />
            <span className="text-[#00B8DB]">.</span>
          </h1>

          <p className="mt-4 min-h-[1.5em] text-2xl font-semibold text-muted-foreground md:text-4xl">
            I’m a&nbsp;<RotatingRole words={ROLES} />
          </p>
        </div>

        <ProfileBadge
          dragRange={160}
          photoSrc="/tree.png"
          stickerSrc="/man.png"
          className="shrink-0 self-start md:self-auto"
        />
      </div>

      <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
        I build fast, accessible, and detail-obsessed experiences for the web. From
        pixel-perfect UI to silky interactions, I care about the craft and the people
        who use it.
      </p>
      

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <SpecularButton
          lineColor={ACCENT}
          className="mt-0"
          href="mailto:andrewrennn@gmail.com"
        >
          Get in touch
        </SpecularButton>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-xs text-muted-foreground">
        <span className="inline-flex min-h-11 items-center">
          <span className="text-[#00B8DB]">●</span>&nbsp;Open to work
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <a
            href="https://github.com/dreamerrri"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex size-11 items-center justify-center rounded-md transition-colors hover:text-[#00B8DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB]"
          >
            <GithubLogo size={20} />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex size-11 items-center justify-center rounded-md transition-colors hover:text-[#00B8DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB]"
          >
            <LinkedinLogo size={20} />
          </a>
          <a
            href="mailto:andrewrennn@gmail.com"
            aria-label="Email andrewrennn@gmail.com"
            className="inline-flex min-h-11 max-w-full items-center gap-2 break-all rounded-md px-2 py-2 transition-colors hover:text-[#00B8DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8DB]"
          >
            <EnvelopeSimple size={20} className="shrink-0" />
            <span className="break-all">andrewrennn@gmail.com</span>
          </a>
        </span>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted-foreground md:block">
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="2" />
          <circle cx="10" cy="9" r="3" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}

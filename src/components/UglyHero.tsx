import { useEffect, useState } from 'react'
import TextType from '@/components/TextType'
import ProfileBadge from '@/components/ProfileBadge'
import SpecularButton from '@/components/SpecularButton'

const ROLES = ['Frontend Dev', 'UI Engineer', 'Backend Dev', 'Chill Guy']

function RotatingRole({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let t: number

    if (!deleting && subIndex === current.length) {
      t = setTimeout(() => setDeleting(true), 1600)
    } else if (deleting && subIndex === 0) {
      t = setTimeout(() => {
        setDeleting(false)
        setWordIndex(i => (i + 1) % words.length)
      }, 60)
    } else {
      t = setTimeout(
        () => setSubIndex(s => s + (deleting ? -1 : 1)),
        deleting ? 40 : 90
      )
    }

    return () => clearTimeout(t)
  }, [deleting, subIndex, wordIndex, words])

  return <span className="text-[#00B8DB]">{words[wordIndex % words.length].slice(0, subIndex)}</span>
}

const ACCENT = '#00B8DB'

export default function UglyHero() {
  return (
    <section className="relative z-10 mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-6 md:px-12">
      <p className="mb-4 font-mono text-sm text-[#00B8DB]">
        <span className="mr-2 text-muted-foreground">01.</span> Hi, my name is
      </p>

      <div className="flex items-center justify-between gap-6 md:gap-10">
        <div className="min-w-0 flex-1">
          <h1 className="text-5xl font-black leading-tight text-foreground md:text-7xl">
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
          className="shrink-0"
        />
      </div>

      <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
        I build fast, accessible, and detail-obsessed experiences for the web. From
        pixel-perfect UI to silky interactions, I care about the craft and the people
        who use it.
      </p>
      

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <SpecularButton lineColor={ACCENT} className="mt-0">
          Get in touch
        </SpecularButton>
      </div>

      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted-foreground">
        <span>
          <span className="text-[#00B8DB]">●</span> Open to work
        </span>
        <span>React · TypeScript · Tailwind · Vite</span>
        <a href="mailto:you@example.com" className="hover:text-[#00B8DB]">
          you@example.com
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-muted-foreground md:block">
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="2" />
          <circle cx="10" cy="9" r="3" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}

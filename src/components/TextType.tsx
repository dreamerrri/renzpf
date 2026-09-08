import { useEffect, useRef, useState, type ElementType } from 'react'
import { gsap } from 'gsap'

interface TextTypeProps {
  text: string | string[]
  as?: ElementType
  typingSpeed?: number
  initialDelay?: number
  cursorCharacter?: string
  cursorClassName?: string
  cursorBlinkDuration?: number
  className?: string
}

function TextType({
  text,
  as: Tag = 'span',
  typingSpeed = 135,
  initialDelay = 0,
  cursorCharacter = '_',
  cursorClassName = '',
  cursorBlinkDuration = 0.1,
  className = ''
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const cursorRef = useRef<HTMLSpanElement>(null)

  const textArray = Array.isArray(text) ? text : [text]
  const targetText = textArray[0] ?? ''

  const doneTyping = reducedMotion || currentCharIndex >= targetText.length

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setReducedMotion(mq.matches)
      if (mq.matches) {
        setDisplayedText(targetText)
        setCurrentCharIndex(targetText.length)
      }
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [targetText])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    if (reducedMotion) {
      gsap.set(cursor, { opacity: 1 })
      return
    }

    gsap.set(cursor, { opacity: 1 })
    const tween = gsap.to(cursor, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    })

    return () => {
      tween.kill()
    }
  }, [cursorBlinkDuration, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const start = setTimeout(
      () => {
        if (doneTyping) return
        setDisplayedText(targetText.slice(0, currentCharIndex + 1))
        setCurrentCharIndex(idx => idx + 1)
      },
      currentCharIndex === 0 ? initialDelay : typingSpeed
    )
    return () => clearTimeout(start)
  }, [currentCharIndex, targetText, typingSpeed, initialDelay, doneTyping, reducedMotion])

  return (
    <Tag className={`text-type ${className}`}>
      <span className="text-type__content">{displayedText}</span>
      <span ref={cursorRef} className={`text-type__cursor ${cursorClassName}`}>
        {cursorCharacter}
      </span>
    </Tag>
  )
}

export default TextType

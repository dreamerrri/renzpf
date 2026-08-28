import { useEffect, useRef, useState, type ElementType } from 'react'
import { gsap } from 'gsap'

interface TextTypeProps {
  /** The text to type out. */
  text: string | string[]
  /** Element to render as. */
  as?: ElementType
  /** Milliseconds between each typed character. */
  typingSpeed?: number
  /** Delay in ms before typing starts. */
  initialDelay?: number
  /** Character rendered as the blinking cursor. */
  cursorCharacter?: string
  /** Extra classes for the cursor element. */
  cursorClassName?: string
  /** Cursor blink cycle duration in *seconds*. */
  cursorBlinkDuration?: number
  className?: string
}

/**
 * TypeScript port of React Bits' `TextType` (text type animation).
 * Uses `gsap` for the cursor blink exactly like the original component
 * (https://reactbits.dev/text-animations/text-type).
 */
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
  const cursorRef = useRef<HTMLSpanElement>(null)

  const textArray = Array.isArray(text) ? text : [text]
  // Single static headline: type the first string once, then keep the cursor blinking.
  const targetText = textArray[0] ?? ''

  const doneTyping = currentCharIndex >= targetText.length

  // Blink the cursor continuously with gsap (matches the original implementation).
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

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
  }, [cursorBlinkDuration])

  // Type characters one-by-one until the headline is complete, then stop.
  useEffect(() => {
    const start = setTimeout(
      () => {
        if (doneTyping) return
        setDisplayedText(targetText.slice(0, currentCharIndex + 1))
        setCurrentCharIndex(idx => idx + 1)
      },
      currentCharIndex === 0 ? initialDelay : typingSpeed
    )
    return () => clearTimeout(start)
  }, [currentCharIndex, targetText, typingSpeed, initialDelay, doneTyping])

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
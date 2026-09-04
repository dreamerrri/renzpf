/**
 * Vendored from `cursor-pet` by Pankaj Ghosh (MIT License):
 * https://github.com/iampankajghosh/cursor-pet
 *
 * Adapted with a "parked" mode: while `parked` is true the pet renders
 * in normal flow (e.g. as a grid item behind another element) instead
 * of fixed-positioned. When it wakes (`enabled` flips true) it snaps to
 * the `anchorRef` element's center pre-paint, so it appears to emerge
 * from behind that element before flying to the cursor.
 */
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type RefObject,
} from 'react'

export interface SpriteFrame {
  x: number
  y: number
  duration: number
}

export type ToggleModifier = 'alt' | 'ctrl' | 'shift' | 'meta'

interface CursorPetProps {
  spriteImage: string
  spriteSize?: number
  moveFrames?: readonly SpriteFrame[]
  idleFrames?: readonly SpriteFrame[]
  speed?: number
  reactionDelay?: number
  stopDistance?: number
  homeStopDistance?: number
  toggleKey?: string
  toggleModifier?: ToggleModifier
  enabled?: boolean
  className?: string
  parked?: boolean
  anchorRef?: RefObject<HTMLElement | null>
}

interface Position {
  x: number
  y: number
}

interface MovementArgs {
  speed: number
  spriteSize: number
  reactionDelay: number
  stopDistance: number
  homeStopDistance: number
  toggleKey: string
  toggleModifier: ToggleModifier
  positionRef: RefObject<Position>
  targetRef: RefObject<Position>
  lastMouseRef: RefObject<Position>
  scaleXRef: RefObject<number>
  isMovingRef: RefObject<boolean>
  isActiveRef: RefObject<boolean>
  movementDelayTimeoutRef: RefObject<ReturnType<typeof setTimeout> | null>
  rafRef: RefObject<number | null>
  renderTransform: () => void
}

function useCursorPetMovement({
  speed,
  spriteSize,
  reactionDelay,
  stopDistance,
  homeStopDistance,
  toggleKey,
  toggleModifier,
  positionRef,
  targetRef,
  lastMouseRef,
  scaleXRef,
  isMovingRef,
  isActiveRef,
  movementDelayTimeoutRef,
  rafRef,
  renderTransform,
}: MovementArgs) {
  const normalizedToggleKey = toggleKey.toLowerCase()

  useEffect(() => {
    let mounted = true
    const tick = () => {
      if (!mounted) return
      const current = positionRef.current
      const target = targetRef.current
      const dx = target.x - current.x
      const dy = target.y - current.y
      const distance = Math.hypot(dx, dy)
      const threshold = isActiveRef.current ? stopDistance : homeStopDistance
      if (isMovingRef.current) {
        if (distance > threshold) {
          const angle = Math.atan2(dy, dx)
          current.x += Math.cos(angle) * speed
          current.y += Math.sin(angle) * speed
          if (dx > 1) {
            scaleXRef.current = 1
          } else if (dx < -1) {
            scaleXRef.current = -1
          }
        } else {
          isMovingRef.current = false
          if (!isActiveRef.current) {
            scaleXRef.current = 1
          }
        }
        renderTransform()
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      mounted = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [
    speed,
    stopDistance,
    homeStopDistance,
    positionRef,
    targetRef,
    scaleXRef,
    isMovingRef,
    isActiveRef,
    rafRef,
    renderTransform,
  ])

  useEffect(() => {
    const startMovement = () => {
      const dx = targetRef.current.x - positionRef.current.x
      const dy = targetRef.current.y - positionRef.current.y
      const distance = Math.hypot(dx, dy)
      if (distance > stopDistance && isActiveRef.current) {
        isMovingRef.current = true
      }
      movementDelayTimeoutRef.current = null
    }
    const handleMouseMove = (event: MouseEvent) => {
      const nextPosition = {
        x: event.clientX - spriteSize / 2,
        y: event.clientY - spriteSize / 2,
      }
      lastMouseRef.current = nextPosition
      if (!isActiveRef.current) return
      targetRef.current = nextPosition
      if (isMovingRef.current) return
      if (!movementDelayTimeoutRef.current) {
        movementDelayTimeoutRef.current = setTimeout(startMovement, reactionDelay)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifierPressed =
        (toggleModifier === 'alt' && event.altKey) ||
        (toggleModifier === 'ctrl' && event.ctrlKey) ||
        (toggleModifier === 'shift' && event.shiftKey) ||
        (toggleModifier === 'meta' && event.metaKey)
      if (modifierPressed && event.key.toLowerCase() === normalizedToggleKey) {
        event.preventDefault()
        isActiveRef.current = !isActiveRef.current
        if (!isActiveRef.current) {
          targetRef.current = { x: 0, y: 0 }
          if (movementDelayTimeoutRef.current) {
            clearTimeout(movementDelayTimeoutRef.current)
            movementDelayTimeoutRef.current = null
          }
        } else {
          targetRef.current = { ...lastMouseRef.current }
        }
        isMovingRef.current = true
      }
    }
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isMovingRef.current = false
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (movementDelayTimeoutRef.current) {
        clearTimeout(movementDelayTimeoutRef.current)
      }
    }
  }, [
    reactionDelay,
    spriteSize,
    stopDistance,
    normalizedToggleKey,
    toggleModifier,
    positionRef,
    targetRef,
    lastMouseRef,
    isMovingRef,
    isActiveRef,
    movementDelayTimeoutRef,
  ])
}

const DEFAULT_SPRITE_SIZE = 32
const DEFAULT_MOVE_FRAMES: readonly SpriteFrame[] = [
  { x: 0, y: 0, duration: 110 },
  { x: -32, y: 0, duration: 110 },
  { x: -64, y: 0, duration: 110 },
  { x: -96, y: 0, duration: 110 },
  { x: -128, y: 0, duration: 110 },
  { x: -160, y: 0, duration: 110 },
]
const DEFAULT_IDLE_FRAMES: readonly SpriteFrame[] = [
  { x: 0, y: -32, duration: 100 },
  { x: -32, y: -32, duration: 100 },
  { x: -64, y: -32, duration: 120 },
  { x: -96, y: -32, duration: 120 },
  { x: -128, y: -32, duration: 400 },
  { x: -160, y: -32, duration: 500 },
  { x: 0, y: -64, duration: 120 },
  { x: -32, y: -64, duration: 120 },
  { x: -64, y: -64, duration: 80 },
  { x: -96, y: -64, duration: 80 },
  { x: -128, y: -64, duration: 150 },
  { x: -160, y: -64, duration: 400 },
]

export default function CursorPet({
  spriteImage,
  spriteSize = DEFAULT_SPRITE_SIZE,
  moveFrames = DEFAULT_MOVE_FRAMES,
  idleFrames = DEFAULT_IDLE_FRAMES,
  speed = 1.6,
  reactionDelay = 250,
  stopDistance = 24,
  homeStopDistance = 4,
  toggleKey = 'c',
  toggleModifier = 'alt',
  enabled = true,
  className = '',
  parked = false,
  anchorRef,
}: CursorPetProps) {
  const petRef = useRef<HTMLSpanElement>(null)
  const positionRef = useRef<Position>({ x: 0, y: 0 })
  const targetRef = useRef<Position>({ x: 0, y: 0 })
  const lastMouseRef = useRef<Position>({ x: 0, y: 0 })
  const scaleXRef = useRef<number>(1)
  const isMovingRef = useRef<boolean>(false)
  const isActiveRef = useRef<boolean>(enabled)
  const animationStateRef = useRef<'idle' | 'moving'>('idle')
  const frameIndexRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)
  const spriteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const movementDelayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const renderTransform = () => {
    const el = petRef.current
    if (!el) return
    el.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) scaleX(${scaleXRef.current})`
  }
  const renderFrame = (frame: SpriteFrame) => {
    const el = petRef.current
    if (!el) return
    el.style.backgroundPosition = `${frame.x}px ${frame.y}px`
  }

  useEffect(() => {
    if (isActiveRef.current === enabled) return
    isActiveRef.current = enabled
    if (!enabled) {
      targetRef.current = { x: 0, y: 0 }
      if (movementDelayTimeoutRef.current) {
        clearTimeout(movementDelayTimeoutRef.current)
        movementDelayTimeoutRef.current = null
      }
    } else {
      targetRef.current = { ...lastMouseRef.current }
    }
    isMovingRef.current = true
  }, [enabled])

  useLayoutEffect(() => {
    if (!enabled || parked) return
    const anchor = anchorRef?.current
    if (!anchor) return
    const rect = anchor.getBoundingClientRect()
    positionRef.current = {
      x: rect.left + rect.width / 2 - spriteSize / 2,
      y: rect.top + rect.height / 2 - spriteSize / 2,
    }
    renderTransform()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, parked])

  useCursorPetMovement({
    speed,
    spriteSize,
    reactionDelay,
    stopDistance,
    homeStopDistance,
    toggleKey,
    toggleModifier,
    positionRef,
    targetRef,
    lastMouseRef,
    scaleXRef,
    isMovingRef,
    isActiveRef,
    movementDelayTimeoutRef,
    rafRef,
    renderTransform,
  })

  useEffect(() => {
    let mounted = true
    const animateSprite = () => {
      if (!mounted) return
      const nextState = isMovingRef.current ? 'moving' : 'idle'
      const frames = nextState === 'moving' ? moveFrames : idleFrames
      if (animationStateRef.current !== nextState) {
        animationStateRef.current = nextState
        frameIndexRef.current = 0
      }
      const frame = frames[frameIndexRef.current]
      renderFrame(frame)
      frameIndexRef.current = (frameIndexRef.current + 1) % frames.length
      spriteTimeoutRef.current = setTimeout(animateSprite, frame.duration)
    }
    animateSprite()
    return () => {
      mounted = false
      if (spriteTimeoutRef.current) {
        clearTimeout(spriteTimeoutRef.current)
      }
    }
  }, [moveFrames, idleFrames])

  const baseStyle: CSSProperties = {
    width: spriteSize,
    height: spriteSize,
    pointerEvents: 'none',
    userSelect: 'none',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
    backgroundImage: `url(${spriteImage})`,
    backgroundSize: `${spriteSize * 6}px ${spriteSize * 3}px`,
    backgroundPosition: `0px -${spriteSize}px`,
  }

  if (parked) {
    return <span ref={petRef} aria-hidden="true" className={className} style={baseStyle} />
  }

  return (
    <span
      ref={petRef}
      aria-hidden="true"
      className={className}
      style={{
        ...baseStyle,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        backfaceVisibility: 'hidden',
        willChange: 'transform, background-position',
        contain: 'layout style paint',
        transform: 'translate3d(0px, 0px, 0px)',
      }}
    />
  )
}

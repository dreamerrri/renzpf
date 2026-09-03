import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProfileBadgeProps {
  /** Main photo underneath. Placeholder by default — swap for a real portrait. */
  photoSrc?: string
  /** Draggable sticker layered on top. Placeholder by default. */
  stickerSrc?: string
  name?: string
  /** Max drag distance in px in any direction. */
  dragRange?: number
  className?: string
}

const DEFAULT_DRAG_RANGE = 160
const PLACEHOLDER_PHOTO = 'https://picsum.photos/seed/profile-placeholder/320/320'
const PLACEHOLDER_STICKER = 'https://picsum.photos/seed/profile-sticker/320/320'

/**
 * Native port of the draggable profile-badge hero pattern:
 * a framed portrait with a grabbable sticker on top, subtle
 * cursor parallax, and a dashed-frame active state.
 * No animation dependencies — pointer events + CSS transitions only.
 */
export default function ProfileBadge({
  photoSrc = PLACEHOLDER_PHOTO,
  stickerSrc = PLACEHOLDER_STICKER,
  name = 'Profile photo',
  dragRange = DEFAULT_DRAG_RANGE,
  className,
}: ProfileBadgeProps) {
  const [drag, setDrag] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [active, setActive] = useState(false)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)

  const frameRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const parallaxZone = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const dragDistance = Math.hypot(drag.x, drag.y)
  const reveal = Math.min(dragDistance / dragRange, 1)
  // At rest the sticker covers the photo, so the photo sits dimmed;
  // dragging the sticker aside reveals it (mirrors the original).
  const photoOpacity = 0.55 + reveal * 0.45
  const photoScale = 0.96 + reveal * 0.04

  const handleDragMove = (clientX: number, clientY: number) => {
    const start = dragStart.current
    if (!start) return
    const clamp = (v: number) => Math.max(-dragRange, Math.min(dragRange, v))
    setDrag({ x: clamp(clientX - start.x), y: clamp(clientY - start.y) })
  }

  const endDrag = () => {
    dragStart.current = null
    setDrag({ x: 0, y: 0 })
    setDragging(false)
    setPressed(false)
    setActive(false)
  }

  return (
    <div
      ref={parallaxZone}
      className={cn('relative w-fit touch-none select-none', className)}
      onPointerMove={e => {
        if (dragging || pressed || reducedMotion) return
        if (e.pointerType === 'touch') return
        const el = parallaxZone.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const relX = e.clientX - (rect.left + rect.width / 2)
        const relY = e.clientY - (rect.top + rect.height / 2)
        const clampP = (v: number) => Math.max(-16, Math.min(16, v))
        setParallax({ x: clampP(relX / 10), y: clampP(relY / 10) })
      }}
      onPointerLeave={() => setParallax({ x: 0, y: 0 })}
    >
      <div
        style={
          reducedMotion
            ? undefined
            : {
                transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
                transition: dragging ? 'none' : 'transform 0.3s ease-out',
              }
        }
        className="will-change-transform"
      >
        <div
          ref={frameRef}
          className="relative grid size-28 p-1.5 xl:size-36"
        >
          {/* Solid frame — hidden while hovering / dragging */}
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 rounded-2xl border border-border',
              active && 'hidden'
            )}
          />
          {/* Dashed frame — shown while hovering / dragging */}
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute -inset-px rounded-2xl border border-dashed border-border',
              !active && 'hidden'
            )}
          />

          <img
            src={photoSrc}
            alt={name}
            width={320}
            height={320}
            draggable={false}
            className="col-start-1 row-start-1 h-full w-full rounded-xl object-cover"
            style={{ opacity: photoOpacity, transform: `scale(${photoScale})` }}
          />
          <img
            src={stickerSrc}
            alt=""
            aria-hidden="true"
            width={320}
            height={320}
            draggable={false}
            className="col-start-1 row-start-1 z-[1] h-full w-full rounded-xl object-cover"
            style={{
              transform: `translate3d(${drag.x}px, ${drag.y}px, 0) scale(${pressed ? 0.9 : 1})`,
              transition: dragging
                ? 'none'
                : 'transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)',
              touchAction: 'none',
            }}
          />
        </div>
      </div>

      {/* Grab layer over the badge */}
      <div
        className="-inset-2 absolute z-[2]"
        style={{ cursor: dragging || pressed ? 'grabbing' : 'grab', touchAction: 'none' }}
        onPointerDown={e => {
          ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
          dragStart.current = { x: e.clientX - drag.x, y: e.clientY - drag.y }
          setDragging(true)
          setPressed(true)
          setActive(true)
        }}
        onPointerMove={e => {
          if (dragStart.current) handleDragMove(e.clientX, e.clientY)
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={e => {
          setActive(true)
        }}
        onPointerLeave={e => {
          if (!dragStart.current && !pressed) setActive(false)
        }}
      />
    </div>
  )
}

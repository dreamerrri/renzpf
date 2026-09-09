import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
// Important Note: re-added after the 5b1ec32 revert — vendored UFO pet parked
// behind the sticker; remove this import if the pet gets its own package.
import CursorPet from '@/components/CursorPet'

interface ProfileBadgeProps {
  photoSrc?: string
  stickerSrc?: string
  name?: string
  dragRange?: number
  className?: string
}

const DEFAULT_DRAG_RANGE = 160
const PLACEHOLDER_PHOTO = 'https://picsum.photos/seed/profile-placeholder/320/320'
const PLACEHOLDER_STICKER = 'https://picsum.photos/seed/profile-sticker/320/320'

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
  // Important Note: re-added after the 5b1ec32 revert — one-way latch that wakes
  // the parked UFO pet on first real drag. Revisit if the pet moves out.
  const [petAwake, setPetAwake] = useState(false)
  const revealedRef = useRef(false)

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

  // Preload the UFO sprite without rendering it, so the easter egg stays
  // hidden until first drag but still appears instantly on wake. Rendering
  // the parked pet in-flow spoiled it two ways: (1) man.png is RGBA with
  // transparent corners, so a 32px pet between photo and sticker shows
  // through, and (2) ufo.png (small) usually paints before man.png (large),
  // flashing the UFO before the sticker covers it.
  useEffect(() => {
    if (reducedMotion) return
    const img = new Image()
    img.src = '/ufo.png'
    // Hint the decoder so wake has no first-frame jank.
    if (typeof (img as { decode?: () => Promise<void> }).decode === 'function') {
      ;(img as { decode: () => Promise<void> }).decode().catch(() => {})
    }
  }, [reducedMotion])

  // Important Note: re-added after the 5b1ec32 revert — dimming removed so the
  // bottom layer stays at full opacity. To restore the original rest-dim
  // effect, replace the two lines below with:
  //   const dragDistance = Math.hypot(drag.x, drag.y)
  //   const reveal = Math.min(dragDistance / dragRange, 1)
  //   const photoOpacity = 0.55 + reveal * 0.45
  //   const photoScale = 0.96 + reveal * 0.04
  const photoOpacity = 1
  const photoScale = 1

  const handleDragMove = (clientX: number, clientY: number) => {
    const start = dragStart.current
    if (!start) return
    const clamp = (v: number) => Math.max(-dragRange, Math.min(dragRange, v))
    const nx = clamp(clientX - start.x)
    const ny = clamp(clientY - start.y)
    setDrag({ x: nx, y: ny })
    // Important Note: re-added after the 5b1ec32 revert — wakes the parked UFO
    // pet once per mount when the sticker is dragged past 40px.
    if (!revealedRef.current && Math.hypot(nx, ny) >= 40) {
      revealedRef.current = true
      setPetAwake(true)
    }
  }

  const endDrag = () => {
    dragStart.current = null
    setDrag({ x: 0, y: 0 })
    setDragging(false)
    setPressed(false)
    setActive(false)
  }

  // Important Note: UFO pet element. Nothing renders in-flow before wake
  // (keeps the easter egg hidden); on wake it mounts once via portal to
  // document.body and snaps to the frame center pre-paint, then flies to
  // the cursor. Skipped under reduced motion. Shortcut remapped off Alt+C.
  const petNode =
    !reducedMotion && petAwake ? (
      <CursorPet
        spriteImage="/ufo.png"
        enabled={petAwake}
        parked={false}
        anchorRef={frameRef}
        toggleKey="0"
        toggleModifier="meta"
      />
    ) : null

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
        const clampP = (v: number) => Math.max(-24, Math.min(24, v))
        setParallax({ x: clampP(relX / 6), y: clampP(relY / 6) })
      }}
      onPointerLeave={() => setParallax({ x: 0, y: 0 })}
    >
      <div
        // Important Note: parallax transform stays on permanently now — the pet
        // portals out of this subtree on wake, so fixed positioning is safe.
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
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 rounded-2xl border border-border',
              active && 'hidden'
            )}
          />
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
          {/* UFO easter egg: nothing parked here — pet mounts via portal below
              only after first drag, so no flash before man.png loads and no
              peek-through via man.png's transparent corners. */}
          <img
            src={stickerSrc}
            alt=""
            aria-hidden="true"
            width={320}
            height={320}
            draggable={false}
            className="col-start-1 row-start-1 z-[1] h-full w-full rounded-xl bg-transparent object-cover"
            style={{
              transform: `translate3d(${drag.x}px, ${drag.y}px, 0) scale(${pressed ? 0.9 : 1})`,
              transition: dragging
                ? 'none'
                : 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
              touchAction: 'none',
            }}
          />
        </div>
      </div>

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
        onPointerEnter={() => {
          setActive(true)
        }}
        onPointerLeave={() => {
          if (!dragStart.current && !pressed) setActive(false)
        }}
      />
      {petNode ? createPortal(petNode, document.body) : null}
    </div>
  )
}

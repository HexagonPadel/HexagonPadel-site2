'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { useDrag } from '@use-gesture/react'

const TOTAL_FRAMES = 1038

export default function Raquette360Viewer() {
  const [frameIndex, setFrameIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [transformOrigin, setTransformOrigin] = useState('50% 50%')
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const containerRef = useRef(null)
  const viewerRef = useRef(null)

  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `/raquette360/frame_${String(i).padStart(3, '0')}.png`
      img.onload = () => setImagesLoaded(prev => prev + 1)
    }
  }, [])

  const bind = useDrag(({ delta: [dx], last }) => {
    if (!last) {
      const delta = Math.round(-dx / 1.5) //vitesse de rotation
      setFrameIndex(prev => (prev + delta + TOTAL_FRAMES) % TOTAL_FRAMES)
    }
  })

  const handleWheel = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const el = viewerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    if (
      offsetX < 0 || offsetX > rect.width ||
      offsetY < 0 || offsetY > rect.height
    ) {
      return
    }

    setZoom(prevZoom => {
      let nextZoom = prevZoom - e.deltaY * 0.001
      nextZoom = Math.min(Math.max(nextZoom, 1), 2)

      if (nextZoom === 1) {
        setOffset({ x: 0, y: 0 })
        setTransformOrigin('50% 50%')
      } else {
        const originX = offsetX / rect.width
        const originY = offsetY / rect.height
        setTransformOrigin(`${originX * 100}% ${originY * 100}%`)

        const zoomDelta = nextZoom - prevZoom
        const dx = (originX - 0.5) * zoomDelta * rect.width
        const dy = (originY - 0.5) * zoomDelta * rect.height

        setOffset(({ x, y }) => ({
          x: x - dx,
          y: y - dy,
        }))
      }

      return nextZoom
    })
  }

  useEffect(() => {
    const el = viewerRef.current
    if (!el) return

    const wheelListener = (e) => {
      handleWheel(e)
    }

    el.addEventListener('wheel', wheelListener, { passive: false })

    return () => {
      el.removeEventListener('wheel', wheelListener)
    }
  }, [handleWheel])

  const paddedIndex = String(frameIndex + 1).padStart(3, '0')
  const imagePath = `/raquette360/frame_${paddedIndex}.png`

  const progress = useMemo(
    () => Math.min((imagesLoaded / TOTAL_FRAMES) * 100, 100),
    [imagesLoaded]
  )

  return (
    <div
      {...bind()}
      ref={containerRef}
      className="relative mx-auto flex flex-col items-center justify-center cursor-ew-resize touch-none select-none"
      style={{ height: '100vh', maxHeight: '100dvh' }}
    >
      {imagesLoaded < TOTAL_FRAMES ? (
        <div className="flex flex-col items-center gap-4 text-gray-500 font-medium">
          <div>Chargement {Math.round(progress)}%</div>
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div
          ref={viewerRef}
          tabIndex={0}
          className="relative w-[360px] h-[560px] md:w-[480px] md:h-[560px] rounded-2xl bg-gradient-to-b from-white via-gray-100 to-gray-50 shadow-[inset_0_10px_20px_rgba(0,0,0,0.05),inset_0_-10px_20px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(240,240,240,0.6) 40%, rgba(230,230,230,0.2) 100%)',
          }}
        >

          {/* Image de la raquette */}
          <img
            src={imagePath}
            alt={`Raquette frame ${paddedIndex}`}
            draggable={false}
            className="object-contain drop-shadow-xl mt-4"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              transformOrigin,
              maxWidth: '100%',
              maxHeight: 'calc(100% - 80px)',
            }}
          />

          {/* Logo 360° sous la raquette */}
          <div className="mt-auto mb-4">
            <img
              src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/logos-icons//360-view.webp"
              alt="360° view icon"
              className="w-28 md:w-30 h-auto opacity-90"
            />
          </div>
        </div>
      )}
    </div>
  )
}
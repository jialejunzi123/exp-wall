import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface HorizontalGalleryProps {
  images: string[]
  alt: string
}

// 横向滚动图片展廊：图片按原始比例完整显示，随页面滚动驱动 translateX
export default function HorizontalGallery({ images, alt }: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // 实测需要平移的距离，保证最后一张图完整露出
  useEffect(() => {
    const measure = () => {
      if (containerRef.current && trackRef.current) {
        setDistance(
          trackRef.current.scrollWidth - containerRef.current.clientWidth + 12,
        )
      }
    }
    measure()
    window.addEventListener('resize', measure)
    const timer = window.setTimeout(measure, 300)
    return () => {
      window.removeEventListener('resize', measure)
      window.clearTimeout(timer)
    }
  }, [images])

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  return (
    <div ref={containerRef} className="h-full w-full overflow-hidden">
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex h-full w-max gap-2 sm:gap-3"
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`${alt} ${index + 1}`}
            loading="lazy"
            className="h-full w-auto shrink-0 rounded-2xl object-contain"
          />
        ))}
      </motion.div>
    </div>
  )
}

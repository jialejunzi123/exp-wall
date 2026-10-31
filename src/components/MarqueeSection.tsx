import { useEffect, useRef, useState } from 'react'
import { MARQUEE_IMAGES } from '../data/images'

const ROW_ONE = MARQUEE_IMAGES.slice(0, 11)
const ROW_TWO = MARQUEE_IMAGES.slice(11, 21)

// 数组三倍复制实现无缝循环
const tripled = (arr: string[]) => [...arr, ...arr, ...arr]

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let rafId = 0

    const update = () => {
      rafId = 0
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.offsetTop
      // 滚动偏移计算公式
      setOffset(
        (window.scrollY - sectionTop + window.innerHeight) * 0.3,
      )
    }

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] py-16"
    >
      {/* 第一行：向右 */}
      <div
        className="flex w-max gap-3"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
        }}
      >
        {tripled(ROW_ONE).map((src, index) => (
          <img
            key={`row1-${index}`}
            src={src}
            alt="marquee row 1"
            loading="lazy"
            className="h-[270px] w-[420px] rounded-2xl object-cover"
          />
        ))}
      </div>

      {/* 第二行：向左 */}
      <div
        className="flex w-max gap-3"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: 'transform',
        }}
      >
        {tripled(ROW_TWO).map((src, index) => (
          <img
            key={`row2-${index}`}
            src={src}
            alt="marquee row 2"
            loading="lazy"
            className="h-[270px] w-[420px] rounded-2xl object-cover"
          />
        ))}
      </div>
    </section>
  )
}

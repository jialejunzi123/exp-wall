import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { PROJECTS, type ProjectItem } from '../data/images'
import HorizontalGallery from './HorizontalGallery'

const TOTAL_CARDS = PROJECTS.length

/* 左侧文案列 */
function TextColumn({ project }: { project: ProjectItem }) {
  return (
    <div className="flex w-2/5 flex-col gap-2 overflow-hidden sm:gap-3">
      {project.paragraphs.map((text, pIndex) => (
        <p
          key={pIndex}
          className="font-light leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(0.68rem, 1.15vw, 0.98rem)' }}
        >
          {text}
        </p>
      ))}
    </div>
  )
}

/* 静态双图（纵向堆叠） */
function StaticStack({ images, name }: { images: string[]; name: string }) {
  return (
    <div className="flex min-h-0 w-3/5 flex-col gap-2 sm:gap-3">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${name} ${i + 1}`}
          loading="lazy"
          className="min-h-0 w-full flex-1 rounded-2xl object-cover"
        />
      ))}
    </div>
  )
}

/* 卡片 1/3 定制：左列文案+底部横图（完整显示），右列竖图缩小后完整显示 */
function SplitContainLayout({
  project,
  leftRatio,
  leftAlt,
  rightAlt,
}: {
  project: ProjectItem
  leftRatio: string
  leftAlt: string
  rightAlt: string
}) {
  const [leftImg, rightImg] = project.images
  return (
    <>
      <div className="flex min-h-0 w-2/5 flex-col gap-2 sm:gap-3">
        <div className="flex flex-col gap-2 sm:gap-3">
          {project.paragraphs.map((text, pIndex) => (
            <p
              key={pIndex}
              className="font-light leading-relaxed text-[#D7E2EA]"
              style={{ fontSize: 'clamp(0.68rem, 1.15vw, 0.98rem)' }}
            >
              {text}
            </p>
          ))}
        </div>
        <img
          src={leftImg}
          alt={leftAlt}
          loading="lazy"
          className="mt-auto w-full rounded-2xl object-contain"
          style={{ aspectRatio: leftRatio }}
        />
      </div>
      <div className="flex min-h-0 w-3/5 items-center justify-center overflow-hidden">
        <img
          src={rightImg}
          alt={rightAlt}
          loading="lazy"
          className="h-full w-auto rounded-2xl object-contain"
        />
      </div>
    </>
  )
}

interface ProjectCardProps {
  project: ProjectItem
  index: number
  progress: MotionValue<number>
  baseTop: number
}

function ProjectCard({ project, index, progress, baseTop }: ProjectCardProps) {
  // targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * 0.03
  const scale = useTransform(
    progress,
    [index / TOTAL_CARDS, 1],
    [1, targetScale],
  )

  return (
    <div className="h-[85vh]">
      <motion.article
        style={{ scale, top: baseTop + index * 28 }}
        className="sticky flex h-[70vh] flex-col gap-3 rounded-3xl border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:gap-5 sm:p-7 md:h-[72vh]"
      >
        {/* 顶部行：大序号 + 项目名/标签 */}
        <div className="flex items-start justify-between gap-3">
          <span
            className="font-black leading-none text-[#D7E2EA]"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
          >
            {project.number}
          </span>
          <div className="flex flex-col items-end gap-1.5">
            <h3
              className="font-bold uppercase leading-tight text-[#D7E2EA]"
              style={{ fontSize: 'clamp(1.05rem, 3vw, 2.2rem)' }}
            >
              {project.name}
            </h3>
            {project.tag && (
              <span className="rounded-full border border-[#D7E2EA]/60 px-3 py-0.5 text-[10px] uppercase tracking-wider text-[#D7E2EA] sm:text-xs">
                {project.tag}
              </span>
            )}
          </div>
        </div>

        {/* 按卡片定制内容区 */}
        <div className="flex min-h-0 flex-1 gap-3 sm:gap-5">
          {index === 0 && (
            <SplitContainLayout
              project={project}
              leftRatio="1280 / 720"
              leftAlt="搬运喵宣传海报"
              rightAlt="小程序首页"
            />
          )}
          {index === 1 && (
            <>
              <TextColumn project={project} />
              <div className="min-h-0 w-3/5">
                <HorizontalGallery images={project.images} alt={project.name} />
              </div>
            </>
          )}
          {index === 2 && (
            <SplitContainLayout
              project={project}
              leftRatio="1200 / 340"
              leftAlt="流量使用情况"
              rightAlt="薄肌计划"
            />
          )}
          {index === 3 && (
            <>
              <TextColumn project={project} />
              <StaticStack images={project.images} name={project.name} />
            </>
          )}
        </div>
      </motion.article>
    </div>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 响应式基准 top：top-24(96px) / md:top-32(128px)
  const [isMd, setIsMd] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const onChange = () => setIsMd(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <section
      id="projects"
      className="relative z-10 -mt-16 rounded-t-[2.5rem] bg-[#0C0C0C] md:rounded-t-[4rem]"
    >
      <h2
        className="hero-heading px-6 pb-8 pt-16 font-black uppercase leading-none sm:px-10 sm:pt-20"
        style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
      >
        Project
      </h2>

      <div ref={containerRef}>
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            progress={scrollYProgress}
            baseTop={isMd ? 128 : 96}
          />
        ))}
      </div>

      {/* Contact 锚点 */}
      <span id="contact" className="block" />
    </section>
  )
}

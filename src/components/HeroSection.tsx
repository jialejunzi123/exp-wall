import ContactButton from './ContactButton'
import FadeIn from './FadeIn'
import StarfieldBackground from './StarfieldBackground'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col justify-between overflow-x-clip px-6 py-7 sm:px-10 sm:py-9">
      {/* Three.js 星云星空背景 */}
      <StarfieldBackground />

      {/* 导航栏 */}
      <FadeIn delay={0} className="relative z-10">
        <nav className="flex items-center gap-8 sm:gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-base"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* 大标题 */}
      <div className="relative z-10 flex flex-1 items-center">
        <FadeIn delay={0.15} y={40} className="w-full overflow-hidden">
          <h1 className="hero-heading font-black uppercase leading-none text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            嘉乐的小家
          </h1>
        </FadeIn>
      </div>

      {/* 底部左右布局 */}
      <div className="relative z-10 flex items-end justify-between gap-6">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[280px] text-xs font-light uppercase leading-relaxed text-[#D7E2EA] sm:max-w-none sm:text-sm">
            Vibecoding Portfolio · Creative Developer
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

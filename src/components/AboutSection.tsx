import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'
import FadeIn from './FadeIn'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-24 sm:gap-12"
    >
      <FadeIn>
        <h2
          className="hero-heading text-center font-black uppercase leading-none"
          style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
        >
          About me
        </h2>
      </FadeIn>

      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <AnimatedText
          text="一名热爱vibecoding的开发者"
          className="max-w-[560px] text-center font-light leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1.4rem, 3.6vw, 2.4rem)' }}
        />
        <AnimatedText
          text="同时也热衷于魂类游戏"
          className="max-w-[560px] text-center font-light leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}
        />
      </div>

      <FadeIn delay={0.2}>
        <ContactButton />
      </FadeIn>

      {/* 右下角学校信息 */}
      <div className="absolute bottom-24 right-6 text-right font-light leading-relaxed text-[#D7E2EA] sm:bottom-28 sm:right-10">
        <p className="text-base sm:text-lg">北京科技大学</p>
        <p className="text-base sm:text-lg">物联网工程大三</p>
        <p className="text-base sm:text-lg">本科在读</p>
      </div>
    </section>
  )
}

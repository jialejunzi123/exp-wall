import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import AuroraBackground from './components/AuroraBackground'
import InkClickEffect from './components/InkClickEffect'

export default function App() {
  return (
    <div className="app-container font-kanit">
      <AuroraBackground />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ProjectsSection />
      <InkClickEffect />
    </div>
  )
}

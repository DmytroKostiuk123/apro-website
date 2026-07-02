import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Portfolio from './components/Portfolio.jsx'
import Pricing from './components/Pricing.jsx'
import Process from './components/Process.jsx'
import Principles from './components/Principles.jsx'
import WorkMarquee from './components/WorkMarquee.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <Pricing />
          <Process />
          <Principles />
          <WorkMarquee />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LanguageProvider>
  )
}

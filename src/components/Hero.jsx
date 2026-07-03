import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import SkeletonImage from './SkeletonImage.jsx'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="top" className="relative flex min-h-dvh items-center overflow-hidden">
      <div className="absolute inset-0 bg-ink">
        <SkeletonImage
          src="/images/covers/screen_01.webp"
          alt={t.hero.imageAlt}
          tone="dark"
          className="relative h-full w-full"
          imgClassName="hero-kenburns"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/70 to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-7xl 2xl:max-w-[88rem] px-5 pb-20 pt-36 sm:px-8 sm:pb-24"
      >
        <motion.h1
          variants={item}
          className="max-w-3xl font-display text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl 2xl:max-w-4xl 2xl:text-7xl"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
          {t.hero.subtitle}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-white shadow-xl shadow-gold/30 transition-all duration-200 hover:bg-gold-bright hover:shadow-2xl hover:shadow-gold-bright/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t.hero.ctaPrimary}
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        <motion.p variants={item} className="mt-5 flex items-center gap-2 text-sm font-medium text-white/75">
          <ShieldCheck size={16} className="shrink-0 text-gold-bright" aria-hidden="true" />
          {t.hero.badge}
        </motion.p>

        <motion.dl
          variants={item}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-4 2xl:max-w-4xl"
        >
          {t.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-semibold text-white sm:text-4xl">{stat.value}</dd>
              <dd className="mt-1 text-sm leading-snug text-white/70">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  )
}

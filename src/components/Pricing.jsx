import { motion } from 'framer-motion'
import { ArrowRight, Building2, Gem, Hammer, PenTool } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const TIER_ICONS = { secondary: Hammer, newbuild: Building2, elite: Gem }

export default function Pricing() {
  const { t } = useLang()

  return (
    <section id="pricing" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.title}
          description={t.pricing.description}
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.pricing.tiers.map((tier, index) => {
            const Icon = TIER_ICONS[tier.id]
            return (
              <motion.article
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`relative flex flex-col items-center rounded-2xl border bg-white px-8 py-10 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10 ${
                  tier.featured ? 'border-gold/40 ring-1 ring-gold/30' : 'border-line'
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3.5 rounded-full bg-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-gold/30">
                    {t.pricing.featuredBadge}
                  </span>
                )}
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-gold">{tier.name}</p>
                <span className="mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft">
                  <Icon size={26} className="text-gold" aria-hidden="true" />
                </span>
                <p className="mt-5 text-sm uppercase tracking-wide text-stone-warm">{tier.subtitle}</p>
                <p className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
                  {t.pricing.from} {tier.price}
                  <span className="text-xl text-stone-warm"> {t.pricing.perUnit}</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{tier.description}</p>
              </motion.article>
            )
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-center gap-6 rounded-2xl bg-ink px-8 py-10 text-center text-white sm:px-12 lg:flex-row lg:text-left">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10">
              <PenTool size={26} className="text-gold-bright" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-2xl">{t.pricing.banner.title}</h3>
              <p className="mt-2 leading-relaxed text-white/70">{t.pricing.banner.text}</p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-gold/25 transition-all duration-200 hover:bg-gold-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t.pricing.banner.cta}
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

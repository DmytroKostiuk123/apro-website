import { motion } from 'framer-motion'
import { Ban, HandCoins, Heart, ShieldCheck, Users, Video } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'

const ICONS = [Ban, Users, HandCoins, Video, Heart, ShieldCheck]

export default function Principles() {
  const { t } = useLang()

  return (
    <section className="bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow={t.principles.eyebrow}
            title={<span className="text-white">{t.principles.title}</span>}
          />
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {t.principles.items.map((principle, index) => {
            const Icon = ICONS[index % ICONS.length]
            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <Icon size={22} className="text-gold-bright" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-xl">{principle.title}</h3>
                <p className="mt-2.5 leading-relaxed text-white/70">{principle.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

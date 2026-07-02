import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function Process() {
  const { t } = useLang()

  return (
    <section id="process" className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow={t.process.eyebrow}
        title={t.process.title}
        description={t.process.description}
        align="center"
      />

      <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {t.process.steps.map((step, index) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative pl-16"
          >
            <span
              className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold-soft font-display text-lg font-semibold text-gold"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display text-xl text-ink">{step.title}</h3>
            <p className="mt-2.5 leading-relaxed text-ink-soft">{step.description}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

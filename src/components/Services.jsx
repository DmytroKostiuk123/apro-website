import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'
import SkeletonImage from './SkeletonImage.jsx'

export default function Services() {
  const { t } = useLang()

  return (
    <section id="services" className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        description={t.services.description}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {t.services.items.map((service, index) => (
          <motion.article
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10 xl:flex-row"
          >
            <div className="relative h-56 overflow-hidden sm:h-64 xl:h-auto xl:w-[45%] xl:shrink-0">
              <SkeletonImage
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="absolute inset-0"
                imgClassName="group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <h3 className="absolute bottom-4 left-5 font-display text-2xl text-white sm:text-[1.75rem]">
                {service.title}
              </h3>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
              <p className="leading-relaxed text-ink-soft">{service.description}</p>
              <ul className="mt-auto space-y-2.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                    <Check size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

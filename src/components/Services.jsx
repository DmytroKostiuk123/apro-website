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
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10 xl:min-h-[22rem] xl:flex-row"
          >
            <div className="relative h-72 overflow-hidden sm:h-80 xl:h-auto xl:w-[55%] xl:shrink-0">
              <SkeletonImage
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="absolute inset-0"
                imgClassName="group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <h3 className="absolute bottom-5 left-6 right-6 font-display text-3xl text-white sm:text-4xl">
                {service.title}
              </h3>
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-base font-medium text-ink">
                    <Check size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
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

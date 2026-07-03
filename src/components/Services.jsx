import { motion } from 'framer-motion'
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
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10"
          >
            <SkeletonImage
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="absolute inset-0"
              imgClassName="group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <h3 className="absolute bottom-6 left-7 right-7 font-display text-3xl text-white sm:text-4xl">
              {service.title}
            </h3>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

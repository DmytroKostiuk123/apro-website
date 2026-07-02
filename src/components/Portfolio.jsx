import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'
import SkeletonImage from './SkeletonImage.jsx'

export default function Portfolio() {
  const { t } = useLang()
  const [filter, setFilter] = useState('all')
  const visibleCases =
    filter === 'all' ? t.portfolio.cases : t.portfolio.cases.filter((c) => c.category === filter)

  return (
    <section id="portfolio" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t.portfolio.eyebrow}
            title={t.portfolio.title}
            description={t.portfolio.description}
          />
          <div className="flex flex-wrap gap-2" role="group" aria-label={t.portfolio.filterLabel}>
            {t.portfolio.filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  filter === f.id
                    ? 'bg-ink text-white'
                    : 'bg-ivory text-ink-soft hover:bg-gold-soft hover:text-ink'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visibleCases.map((project) => (
              <motion.figure
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <SkeletonImage
                  src={project.image}
                  alt={`${project.title} — ${project.tag}`}
                  loading="lazy"
                  className="absolute inset-0"
                  imgClassName="group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-bright">
                    {project.tag}
                  </p>
                  <p className="mt-1 font-display text-xl text-white">{project.title}</p>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

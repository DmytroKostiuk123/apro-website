import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'
import SkeletonImage from './SkeletonImage.jsx'
import Reveal from './Reveal.jsx'

function CaseGrid({ cases }) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {cases.map((project, index) => (
        <motion.figure
          key={project.id}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
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
    </div>
  )
}

export default function Portfolio() {
  const { t } = useLang()

  return (
    <section id="portfolio" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.portfolio.eyebrow}
          title={t.portfolio.title}
          description={t.portfolio.description}
        />

        {t.portfolio.groups.map((group) => (
          <div key={group.id} className="mt-14">
            <Reveal>
              <div className="flex items-center gap-4">
                <h3 className="font-display text-2xl text-ink sm:text-3xl">{group.label}</h3>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
                <span className="text-sm font-semibold text-stone-warm">
                  {t.portfolio.cases.filter((c) => c.category === group.id).length}
                </span>
              </div>
            </Reveal>
            <CaseGrid cases={t.portfolio.cases.filter((c) => c.category === group.id)} />
          </div>
        ))}
      </div>
    </section>
  )
}

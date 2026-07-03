import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'
import SkeletonImage from './SkeletonImage.jsx'
import Reveal from './Reveal.jsx'

function CaseCard({ project, className = '' }) {
  return (
    <figure className={`group relative aspect-[4/3] overflow-hidden rounded-2xl ${className}`}>
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
    </figure>
  )
}

/* Мобільна карусель: свайп + стрілки + крапки */
function MobileCarousel({ cases, prevLabel, nextLabel }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  const onScroll = () => {
    const el = trackRef.current
    if (!el || !el.firstElementChild) return
    const slideWidth = el.firstElementChild.offsetWidth + 16 // gap-4
    setIndex(Math.min(cases.length - 1, Math.round(el.scrollLeft / slideWidth)))
  }

  const scrollToSlide = (i) => {
    const el = trackRef.current
    if (!el || !el.children[i]) return
    const slideWidth = el.firstElementChild.offsetWidth + 16
    el.scrollTo({ left: i * slideWidth, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cases.map((project) => (
          <CaseCard key={project.id} project={project} className="w-[82%] shrink-0 snap-center" />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5" aria-hidden="true">
          {cases.map((c, i) => (
            <span
              key={c.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-gold' : 'w-1.5 bg-line'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollToSlide(Math.max(0, index - 1))}
            disabled={index === 0}
            aria-label={prevLabel}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSlide(Math.min(cases.length - 1, index + 1))}
            disabled={index === cases.length - 1}
            aria-label={nextLabel}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

function DesktopGrid({ cases }) {
  return (
    <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {cases.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <CaseCard project={project} />
        </motion.div>
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

        {t.portfolio.groups.map((group) => {
          const groupCases = t.portfolio.cases.filter((c) => c.category === group.id)
          return (
            <div key={group.id} className="mt-14">
              <Reveal>
                <div className="mb-8 flex items-center gap-4">
                  <h3 className="font-display text-2xl text-ink sm:text-3xl">{group.label}</h3>
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                  <span className="text-sm font-semibold text-stone-warm">{groupCases.length}</span>
                </div>
              </Reveal>
              <div className="sm:hidden">
                <MobileCarousel
                  cases={groupCases}
                  prevLabel={t.portfolio.prevLabel}
                  nextLabel={t.portfolio.nextLabel}
                />
              </div>
              <DesktopGrid cases={groupCases} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

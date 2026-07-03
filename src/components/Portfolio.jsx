import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'
import SkeletonImage from './SkeletonImage.jsx'
import Reveal from './Reveal.jsx'

function CaseCard({ project, onOpen, className = '' }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
      aria-label={`${project.title} — ${project.tag}`}
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
    </button>
  )
}

/* Мобільна карусель: свайп + стрілки + крапки */
function MobileCarousel({ cases, prevLabel, nextLabel, onOpen }) {
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
          <CaseCard
            key={project.id}
            project={project}
            onOpen={() => onOpen(project)}
            className="w-[82%] shrink-0 snap-center"
          />
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

function DesktopGrid({ cases, onOpen }) {
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
          <CaseCard project={project} onOpen={() => onOpen(project)} />
        </motion.div>
      ))}
    </div>
  )
}

/* Лайтбокс: велике фото на весь екран + навігація */
function Lightbox({ cases, index, setIndex, onClose, prevLabel, nextLabel, closeLabel }) {
  const project = cases[index]

  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + cases.length) % cases.length),
    [cases.length, setIndex],
  )
  const goNext = useCallback(() => setIndex((i) => (i + 1) % cases.length), [cases.length, setIndex])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — ${project.tag}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X size={22} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goPrev() }}
        aria-label={prevLabel}
        className="absolute left-3 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
      >
        <ChevronLeft size={26} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goNext() }}
        aria-label={nextLabel}
        className="absolute right-3 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
      >
        <ChevronRight size={26} aria-hidden="true" />
      </button>

      <AnimatePresence mode="wait">
        <motion.figure
          key={project.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex max-h-full max-w-5xl flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={import.meta.env.BASE_URL + project.image.replace(/^\//, '')}
            alt={`${project.title} — ${project.tag}`}
            className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl"
          />
          <figcaption className="mt-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-bright">
              {project.tag}
            </p>
            <p className="mt-1 font-display text-xl text-white sm:text-2xl">{project.title}</p>
            <p className="mt-2 text-sm text-white/50">
              {index + 1} / {cases.length}
            </p>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  )
}

export default function Portfolio() {
  const { t } = useLang()
  // Один лайтбокс на групу: зберігаємо масив + активний індекс
  const [lightbox, setLightbox] = useState(null) // { cases, index }

  const openLightbox = (groupCases, project) => {
    setLightbox({ cases: groupCases, index: groupCases.findIndex((c) => c.id === project.id) })
  }

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
                  onOpen={(project) => openLightbox(groupCases, project)}
                />
              </div>
              <DesktopGrid
                cases={groupCases}
                onOpen={(project) => openLightbox(groupCases, project)}
              />
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            cases={lightbox.cases}
            index={lightbox.index}
            setIndex={(updater) =>
              setLightbox((lb) => ({
                ...lb,
                index: typeof updater === 'function' ? updater(lb.index) : updater,
              }))
            }
            onClose={() => setLightbox(null)}
            prevLabel={t.portfolio.prevLabel}
            nextLabel={t.portfolio.nextLabel}
            closeLabel={t.portfolio.closeLabel}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

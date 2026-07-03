import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion'
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
        {cases.map((project, i) => (
          <motion.div
            key={project.id}
            className="w-[82%] shrink-0 snap-center"
            initial={{ opacity: 0, y: 70, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: (i % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <CaseCard project={project} onOpen={() => onOpen(project)} />
          </motion.div>
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
          initial={{ opacity: 0, y: 70, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <CaseCard project={project} onOpen={() => onOpen(project)} />
        </motion.div>
      ))}
    </div>
  )
}

const SPRING = { type: 'spring', stiffness: 320, damping: 36 }
const SLIDE_FRACTION = 0.8 // активне фото займає 80% ширини, сусіди «зазирають» по краях

/* Лайтбокс: горизонтальний слайдер із drag-свайпом та превʼю сусідніх фото */
function Lightbox({ cases, index, setIndex, onClose, prevLabel, nextLabel, closeLabel }) {
  const project = cases[index]
  const viewportRef = useRef(null)
  const [width, setWidth] = useState(0)
  const x = useMotionValue(0)
  const firstRun = useRef(true)

  const slideW = width * SLIDE_FRACTION
  const centerOffset = (width * (1 - SLIDE_FRACTION)) / 2
  const targetX = centerOffset - index * slideW

  const clamp = (i) => Math.max(0, Math.min(cases.length - 1, i))
  const goPrev = useCallback(() => setIndex((i) => clamp(i - 1)), [setIndex])
  const goNext = useCallback(() => setIndex((i) => clamp(i + 1)), [setIndex])

  // Вимірюємо ширину вʼюпорта (та слухаємо ресайз)
  useLayoutEffect(() => {
    const measure = () => setWidth(viewportRef.current?.offsetWidth || 0)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Плавно доводимо стрічку до активного слайда (миттєво при першому відкритті)
  useEffect(() => {
    if (!width) return
    if (firstRun.current) {
      x.set(targetX)
      firstRun.current = false
      return
    }
    const controls = animate(x, targetX, SPRING)
    return controls.stop
  }, [targetX, width, x])

  // Клавіатура + блокування прокрутки фону
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

  const handleDragEnd = (_e, info) => {
    const threshold = slideW * 0.18
    let next = index
    if (info.offset.x < -threshold || info.velocity.x < -450) next = clamp(index + 1)
    else if (info.offset.x > threshold || info.velocity.x > 450) next = clamp(index - 1)
    if (next === index) animate(x, targetX, SPRING) // повертаємо на місце
    else setIndex(next)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/92 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — ${project.tag}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute right-4 top-4 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X size={22} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goPrev() }}
        disabled={index === 0}
        aria-label={prevLabel}
        className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:pointer-events-none disabled:opacity-30 sm:left-6"
      >
        <ChevronLeft size={26} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goNext() }}
        disabled={index === cases.length - 1}
        aria-label={nextLabel}
        className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:pointer-events-none disabled:opacity-30 sm:right-6"
      >
        <ChevronRight size={26} aria-hidden="true" />
      </button>

      {/* Вʼюпорт слайдера — на всю ширину, сусіди визирають по краях */}
      <div
        ref={viewportRef}
        className="w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="flex cursor-grab items-center active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: centerOffset - (cases.length - 1) * slideW,
            right: centerOffset,
          }}
          dragElastic={0.14}
          onDragEnd={handleDragEnd}
        >
          {cases.map((p, i) => (
            <div
              key={p.id}
              className="flex shrink-0 items-center justify-center px-2 sm:px-3"
              style={{ width: slideW || '80%' }}
            >
              <img
                src={import.meta.env.BASE_URL + p.image.replace(/^\//, '')}
                alt={`${p.title} — ${p.tag}`}
                draggable={false}
                className={`max-h-[74vh] w-full select-none rounded-xl object-cover shadow-2xl transition-opacity duration-300 ${
                  i === index ? 'opacity-100' : 'opacity-40'
                }`}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <figcaption
        className="mt-5 px-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-bright">
          {project.tag}
        </p>
        <p className="mt-1 font-display text-xl text-white sm:text-2xl">{project.title}</p>
        <p className="mt-2 text-sm text-white/50">
          {index + 1} / {cases.length}
        </p>
      </figcaption>
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

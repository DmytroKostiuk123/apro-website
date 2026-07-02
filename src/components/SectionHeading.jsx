import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : ''
  return (
    <div className={`max-w-2xl ${alignment}`}>
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )
}

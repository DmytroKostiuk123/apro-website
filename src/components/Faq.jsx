import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'

function FaqItem({ item, isOpen, onToggle, id }) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <span className="font-display text-lg text-ink sm:text-xl">{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-gold"
          aria-hidden="true"
        >
          <Plus size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const { t } = useLang()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} align="center" />
      <div className="mt-12 border-t border-line">
        {t.faq.items.map((item, index) => (
          <FaqItem
            key={item.question}
            id={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </section>
  )
}

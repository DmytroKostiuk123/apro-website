import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { PHONES } from '../data/content.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import LangSwitcher from './LangSwitcher.jsx'

export default function Navbar() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-ivory/90 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl 2xl:max-w-[88rem] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-1.5" aria-label="A-PRO">
          <span
            className={`font-display text-2xl font-semibold tracking-wide transition-colors ${
              scrolled || menuOpen ? 'text-ink' : 'text-white'
            }`}
          >
            A-PRO
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-bright">
            design & repair
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {t.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold-bright ${
                scrolled ? 'text-ink-soft' : 'text-white/85'
              }`}
            >
              {link.label}
            </a>
          ))}
          <LangSwitcher light={!scrolled} />
          <a
            href={`tel:${PHONES[0].tel}`}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-gold/25 transition-all duration-200 hover:bg-gold-bright hover:shadow-gold-bright/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Phone size={16} aria-hidden="true" />
            {PHONES[0].display}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LangSwitcher light={!scrolled && !menuOpen} />
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
              scrolled || menuOpen ? 'text-ink' : 'text-white'
            }`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-line bg-ivory/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {t.nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-gold-soft hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${PHONES[0].tel}`}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-base font-semibold text-white"
              >
                <Phone size={18} aria-hidden="true" />
                {PHONES[0].display}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

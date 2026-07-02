import { LANGUAGES, useLang } from '../i18n/LanguageContext.jsx'

export default function LangSwitcher({ light = false }) {
  const { lang, setLang } = useLang()

  return (
    <div
      className={`flex items-center rounded-full border p-1 ${
        light ? 'border-white/25 bg-white/10 backdrop-blur-sm' : 'border-line bg-white/60'
      }`}
      role="group"
      aria-label="Мова / Language"
    >
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-bold tracking-wide transition-colors duration-200 ${
            lang === l.code
              ? 'bg-gold text-white'
              : light
                ? 'text-white/75 hover:text-white'
                : 'text-ink-soft hover:text-ink'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

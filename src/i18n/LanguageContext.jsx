import { createContext, useContext, useEffect, useState } from 'react'
import ua from './ua.js'
import ru from './ru.js'
import en from './en.js'

const LOCALES = { ua, ru, en }
export const LANGUAGES = [
  { code: 'ua', label: 'UA' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
]

const STORAGE_KEY = 'apro-lang'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved && LOCALES[saved] ? saved : 'ua'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: LOCALES[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}

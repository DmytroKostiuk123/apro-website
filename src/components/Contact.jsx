import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Loader2, Phone } from 'lucide-react'
import { PHONES, SOCIALS } from '../data/content.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'
import { InstagramIcon } from './SocialIcons.jsx'

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = t.contact.form.nameError
    if (!/^[\d\s()+-]{10,}$/.test(form.phone.trim())) {
      next.phone = t.contact.form.phoneError
    }
    return next
  }

  const sendToTelegram = async () => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID
    if (!token || !chatId) {
      // Бот ще не підключено: імітуємо успіх, щоб сайт можна було демонструвати
      console.warn('Telegram не налаштовано: заявку не відправлено (див. .env)')
      await new Promise((r) => setTimeout(r, 900))
      return
    }
    const text = [
      '🔔 Нова заявка з сайту A-PRO',
      `Ім'я: ${form.name.trim()}`,
      `Телефон: ${form.phone.trim()}`,
      form.message.trim() ? `Про проєкт: ${form.message.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n')
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })
    if (!res.ok) throw new Error(`Telegram API: ${res.status}`)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setStatus('sending')
    try {
      await sendToTelegram()
      setStatus('sent')
    } catch (error) {
      console.error(error)
      setStatus('failed')
    }
  }

  const field = (name) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-base text-ink placeholder:text-stone-warm/70 transition-colors focus:outline-none focus:ring-2 focus:ring-gold/60 ${
      errors[name] ? 'border-red-500' : 'border-line'
    }`

  return (
    <section id="contact" className="bg-gold-soft/60 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl 2xl:max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t.contact.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              {t.contact.title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              {t.contact.description}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 space-y-5">
              {PHONES.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="flex items-center gap-3 text-lg font-semibold text-ink transition-colors hover:text-gold"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                    <Phone size={18} className="text-gold" aria-hidden="true" />
                  </span>
                  {phone.display}
                </a>
              ))}
              <div className="flex items-start gap-3 text-ink-soft">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <Clock size={18} className="text-gold" aria-hidden="true" />
                </span>
                <div className="pt-1">
                  {t.contact.hours.map((h) => (
                    <p key={h.days} className="leading-relaxed">
                      <span className="font-semibold text-ink">{h.days}:</span> {h.time}
                    </p>
                  ))}
                </div>
              </div>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg font-semibold text-ink transition-colors hover:text-gold"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                  <InstagramIcon size={18} className="text-gold" />
                </span>
                @a_pro_repair
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:pt-2">
          {status === 'sent' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex h-full min-h-80 flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-xl shadow-ink/5"
              role="status"
            >
              <CheckCircle2 size={56} className="text-gold" aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl text-ink">
                {t.contact.form.successTitle}, {form.name.trim()}!
              </h3>
              <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">
                {t.contact.form.successText}
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl bg-white p-7 shadow-xl shadow-ink/5 sm:p-9"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
                    {t.contact.form.nameLabel} <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t.contact.form.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={field('name')}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink">
                    {t.contact.form.phoneLabel} <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t.contact.form.phonePlaceholder}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={field('phone')}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
                    {t.contact.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder={t.contact.form.messagePlaceholder}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${field('message')} resize-none`}
                  />
                </div>
              </div>
              {status === 'failed' && (
                <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700" role="alert">
                  {t.contact.form.failText}{' '}
                  <a href={`tel:${PHONES[0].tel}`} className="font-semibold underline">
                    {PHONES[0].display}
                  </a>
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-white shadow-lg shadow-gold/25 transition-all duration-200 hover:bg-gold-bright disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                    {t.contact.form.sending}
                  </>
                ) : (
                  t.contact.form.submit
                )}
              </button>
              <p className="mt-4 text-center text-sm text-stone-warm">{t.contact.form.privacy}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

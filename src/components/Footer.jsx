import { PHONES, SOCIALS } from '../data/content.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { FacebookIcon, InstagramIcon } from './SocialIcons.jsx'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-ink py-14 text-white">
      <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-5 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl font-semibold tracking-wide">A-PRO</span>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-bright">
                design & repair
              </span>
            </p>
            <p className="mt-3 max-w-xs leading-relaxed text-white/60">{t.footer.tagline}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3" aria-label={t.footer.navLabel}>
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-gold-bright"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="space-y-3">
            {PHONES.map((phone) => (
              <a
                key={phone.tel}
                href={`tel:${phone.tel}`}
                className="block text-sm font-semibold text-white/85 transition-colors hover:text-gold-bright"
              >
                {phone.display}
              </a>
            ))}
            <div className="flex gap-3 pt-1">
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram A-PRO"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={SOCIALS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook A-PRO"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-sm text-white/40">
          © {new Date().getFullYear()} A-PRO. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}

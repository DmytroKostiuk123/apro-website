// Дані, спільні для всіх мов. Усі тексти — у src/i18n/{ua,ru,en}.js
export const PHONES = [
  { display: '+38 (067) 536-37-30', tel: '+380675363730' },
  { display: '+38 (093) 009-76-57', tel: '+380930097657' },
]

export const SOCIALS = {
  instagram: 'https://www.instagram.com/a_pro_repair/',
  facebook: 'https://www.facebook.com/A_PRO_repair-105716512262909/',
}

export const WORK_PHOTOS = Array.from({ length: 11 }, (_, i) => ({
  src: `/images/work/${String(i + 1).padStart(3, '0')}.webp`,
}))

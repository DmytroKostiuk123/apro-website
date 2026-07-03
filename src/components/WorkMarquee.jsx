import { WORK_PHOTOS } from '../data/content.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'
import SkeletonImage from './SkeletonImage.jsx'

export default function WorkMarquee() {
  const { t } = useLang()

  return (
    <section id="work" className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.work.eyebrow}
          title={t.work.title}
          description={t.work.description}
        />
      </div>

      <div className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />
        <div className="marquee-track flex w-max gap-5">
          {[...WORK_PHOTOS, ...WORK_PHOTOS].map((photo, index) => (
            <SkeletonImage
              key={`${photo.src}-${index}`}
              src={photo.src}
              alt={`${t.work.photoAlt} ${(index % WORK_PHOTOS.length) + 1}`}
              loading="lazy"
              aria-hidden={index >= WORK_PHOTOS.length}
              className="relative aspect-[4/3] h-56 rounded-xl shadow-md sm:h-72"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

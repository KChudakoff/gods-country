import { motion } from 'framer-motion'
import { containerStagger, fadeUp } from './animations/motionVariants'
import { useRef } from 'react'
import { useElementParallax } from './animations/scrollMotion'

const images = [
  { src: '/images/gallery-01.jpg', meta: 'THE FIRST NIGHT — 25.08.26' },
  { src: '/images/gallery-02.jpg', meta: 'FOUNDERS' },
  { src: '/images/gallery-03.jpg', meta: 'THE CAPITAL' },
  { src: '/images/gallery-04.jpg', meta: 'EXPEDITION 001' },
  { src: '/images/gallery-05.jpg', meta: 'NIGHT WATCH' }
]

function GalleryCard({ src, meta, tall = false }: { src: string; meta: string; tall?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const y = useElementParallax(ref, [8, -12])
  return (
    <motion.figure className="overflow-hidden border border-border" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
      <div ref={ref} className="overflow-hidden">
        <motion.img src={src} alt={meta} className={`w-full ${tall ? 'h-96' : 'h-64'} object-cover object-center`} style={{ objectPosition: '50% 40%', y }} whileHover={{ scale: 1.03, filter: 'brightness(1.04)' }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} />
      </div>
      <motion.figcaption className="p-3 text-xs text-muted">
        <div className="uppercase text-[11px] tracking-wider">{meta.split('—')[0]?.trim()}</div>
        <div className="mt-1 text-[13px] font-semibold">{meta.split('—').slice(1).join('—').trim()}</div>
      </motion.figcaption>
    </motion.figure>
  )
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[5vw] leading-tight font-bold uppercase">WORLD ARCHIVE</motion.h2>

        <motion.div variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 grid grid-cols-12 gap-6 items-start">
          <div className="col-span-7">
            <GalleryCard src={images[0].src} meta={'01 — THE FIRST NIGHT — 25.08.26'} tall />
          </div>
          <div className="col-span-5 grid grid-rows-2 gap-6">
            <GalleryCard src={images[1].src} meta={'02 — FOUNDERS'} />
            <GalleryCard src={images[2].src} meta={'03 — THE CAPITAL'} />
          </div>

          <div className="col-span-12 mt-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-7">
                <GalleryCard src={images[3].src} meta={'04 — EXPEDITION 001'} />
              </div>
              <div className="col-span-5">
                <GalleryCard src={images[4].src} meta={'05 — NIGHT WATCH'} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

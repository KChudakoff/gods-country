import { motion } from 'framer-motion'
import { fadeUp } from './animations/motionVariants'
import { useRef } from 'react'
import { useElementParallax } from './animations/scrollMotion'

export default function CinematicBreak() {
  const ref = useRef<HTMLDivElement>(null)
  const y = useElementParallax(ref, [8, -12])

  return (
    <section className="pt-28 pb-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="text-xs micro text-muted">GODS COUNTRY — WORLD 00 — ARCHIVE / 001</div>

        <div className="mt-12">
          <div className="mx-auto w-11/12 md:w-9/12 image-frame rounded-sm overflow-hidden border border-border" style={{ aspectRatio: '16/9', backgroundColor: 'var(--gc-900)' }}>
            <div ref={ref} className="w-full h-full">
              <motion.img
                src="/images/gallery-03.jpg"
                alt="Cinematic world frame"
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: '50% 35%', y }}
                initial={{ opacity: 0.92 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-muted">
          <div className="uppercase tracking-wider">WORLD ARCHIVE / 001</div>
          <div className="mt-1 font-semibold">UNEXPLORED TERRITORY</div>
        </div>
      </div>
    </section>
  )
}

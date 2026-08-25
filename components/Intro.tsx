import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from './animations/motionVariants'

export default function Intro() {
  const reduce = useReducedMotion()

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 flex gap-8 items-start">
        <div className="w-7/12">
          <div className="relative">
            <div className="absolute -left-6 -top-6 micro text-muted">01</div>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[6.8vw] leading-tight font-bold uppercase">
              THIS IS<br/>GODS<br/>COUNTRY.
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-6 max-w-lg text-muted">
            GODS COUNTRY is a private survival world built slowly by a small group. No resets. No disposable seasons. Everything built here becomes part of the world's history.
          </motion.p>
          <div className="mt-6 micro text-muted">NO RUSH — NO RESETS — ARCHIVE FIRST</div>
        </div>

        <div className="w-5/12 image-frame h-[420px]">
          <img src="/images/gallery-03.jpg" alt="Intro visual placeholder" />
        </div>
      </div>
    </section>
  )
}

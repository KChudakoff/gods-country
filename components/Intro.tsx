import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from './animations/motionVariants'

export default function Intro() {
  const reduce = useReducedMotion()

  return (
    <section className="py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 flex gap-8 items-start">
        <div className="w-7/12">
          <div className="relative">
            <div className="absolute -left-8 -top-8 opacity-10 text-[18vw] font-bold">01</div>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[6.8vw] leading-tight font-bold uppercase">
              THIS IS<br/>GODS<br/>COUNTRY.
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-6 max-w-md text-muted">
            A private survival world shaped by the people inside it. No shortcuts. No pay-to-win. No disposable worlds.
          </motion.p>
        </div>

        <div className="w-5/12 image-frame h-[520px]">
          <img src="/images/gallery-03.jpg" alt="Intro visual placeholder" />
        </div>
      </div>
    </section>
  )
}

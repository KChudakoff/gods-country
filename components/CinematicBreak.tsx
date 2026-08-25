import { motion } from 'framer-motion'
import { fadeUp } from './animations/motionVariants'

export default function CinematicBreak() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="image-frame h-[520px] bg-surface flex items-end p-6 relative" style={{ backgroundColor: 'var(--gc-900)' }}>
          <div className="absolute left-6 top-6 text-xs micro">GODS COUNTRY — WORLD 00 — ARCHIVE / 001</div>
          <motion.h3 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-6xl font-bold uppercase z-10">Cinematic Frame</motion.h3>
        </div>
      </div>
    </section>
  )
}

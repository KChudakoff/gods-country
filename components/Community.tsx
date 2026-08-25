import { motion } from 'framer-motion'
import { containerStagger, fadeUp } from './animations/motionVariants'
import { useRef } from 'react'
import { useElementParallax } from './animations/scrollMotion'

export default function Community() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  const y1 = useElementParallax(ref1, [8, -12])
  const y2 = useElementParallax(ref2, [6, -18])
  const y3 = useElementParallax(ref3, [4, -24])

  return (
    <section className="py-16" style={{ background: 'var(--gc-700)' }}>
      <div className="max-w-7xl mx-auto px-6 text-center relative">
        {/* oversized background label removed to keep single dominant heading */}
        <div className="relative z-10">
          <motion.h2 variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[6vw] leading-tight font-bold uppercase">
            <motion.span ref={ref1} variants={fadeUp} style={{ y: y1 }}>BUILT BY</motion.span>
            <br />
            <motion.span ref={ref2} variants={fadeUp} style={{ y: y2 }}>THE PEOPLE</motion.span>
            <br />
            <motion.span ref={ref3} variants={fadeUp} style={{ y: y3 }}>WHO LIVE HERE.</motion.span>
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-6 max-w-2xl mx-auto text-muted">GODS COUNTRY is a persistent shared world where memories and builds remain. Join the community to participate in the next chapter.</motion.p>
          <div className="mt-8">
            <motion.a whileHover={{ y: -3, scale: 1.02 }} href="https://discord.gg/yz8FK2KehW" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-border uppercase">Join the Discord</motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

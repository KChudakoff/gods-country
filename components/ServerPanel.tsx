import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, containerStagger } from './animations/motionVariants'
import { useRef } from 'react'
import { useElementParallax } from './animations/scrollMotion'

function EnterHeading() {
  const refEnter = useRef<HTMLElement>(null)
  const refGods = useRef<HTMLElement>(null)
  const yEnter = useElementParallax(refEnter, [0, -10])
  const yGods = useElementParallax(refGods, [0, -22])

  return (
    <>
      <motion.span ref={refEnter} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ y: yEnter }}>ENTER</motion.span>
      <br />
      <motion.span ref={refGods} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.45 }} style={{ y: yGods }}>GODS COUNTRY.</motion.span>
    </>
  )
}

export default function ServerPanel() {
  const [copied, setCopied] = useState(false)
  const ip = 'play.godscountry.gg'

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(ip)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section id="server" className="py-12 border-t border-border" style={{ background: 'var(--surface-warm)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="micro text-xs mb-4">ACCESS / 04</div>
        <motion.h2 className="text-[5vw] leading-tight font-bold uppercase">
          <EnterHeading />
        </motion.h2>

        <motion.div variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-8 grid grid-cols-2 gap-8 max-w-3xl">
          <div>
            <motion.div variants={fadeUp} className="text-muted text-sm">STATUS</motion.div>
            <motion.div variants={fadeUp} className="mt-2 uppercase">ONLINE</motion.div>
          </div>
          <div>
            <motion.div variants={fadeUp} className="text-muted text-sm">PLAYERS</motion.div>
            <motion.div variants={fadeUp} className="mt-2 uppercase">6 / 30</motion.div>
          </div>
          <div>
            <motion.div variants={fadeUp} className="text-muted text-sm">VERSION</motion.div>
            <motion.div variants={fadeUp} className="mt-2 uppercase">JAVA</motion.div>
          </div>
          <div>
            <motion.div variants={fadeUp} className="text-muted text-sm">SERVER</motion.div>
              <motion.div variants={fadeUp} className="mt-2 flex items-center gap-3">
              <div className="uppercase tracking-wider">{ip}</div>
              <motion.button whileHover={{ y: -2, scale: 1.02 }} transition={{ duration: 0.45 }} onClick={handleCopy} className="px-3 py-1 border border-border text-sm uppercase text-muted hover:text-primary-text" aria-pressed={copied}>{copied ? 'COPIED' : 'COPY ADDRESS'}</motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { fadeUp, dividerGrow } from './animations/motionVariants'

const items = [
  {
    id: '01',
    title: 'SURVIVAL',
    tag: 'CORE',
    body: 'Vanilla at its core. Every resource is earned. Every journey matters.'
  },
  {
    id: '02',
    title: 'PROXIMITY',
    tag: 'VOICE',
    body: 'Voice exists inside the world. Walk away and voices disappear.'
  },
  {
    id: '03',
    title: 'COMMUNITY',
    tag: 'WORLD',
    body: 'One persistent world. Built, changed and remembered by its players.'
  }
]

import { useRef } from 'react'
import { useElementParallax } from './animations/scrollMotion'

export default function Principles() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {items.map((it, idx) => {
          const ref = useRef<HTMLDivElement>(null)
          const numY = useElementParallax(ref, [0, -6])
          const titleY = useElementParallax(ref, [0, -14])
          return (
            <motion.article key={it.id} className="py-12 border-b border-border flex items-start gap-8 group" initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ staggerChildren: 0.18 }}>
              <div className="w-1/12">
                <motion.div ref={ref} variants={fadeUp} style={{ y: numY }} className="text-muted text-sm">{it.id}</motion.div>
              </div>

              <div className="w-7/12">
                <motion.h3 variants={fadeUp} style={{ y: titleY }} whileHover={{ x: 8 }} transition={{ duration: 0.8 }} className="text-5xl font-bold uppercase">{it.title}</motion.h3>
                <motion.p variants={fadeUp} className="mt-6 text-muted max-w-2xl">{it.body}</motion.p>
              </div>

              <div className="w-4/12 text-right">
                <div className="text-sm text-muted uppercase tracking-wider">{it.tag}</div>
              </div>

            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { fadeUp } from './animations/motionVariants'
import { useRef } from 'react'
import { useElementParallax } from './animations/scrollMotion'

export default function World() {
  const ref = useRef<HTMLImageElement>(null)
  const y = useElementParallax(ref, [10, -25])

  return (
    <section id="world" className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[6vw] leading-tight font-bold uppercase">THE<br/>WORLD</motion.h2>

        <div className="mt-10 grid grid-cols-12 gap-8 items-start">
          <div className="col-span-7">
            <div className="w-full rounded-sm overflow-hidden border border-border image-frame h-[460px]">
              <motion.img ref={ref} src="/images/world.jpg" alt="World placeholder" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 35%', y }} initial={{ opacity: 0, scale: 1.04, y: 20 }} whileInView={{ opacity: 1, scale: 1.0, y: 0 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
            </div>
          </div>

          <aside className="col-span-5">
            <div className="text-sm text-muted uppercase tracking-wider">
              <div className="micro">WORLD 00</div>
              <div className="mt-2">SEED — 2048005618087379093</div>
              <div className="mt-2">MODE — SURVIVAL</div>
              <div className="mt-2">STATUS — PERSISTENT</div>
              <div className="mt-2">VERSION — JAVA</div>
              <div className="mt-2">CREATED — 25.08.26</div>
            </div>

            <motion.h4 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-8 text-3xl font-semibold">EVERYTHING STARTS HERE.</motion.h4>
          </aside>
        </div>
      </div>
    </section>
  )
}

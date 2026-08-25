"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { heroContainer, fadeUp } from './animations/motionVariants'
import { useGlobalParallax } from './animations/scrollMotion'
import { useEffect, useState } from 'react'
import useServerStatus from './hooks/useServerStatus'

export default function Hero() {
  const reduce = useReducedMotion()
  const bgY = useGlobalParallax([0, -60], [0, 800])
  const titleY = useGlobalParallax([0, -30], [0, 800])
  const smallY = useGlobalParallax([0, -12], [0, 800])
  const overlayOpacity = useGlobalParallax([0.65, 0.8], [0, 800])

  const { status, playersOnline, playersMax } = useServerStatus()
  const playersDisplay = status === 'online' ? `${playersOnline ?? 0} / ${playersMax}` : `— / ${playersMax}`

  return (
    <section className="min-h-[60vh] relative flex items-end" aria-label="Hero">
      {/*
        Replace the background image below with a high-quality server screenshot.
        Path: /public/hero.jpg
      */}
      <div className="absolute inset-0">
        <motion.img
          src="/images/hero.jpg"
          alt="Cinematic Minecraft landscape placeholder"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: '50% 30%', y: bgY }}
          initial={{ scale: 1.06, opacity: 0.82 }}
          animate={{ scale: 1.0, opacity: 1.0 }}
          transition={reduce ? { duration: 0 } : { duration: 5.0, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
        <div className="absolute inset-0 mix-blend-overlay" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.8))' }} />

        {/* background index removed to keep a single dominant typography layer */}
      </div>

      <motion.div variants={heroContainer} initial="hidden" animate="show" className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full mt-12 md:mt-24">
        <motion.div className="text-primary-text">
          <motion.h1 variants={fadeUp} style={{ y: titleY }} className="hero-title text-[12vw] leading-[0.9] font-bold uppercase">GODS<br/>COUNTRY</motion.h1>
          <motion.p variants={fadeUp} style={{ y: smallY }} className="mt-6 micro uppercase tracking-wider">PRIVATE WORLD — JAVA EDITION — EST. 2026</motion.p>

          <motion.div variants={fadeUp} style={{ y: smallY }} className="mt-8 flex gap-6 items-center">
            <motion.a whileHover={{ y: -3 }} transition={{ duration: 0.55 }} className="px-6 py-3 border border-border text-sm uppercase hover:bg-surface-hover" href="#server">Enter the world</motion.a>
            <motion.a whileHover={{ y: -3 }} transition={{ duration: 0.55 }} className="px-6 py-3 border border-border text-sm uppercase hover:bg-surface-hover" href="#discord">Join Discord</motion.a>
          </motion.div>

          <motion.div variants={fadeUp} style={{ y: smallY }} className="mt-6 text-xs micro flex flex-col gap-2">
            <div className="inline-flex items-center gap-6">
              <span>WORLD STATUS</span>
              <span className="inline-flex items-center gap-2">
                  <span style={{ width:8, height:8, borderRadius:8, background: 'var(--accent)', display:'inline-block' }} aria-hidden="true" />
                  <span>{status === 'online' ? 'ONLINE' : status === 'offline' ? 'OFFLINE' : 'UNKNOWN'}</span>
              </span>
            </div>
              <div className="mt-0">PLAYERS — {playersDisplay}</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from './animations/motionVariants'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1, background: scrolled ? 'rgba(0,0,0,0.6)' : 'transparent', backdropFilter: scrolled ? 'blur(8px)' : 'none' }}
      transition={reduce ? { duration: 0 } : { duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="fixed w-full z-40 top-0 left-0"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-2xl font-bold tracking-wide">GODS COUNTRY</motion.div>
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wider">
          <motion.a whileHover={{ y: -2, opacity: 0.9 }} className="nav-link" href="#world">WORLD</motion.a>
          <motion.a whileHover={{ y: -2, opacity: 0.9 }} className="nav-link" href="#server">SERVER</motion.a>
          <motion.a whileHover={{ y: -2, opacity: 0.9 }} className="nav-link" href="#gallery">GALLERY</motion.a>
          <motion.a whileHover={{ y: -2, opacity: 0.9 }} className="nav-link" href="#discord">DISCORD</motion.a>
        </nav>
        <div className="md:hidden">Menu</div>
      </div>
    </motion.header>
  )
}

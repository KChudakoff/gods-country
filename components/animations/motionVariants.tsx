import { Variants } from 'framer-motion'

export const containerStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      // slightly slower default stagger
      staggerChildren: 0.22,
      delayChildren: 0.22,
    },
  },
}

export const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      // hero sequence: start a bit after background
      delayChildren: 0.4,
      // larger stagger so each headline line feels deliberate
      staggerChildren: 0.55,
    },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeInQuick: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export const dividerGrow: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
}

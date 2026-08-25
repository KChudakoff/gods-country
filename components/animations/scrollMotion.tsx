import { RefObject } from 'react'
import { useReducedMotion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

// Map global scrollY to a spring-smoothed motion value
export function useGlobalParallax(outputRange: number[], inputRange: number[] = [0, 600]) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  if (reduce) {
    // return a static zero-like MotionValue by mapping scrollY to 0 via transform
    return useTransform(scrollY, inputRange, [0, 0]) as MotionValue<number>
  }

  const raw = useTransform(scrollY, inputRange, outputRange)
  // smooth it with a spring for inertia
  return useSpring(raw, { damping: 40, stiffness: 120, restDelta: 0.001 })
}

// Map element scroll progress to a spring-smoothed motion value
// The ref should be a section or element; outputRange are numeric values for transform (e.g. [0, -20])
export function useElementParallax(ref: RefObject<HTMLElement>, outputRange: number[], options?: { offset?: NonNullable<Parameters<typeof useScroll>[0]>['offset'] }) {
  const reduce = useReducedMotion()
  type UseScrollParams = NonNullable<Parameters<typeof useScroll>[0]>
  const defaultOffset: UseScrollParams['offset'] = ['start end', 'end start'] as const
  const offset: UseScrollParams['offset'] = options?.offset ?? defaultOffset
  const { scrollYProgress } = useScroll({ target: ref, offset } as UseScrollParams)
  if (reduce) {
    return useTransform(scrollYProgress, [0, 1], [0, 0]) as MotionValue<number>
  }

  const raw = useTransform(scrollYProgress, [0, 1], outputRange)
  return useSpring(raw, { damping: 40, stiffness: 120, restDelta: 0.001 })
}

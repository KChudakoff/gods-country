"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, containerStagger } from './animations/motionVariants'
import { useRef } from 'react'
import { useElementParallax } from './animations/scrollMotion'
import useServerStatus from './hooks/useServerStatus'

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
  const ip = '185.83.152.14'
  const { status, playersOnline, playersMax } = useServerStatus()
  const [username, setUsername] = useState('')
  const [requestState, setRequestState] = useState<'idle'|'loading'|'success'|'invalid'|'already'|'error'>('idle')

  async function handleRequest(e?: React.FormEvent) {
    if (e) e.preventDefault()
    const val = username.trim()
    const usernameRegex = /^[A-Za-z0-9_]{3,16}$/
    if (!usernameRegex.test(val)) {
      setRequestState('invalid')
      return
    }
    setRequestState('loading')
    try {
      const res = await fetch('/api/join-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ minecraftUsername: val }), cache: 'no-store' })
      const data = await res.json()
      console.log('[FRONTEND JOIN REQUEST]', data)
      if (!data || data.success !== true) {
        if (data && data.error === 'already_pending') {
          setRequestState('already')
        } else if (data && data.error === 'invalid_username') {
          setRequestState('invalid')
        } else {
          setRequestState('error')
        }
      } else {
        setRequestState('success')
      }
    } catch (err) {
      console.error('Join request error', err)
      setRequestState('error')
    }
  }

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

        <div className="mt-8 max-w-3xl">
          {requestState === 'success' ? (
            <div className="p-6 border border-border bg-surface rounded">
              <div className="font-bold uppercase">REQUEST RECEIVED</div>
              <div className="mt-2 uppercase">WORLD 00 / PENDING ACCESS</div>
              <div className="mt-2 text-sm">Your Minecraft username has been submitted for whitelist approval.</div>
            </div>
          ) : (
            <form onSubmit={handleRequest} className="p-6 border border-border bg-surface rounded">
              <div className="micro text-xs uppercase text-muted">ACCESS / WORLD 00</div>
              <div className="mt-2 font-bold uppercase">REQUEST ACCESS</div>
              <label className="mt-4 block text-sm text-muted">Minecraft Username</label>
              <input aria-label="Minecraft Username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-2 px-3 py-2 w-full bg-transparent border border-border" />
              {requestState === 'invalid' && <div className="mt-2 text-xs uppercase text-red-500">ENTER A VALID MINECRAFT USERNAME</div>}
              {requestState === 'already' && <div className="mt-2 text-xs uppercase text-yellow-500">REQUEST ALREADY PENDING</div>}
              {requestState === 'error' && <div className="mt-2 text-xs uppercase text-red-500">REQUEST COULD NOT BE SENT</div>}
              <div className="mt-4">
                <button type="submit" disabled={requestState === 'loading'} className="px-6 py-3 border border-border text-sm uppercase hover:bg-surface-hover">{requestState === 'loading' ? 'SENDING...' : 'REQUEST ACCESS →'}</button>
              </div>
            </form>
          )}
        </div>

        <motion.div variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-8 grid grid-cols-2 gap-8 max-w-3xl">
          <div>
            <motion.div variants={fadeUp} className="text-muted text-sm">STATUS</motion.div>
            <motion.div variants={fadeUp} className="mt-2 uppercase">{status === 'online' ? 'ONLINE' : status === 'offline' ? 'OFFLINE' : 'UNKNOWN'}</motion.div>
          </div>
          <div>
            <motion.div variants={fadeUp} className="text-muted text-sm">PLAYERS</motion.div>
            <motion.div variants={fadeUp} className="mt-2 uppercase">{status === 'online' ? `${playersOnline ?? 0} / ${playersMax}` : `— / ${playersMax}`}</motion.div>
          </div>
          <div>
            <motion.div variants={fadeUp} className="text-muted text-sm">VERSION</motion.div>
            <motion.div variants={fadeUp} className="mt-2 uppercase">26.2</motion.div>
          </div>
          <div>
            <motion.div variants={fadeUp} className="text-muted text-sm">SERVER</motion.div>
            <motion.div variants={fadeUp} className="mt-2 flex items-center gap-3">
              <div className="uppercase tracking-wider">{ip}</div>
              <motion.button whileHover={{ y: -2, scale: 1.02 }} transition={{ duration: 0.45 }} onClick={handleCopy} className="px-3 py-1 border border-border text-sm uppercase text-muted hover:text-primary-text" aria-pressed={copied}>{copied ? 'COPIED' : 'COPY ADDRESS'}</motion.button>
            </motion.div>
          </div>
          <div>
            <motion.div variants={fadeUp} className="text-muted text-sm">EDITION</motion.div>
            <motion.div variants={fadeUp} className="mt-2 uppercase">JAVA</motion.div>
          </div>
          <div>
            <motion.div variants={fadeUp} className="text-muted text-sm">VOICE</motion.div>
            <motion.div variants={fadeUp} className="mt-2 uppercase">PROXIMITY / ENABLED</motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

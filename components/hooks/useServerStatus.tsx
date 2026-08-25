"use client"

import { useEffect, useState } from 'react'

type ServerState = {
  status: 'online' | 'offline' | 'unknown'
  playersOnline: number | null
  playersMax: number
  version?: string | null
  fetchedAt?: string
}

export default function useServerStatus(pollInterval = 10000) {
  const [state, setState] = useState<ServerState>({ status: 'unknown', playersOnline: null, playersMax: 25, version: null })

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const res = await fetch(`/api/server-status?t=${Date.now()}`, { cache: 'no-store' })
        const data = await res.json()
        if (!mounted) return
        // normalize
        const normalized = {
          status: data.status ?? 'unknown',
          playersOnline: typeof data.playersOnline === 'number' ? data.playersOnline : null,
          playersMax: typeof data.playersMax === 'number' ? data.playersMax : 25,
          version: typeof data.version === 'string' ? data.version : null,
          fetchedAt: data.fetchedAt ?? undefined,
        }
        console.log('[FRONTEND MC STATUS]', normalized)
        setState(normalized)
      } catch (e) {
        if (!mounted) return
        console.log('[FRONTEND MC STATUS] fetch error', e)
        setState({ status: 'unknown', playersOnline: null, playersMax: 25, version: null })
      }
    }

    load()
    const id = setInterval(load, pollInterval)
    return () => { mounted = false; clearInterval(id) }
  }, [pollInterval])

  return state
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

type Resp = { success: boolean; error?: string }

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env vars')
}

const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_SERVICE_ROLE_KEY ?? '', { auth: { persistSession: false } })

export default async function handler(req: NextApiRequest, res: NextApiResponse<Resp>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'method_not_allowed' })
  }

  try {
    const body = req.body ?? {}
    const raw = typeof body.minecraftUsername === 'string' ? body.minecraftUsername : body.minecraftUsername ?? body.username
    if (typeof raw !== 'string') {
      return res.status(400).json({ success: false, error: 'invalid_username' })
    }

    const minecraftUsername = raw.trim()
    const usernameRegex = /^[A-Za-z0-9_]{3,16}$/
    if (!usernameRegex.test(minecraftUsername)) {
      return res.status(400).json({ success: false, error: 'invalid_username' })
    }

    // Check for existing pending request (case-insensitive)
    const { data: existing, error: selectErr } = await supabase
      .from('join_requests')
      .select('minecraft_username')
      .eq('status', 'pending')
      .limit(100)

    if (selectErr) {
      console.error('Supabase select error', selectErr)
      return res.status(500).json({ success: false, error: 'server_error' })
    }

    const already = (existing ?? []).some((r: any) => typeof r.minecraft_username === 'string' && r.minecraft_username.toLowerCase() === minecraftUsername.toLowerCase())
    if (already) {
      return res.status(200).json({ success: false, error: 'already_pending' })
    }

    // Insert only the minecraft_username column; rely on DB defaults for status/created_at
    const { error: insertErr } = await supabase.from('join_requests').insert({ minecraft_username: minecraftUsername })
    if (insertErr) {
      console.error('Supabase insert error', insertErr)
      return res.status(500).json({ success: false, error: 'server_error' })
    }

    return res.status(200).json({ success: true })
  } catch (e) {
    console.error('Join request handler error', e)
    return res.status(500).json({ success: false, error: 'server_error' })
  }
}

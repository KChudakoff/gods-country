import type { NextApiRequest, NextApiResponse } from 'next'
import net from 'net'

export const dynamic = 'force-dynamic'

type StatusResponse = {
  status: 'online' | 'offline' | 'unknown'
  playersOnline: number | null
  playersMax: number
  version?: string | null
  fetchedAt: string
  provider: string
}

const HOST = '185.83.152.14'
const PORT = 25565
const TIMEOUT = 3000 // ms
const MAX_PLAYERS = 25

function writeVarInt(value: number) {
  const parts: number[] = []
  let val = value >>> 0
  while (true) {
    if ((val & ~0x7f) === 0) {
      parts.push(val)
      break
    }
    parts.push((val & 0x7f) | 0x80)
    val >>>= 7
  }
  return new Uint8Array(parts)
}

function writeString(str: string) {
  const encoder = new TextEncoder()
  const strBuf = encoder.encode(str)
  const len = writeVarInt(strBuf.length)
  const out = new Uint8Array(len.length + strBuf.length)
  out.set(len, 0)
  out.set(strBuf, len.length)
  return out
}

function buildHandshake(host: string, port: number, protocolVersion = 760) {
  const packetId = writeVarInt(0x00) // handshake id
  const protocol = writeVarInt(protocolVersion)
  const hostBuf = writeString(host)
  const portBuf = new Uint8Array(2)
  portBuf[0] = (port >> 8) & 0xff
  portBuf[1] = port & 0xff
  const nextState = writeVarInt(1) // status

  const parts = [packetId, protocol, hostBuf, portBuf, nextState]
  const totalLen = parts.reduce((s, p) => s + p.length, 0)
  const data = new Uint8Array(totalLen)
  let offset = 0
  for (const p of parts) {
    data.set(p, offset)
    offset += p.length
  }
  const length = writeVarInt(data.length)
  const out = new Uint8Array(length.length + data.length)
  out.set(length, 0)
  out.set(data, length.length)
  return out
}

function buildRequest() {
  const packetId = writeVarInt(0x00)
  const length = writeVarInt(packetId.length)
  const out = new Uint8Array(length.length + packetId.length)
  out.set(length, 0)
  out.set(packetId, length.length)
  return out
}

function readVarInt(buffer: Uint8Array | Buffer, offset = 0) {
  let numRead = 0
  let result = 0
  let read
  do {
    read = (buffer as Uint8Array)[offset + numRead]
    const value = (read & 0b01111111)
    result |= (value << (7 * numRead))
    numRead++
    if (numRead > 5) throw new Error('VarInt too big')
  } while ((read & 0b10000000) !== 0)
  return { value: result, size: numRead }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<StatusResponse>) {
  const fetchedAt = new Date().toISOString()
  const provider = 'direct'

  // no-store headers to avoid CDN/browser caching
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')

  await new Promise<void>((resolve) => {
    const socket = net.createConnection({ host: HOST, port: PORT })
    let timedOut = false
    const timeoutId = setTimeout(() => {
      timedOut = true
      socket.destroy()
      console.log('[MC STATUS] timeout', new Date().toISOString())
      res.status(200).json({ status: 'offline', playersOnline: null, playersMax: MAX_PLAYERS, fetchedAt, provider })
      resolve()
    }, TIMEOUT)

    socket.on('connect', () => {
      try {
        // send handshake then status request
        const handshake = buildHandshake(HOST, PORT)
        const request = buildRequest()
        socket.write(handshake)
        socket.write(request)
        } catch (e) {
        clearTimeout(timeoutId)
        socket.destroy()
        console.log('[MC STATUS] write error', e)
        res.status(200).json({ status: 'unknown', playersOnline: null, playersMax: MAX_PLAYERS, fetchedAt, provider })
        resolve()
      }
    })

    const chunks: Buffer[] = []
    socket.on('data', (data: Buffer) => {
      chunks.push(data)
      try {
        const totalLen = chunks.reduce((s, c) => s + c.length, 0)
        const buffer = new Uint8Array(totalLen)
        let boff = 0
        for (const c of chunks) {
          const view = new Uint8Array((c as Buffer).buffer, (c as Buffer).byteOffset, (c as Buffer).byteLength)
          buffer.set(view, boff)
          boff += c.length
        }
        // read packet length varint
        const { value: packetLength, size: lenSize } = readVarInt(buffer, 0)
        if (buffer.length < lenSize + packetLength) {
          // wait for more data
          return
        }
        // read packet id varint
        const { value: packetId, size: idSize } = readVarInt(buffer, lenSize)
        let offset = lenSize + idSize
        // next is a VarInt-prefixed string
        const { value: strLen, size: strLenSize } = readVarInt(buffer, offset)
        offset += strLenSize
        const decoder = new TextDecoder('utf-8')
        const jsonStr = decoder.decode(buffer.slice(offset, offset + strLen))
        const dataObj = JSON.parse(jsonStr)
        clearTimeout(timeoutId)
        socket.end()
        console.log('[MC RAW RESULT]', dataObj)
        console.log('[MC STATUS] players', dataObj.players)

        // If we successfully parsed a Minecraft status response, treat the server as online.
        const playersOnline = typeof dataObj.players?.online === 'number' ? dataObj.players.online : 0
        const version = typeof dataObj.version?.name === 'string' ? dataObj.version.name : (typeof dataObj.version === 'string' ? dataObj.version : null)
        const normalized = { status: 'online' as const, playersOnline, playersMax: MAX_PLAYERS, version, fetchedAt, provider }
        console.log('[MC NORMALIZED]', normalized)
        res.status(200).json(normalized)
        resolve()
      } catch (e) {
        // parsing error
        clearTimeout(timeoutId)
        socket.destroy()
        console.log('[MC STATUS] parse error', e)
        res.status(200).json({ status: 'unknown', playersOnline: null, playersMax: MAX_PLAYERS, fetchedAt, provider })
        resolve()
      }
    })

    socket.on('error', (err) => {
      if (timedOut) return
      clearTimeout(timeoutId)
      socket.destroy()
      console.log('[MC STATUS] socket error', err.message)
      // connection refused or other network error -> treat as offline
      res.status(200).json({ status: 'offline', playersOnline: null, playersMax: MAX_PLAYERS, fetchedAt, provider })
      resolve()
    })
  })
}

import { busy } from '@components/layouts/store'
import type { Entry } from '@pages/subtler/types'
import { alertServerError } from '@services/alert'
import { PIER_API } from '@services/env'

export const getEntries = async (path: string) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/subtler/entries/${encodeURIComponent(path)}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as Entry[]
  return data
}

export const extractSubtitles = async (video: string) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/subtler/extract/${encodeURIComponent(video)}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as string
  return data
}

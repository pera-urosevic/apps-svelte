import { busy } from '@components/layouts/store'
import type { Feed } from '@pages/reader/types'
import { alertServerError } from '@services/alert'
import { PIER_API } from '@services/env'

export const getBundles = async () => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/reader/bundles`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return data
}

export const createFeed = async (name: string) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/reader/feed/${encodeURIComponent(name)}`, {
    method: 'POST',
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as Feed
  return data
}

export const getFeed = async (name: string) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/reader/feed/${encodeURIComponent(name)}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as Feed
  return data
}

export const updateFeed = async (name: string, feed: Feed) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/reader/feed/${encodeURIComponent(name)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feed),
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as Feed
  return data
}

export const removeFeed = async (name: string) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/reader/feed/${encodeURIComponent(name)}`, {
    method: 'DELETE',
  })
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
    return false
  }
  return true
}

export const discardArticle = async (id: string) => {
  // ux: don't busy.set(true)
  const res = await fetch(`${PIER_API}/reader/discard/article/${encodeURIComponent(id)}`, {
    method: 'PUT',
  })
  // ux: don't busy.set(false)
  if (!res.ok) {
    alertServerError(res)
    return false
  }
  return true
}

export const discardFeed = async (name: string) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/reader/discard/feed/${encodeURIComponent(name)}`, {
    method: 'PUT',
  })
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
    return false
  }
  return true
}

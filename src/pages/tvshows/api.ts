import { busy } from '@components/layouts/store'
import type { TVShowRecord } from '@pages/tvshows/types'
import { alertServerError } from '@services/alert'
import { PIER_API } from '@services/env'

export const getTVShows = async () => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/tvshows`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as Record<string, any>[]
  data.map((show) => {
    show.episodes = JSON.parse(show.episodes)
    return show
  })
  return data as TVShowRecord[]
}

export const getTVShow = async (id: number) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/tvshows/tvshow/${id}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  data.episodes = JSON.parse(data.episodes)
  return data as TVShowRecord
}

export const createTVShow = async (tvshow: TVShowRecord) => {
  busy.set(true)
  const body = JSON.stringify({ ...tvshow, episodes: JSON.stringify(tvshow.episodes) })
  const res = await fetch(`${PIER_API}/tvshows/tvshow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as TVShowRecord
  return data
}

export const updateTVShow = async (tvshow: TVShowRecord) => {
  busy.set(true)
  const body = JSON.stringify({ ...tvshow, episodes: JSON.stringify(tvshow.episodes) })
  const res = await fetch(`${PIER_API}/tvshows/tvshow/${tvshow.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  data.episodes = JSON.parse(data.episodes)
  return data as TVShowRecord
}

export const removeTVShow = async (id: number) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/tvshows/tvshow/${id}`, {
    method: 'DELETE',
  })
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
    return false
  }
  return true
}

export const searchTVMaze = async (title: string) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/tvshows/tvmaze/search/${encodeURIComponent(title)}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return data as string
}

export const getTVMaze = async (id: number) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/tvshows/tvmaze/get/${id}`, {
    method: 'POST',
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return data as string
}

import { busy } from '@components/layouts/store'
import type { AutocompleteFields, Autocompletes, DatabaseIndex, DocRecord, Facet } from '@pages/database/types'
import { alertServerError } from '@services/alert'
import { PIER_API } from '@services/env'

export const getIndex = async () => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/database/index`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return data as DatabaseIndex
}

export const getDocs = async (database: string, collection: string, where: string, order: string, offset: number) => {
  if (offset === 0) busy.set(true)
  const w = encodeURIComponent(where)
  const o = encodeURIComponent(order)
  const res = await fetch(`${PIER_API}/database/${database}/collection/${collection}?where=${w}&order=${o}&offset=${offset}`)
  if (offset === 0) busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return data as DocRecord[]
}

export const createDoc = async (database: string, collection: string, record: DocRecord) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/database/${database}/collection/${collection}/doc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return data as number
}

export const getFacets = async (database: string, collection: string) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/database/${database}/collection/${collection}/facets`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return JSON.parse(data) as Facet[]
}

export const updateFacets = async (database: string, collection: string, facets: Facet[]) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/database/${database}/collection/${collection}/facets`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(JSON.stringify(facets)),
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return JSON.parse(data) as Facet[]
}

export const getDocsCount = async (database: string, collection: string, where: string) => {
  busy.set(true)
  const w = encodeURIComponent(where)
  const res = await fetch(`${PIER_API}/database/${database}/collection/${collection}/count?where=${w}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return data as number
}

export const getAutocompletes = async (database: string, collection: string, autocompleteFields: AutocompleteFields) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/database/${database}/collection/${collection}/autocompletes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(autocompleteFields),
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return data as Autocompletes
}

export const getDoc = async (database: string, collection: string, id: number) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/database/${database}/collection/${collection}/doc/${id}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return data as DocRecord
}

export const getDuplicate = async (database: string, collection: string, id: number, name: string) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/database/${database}/collection/${collection}/duplicate/${id}/${encodeURIComponent(name)}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return data as boolean
}

export const updateDoc = async (database: string, collection: string, record: DocRecord) => {
  const body = JSON.stringify(record)
  busy.set(true)
  const res = await fetch(`${PIER_API}/database/${database}/collection/${collection}/doc/${record.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json()
  return data as DocRecord
}

export const removeDoc = async (database: string, collection: string, id: number) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/database/${database}/collection/${collection}/doc/${id}`, {
    method: 'DELETE',
  })
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
    return false
  }
  return true
}

export const setCache = async (key: string, value: any) => {
  busy.set(true)
  const body = JSON.stringify(value)
  const res = await fetch(`${PIER_API}/database/cache/${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
}

export const getCache = async (key: string, defaultValue: any = undefined) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/database/cache/${key}`)
  busy.set(false)
  if (!res.ok) return defaultValue
  const data = await res.json()
  return data
}

export const proxy = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', headers: Record<string, string> = {}, body: string = '') => {
  busy.set(true)
  const payload = JSON.stringify({ url, method, headers, body })
  const res = await fetch(`${PIER_API}/proxy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  })
  busy.set(false)
  return res
}

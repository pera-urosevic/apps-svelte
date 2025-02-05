import { busy } from '@components/layouts/store'
import type { Color } from '@pages/colors/types'
import { alertServerError } from '@services/alert'
import { PIER_API } from '@services/env'

export const getColors = async () => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/colors`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as Color[]
  return data
}

export const saveColor = async (color: Color) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/colors`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(color),
  })
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
    return false
  }
  return true
}

export const removeColor = async (color: Color) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/colors/${encodeURIComponent(color.name)}`, {
    method: 'DELETE',
  })
  busy.set(false)
  if (!res.ok) {
    alertServerError(res)
    return false
  }
  return true
}

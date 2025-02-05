import { busy } from '@components/layouts/store'
import type { TargetObject, TargetRecord } from '@pages/seeker/types'
import { alertServerError } from '@services/alert'
import { PIER_API } from '@services/env'

export const getTargets = async () => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/seeker/targets`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as TargetRecord[]
  return data
}

export const createTarget = async (record: TargetRecord) => {
  const body = JSON.stringify(record)
  busy.set(true)
  const res = await fetch(`${PIER_API}/seeker/target`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as TargetRecord[]
  return data
}

export const updateTarget = async (title: string, record: TargetRecord) => {
  const body = JSON.stringify(record)
  busy.set(true)
  const res = await fetch(`${PIER_API}/seeker/target/${encodeURIComponent(title)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as TargetRecord[]
  return data
}

export const removeTarget = async (target: TargetObject) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/seeker/target/${encodeURIComponent(target.title)}`, {
    method: 'DELETE',
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as TargetRecord[]
  return data
}

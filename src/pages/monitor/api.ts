import { busy } from '@components/layouts/store'
import type { MonitorData } from '@pages/monitor/types'
import { alertServerError } from '@services/alert'
import { PIER_API } from '@services/env'

export const getData = async () => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/monitor`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as MonitorData
  return data
}

export const removeNotification = async (id: number) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/monitor/notification/${id}`, {
    method: 'DELETE',
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  return true
}

export const removeNotifications = async (channel: string) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/monitor/notifications/${channel}`, {
    method: 'DELETE',
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  return true
}

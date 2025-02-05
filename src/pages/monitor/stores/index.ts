import { Channel, type Notifications, type Stats } from '@pages/monitor/types'
import { derived, writable } from 'svelte/store'

export const stats = writable<Stats | undefined>()
export const heartbeat = derived(stats, ($stats) => $stats?.heartbeat)
export const uptime = derived(stats, ($stats) => $stats?.uptime)
export const storage = derived(stats, ($stats) => $stats?.storage)
export const cpu = derived(stats, ($stats) => $stats?.cpu)
export const mem = derived(stats, ($stats) => $stats?.mem)
export const swap = derived(stats, ($stats) => $stats?.swap)
export const temp = derived(stats, ($stats) => $stats?.temp)

export const notifications = writable<Notifications>({})
export const channel = writable<Channel>(Channel.alert)
export const channelNotifications = derived([notifications, channel], ([$notifications, $channel]) => {
  if ($notifications && $channel && $notifications[$channel]) {
    return $notifications[$channel]
  }
  return []
})
export const channelNotificationsCount = derived(channelNotifications, ($channelNotifications) => $channelNotifications.length)

export const ready = derived([stats, notifications], ([$stats, $notifications]) => $stats || $notifications)

import { removeNotification } from '@pages/monitor/api'
import { channelNotificationsCount, notifications } from '@pages/monitor/stores'
import { onFirstChannel } from '@pages/monitor/stores/onFirstChannel'
import type { Notification } from '@pages/monitor/types'
import { get } from 'svelte/store'

export const onRemoveNotification = async (notification: Notification) => {
  const ok = await removeNotification(notification.id)
  if (ok) {
    notifications.update((ns) => {
      ns[notification.channel] = ns[notification.channel].filter((n) => n.id !== notification.id)
      return ns
    })
    if (get(channelNotificationsCount) < 1) onFirstChannel()
  }
}

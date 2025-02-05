import { removeNotifications } from '@pages/monitor/api'
import { notifications } from '@pages/monitor/stores'
import { onFirstChannel } from '@pages/monitor/stores/onFirstChannel'
import type { Channel } from '@pages/monitor/types'

export const onRemoveNotifications = async (channel: Channel) => {
  const ok = await removeNotifications(channel)
  if (ok) {
    notifications.update((ns) => {
      delete ns[channel]
      return ns
    })
    onFirstChannel()
  }
}

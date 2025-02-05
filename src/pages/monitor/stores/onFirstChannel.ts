import { channel, notifications } from '@pages/monitor/stores'
import { Channel } from '@pages/monitor/types'
import { get } from 'svelte/store'

export const onFirstChannel = () => {
  const channels = Object.values(Channel)
  const ns = get(notifications)
  channel.set(channels.find((c) => {
    return ns[c] && ns[c].length > 0
  }) || Channel.alert)
}

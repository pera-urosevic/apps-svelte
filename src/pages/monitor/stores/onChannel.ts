import { channel } from '@pages/monitor/stores'
import type { Channel } from '@pages/monitor/types'

export const onChannel = (channelNew: Channel) => {
  channel.set(channelNew)
}


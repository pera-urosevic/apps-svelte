import { getData } from '@pages/monitor/api'
import { notifications, stats } from '@pages/monitor/stores'
import { onFirstChannel } from '@pages/monitor/stores/onFirstChannel'
import type { MonitorData, Notifications, Stats } from '@pages/monitor/types'

export const onFetchData = async () => {
  const data = await getData() as MonitorData
  if (data) {
    if (data.stats) {
      const parsedStats: Record<string, Record<string, string>> = {}
      for (const row of data.stats) {
        const [sensor, metric] = row.key.split(':')
        if (!parsedStats[sensor]) parsedStats[sensor] = {}
        parsedStats[sensor][metric] = row.value
      }
      stats.set(parsedStats as Stats)
    }
    if (data.notifications) {
      const parsedNotifications: Notifications = {}
      for (const row of data.notifications) {
        const channel = row.channel
        if (!parsedNotifications[channel]) parsedNotifications[channel] = []
        parsedNotifications[channel].push(row)
      }
      notifications.set(parsedNotifications)
    }
    onFirstChannel()
  }
}

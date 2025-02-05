export type StatsHeartbeat = { timestamp: number }
export type StatsUptime = { days: string; hours: string }
export type StatsStorage = Record<string, number>
export type StatsCpu = { usage: number }
export type StatsMem = { usage: number }
export type StatsSwap = { usage: number }
export type StatsTemp = Record<string, number>

export type Stats = {
  heartbeat?: StatsHeartbeat
  uptime?: StatsUptime
  storage?: StatsStorage
  cpu?: StatsCpu
  mem?: StatsMem
  swap?: StatsMem
  temp?: StatsTemp
}


export enum Channel {
  alert = 'alert',
  warn = 'warn',
  info = 'info',
}

export type Notification = {
  id: number,
  timestamp: number,
  channel: Channel,
  topic: string,
  message: string,
}

export type StatsSensor = {
  key: string,
  value: string,
}

export type Notifications = Record<string, Notification[]>

export type MonitorData = {
  stats: StatsSensor[],
  notifications: Notification[],
}

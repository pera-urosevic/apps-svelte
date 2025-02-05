import dayjs from '@services/dayjs'

export const getStale = (updated: Date) => {
  const lastUpdated = dayjs(updated)
  const now = dayjs()
  const stale = now.diff(lastUpdated, 'day') > 30
  return stale
}

export const isLongRuntime = (runtime: number | null) => {
  return runtime === null || runtime >= 40
}

export const isShortRuntime = (runtime: number | null) => {
  return runtime !== null && runtime < 40
}

export const episodeID = (season: number, number: number) => {
  const s = season.toString().padStart(2, '0')
  const e = number.toString().padStart(2, '0')
  return `S${s}E${e}`
}

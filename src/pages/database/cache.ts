import { getCache, setCache } from '@pages/database/api'

export const cacheRead = async (key: string) => {
  const data = await getCache(key)
  if (data) return JSON.parse(data)
  return undefined
}

export const cacheWrite = async (key: string, value: any) => {
  const data = JSON.stringify(value)
  await setCache(key, data)
}

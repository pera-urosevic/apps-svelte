import type { TargetObject } from '@pages/seeker/types'
import dayjs from '@services/dayjs'

export const isStale = (target: TargetObject) => {
  const releaseDate = dayjs(target.release)
  if (!releaseDate.isValid()) return false
  const days = dayjs().diff(releaseDate, 'day')
  if (target.note.includes('🕹️')) return days > 7
  if (target.note.includes('🎬')) return days > 30
  return false
}

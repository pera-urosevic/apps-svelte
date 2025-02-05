import dayjs from '@services/dayjs'
import { caseTitle } from '@services/text'

export const sanitizeName = (name: string) => {
  let sanitized = name.replaceAll('&', ' ').replaceAll(':', '')
  sanitized = caseTitle(sanitized)
  return sanitized
}

export const daysSince = (date: string) => {
  const days = dayjs().diff(date, 'days')
  switch (days) {
    case 0:
      return 'today'
    case 1:
      return '1 day ago'
    default:
      return `${days} days ago`
  }
}

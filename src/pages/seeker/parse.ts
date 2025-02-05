import { daysSince } from '@pages/seeker/helpers'
import type { TargetObject, TargetRecord } from '@pages/seeker/types'
import { caseTitle } from '@services/text'
import dayjs from 'dayjs'

export const parseTargetRecord = (record: TargetRecord) => {
  const target = {
    ...record,
    title: caseTitle(record.title),
    sources: JSON.parse(record.sources),
    checkedAgo: daysSince(record.checked),
    released: !dayjs().isBefore(dayjs(record.release)),
    releasedAgo: !dayjs().isBefore(dayjs(record.release)) ? daysSince(record.release) : '',
  } as TargetObject
  return target
}

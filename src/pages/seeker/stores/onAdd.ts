import dayjs from '@services/dayjs'
import { sanitizeName } from '@pages/seeker/helpers'
import { packs } from '~external/seeker'
import { targets } from '@pages/seeker/stores'
import { createTarget } from '@pages/seeker/api'
import { parseTargetRecord } from '@pages/seeker/parse'

export const onAdd = async (title: string, note: string, release: string) => {
  const today = dayjs().format('YYYY-MM-DD')
  const releasedSafe = release || today
  const record = {
    title: sanitizeName(title || 'New'),
    note: note || '❔',
    release: releasedSafe,
    checked: today,
    sources: JSON.stringify(note in packs ? packs[note] : []),
  }
  const records = await createTarget(record)
  if (!records) return false
  targets.set(records.map(parseTargetRecord))
  return true
}

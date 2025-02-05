import { updateTarget } from '@pages/seeker/api'
import { parseTargetRecord } from '@pages/seeker/parse'
import { targets } from '@pages/seeker/stores'
import type { TargetObject } from '@pages/seeker/types'

export const onUpdate = async (target: TargetObject, titleOld?: string) => {
  const record = {
    title: target.title,
    note: target.note,
    sources: JSON.stringify(target.sources),
    checked: target.checked,
    release: target.release,
  }
  const title = titleOld ?? target.title
  const records = await updateTarget(title, record)
  if (!records) return
  targets.set(records.map(parseTargetRecord))
}


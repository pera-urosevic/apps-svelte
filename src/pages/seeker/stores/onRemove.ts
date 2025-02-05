import { removeTarget } from '@pages/seeker/api'
import { parseTargetRecord } from '@pages/seeker/parse'
import { targets } from '@pages/seeker/stores'
import type { TargetObject } from '@pages/seeker/types'

export const onRemove = async (target: TargetObject) => {
  const confirmed = confirm(`Remove ${target.title}?`)
  if (!confirmed) return
  const records = await removeTarget(target)
  if (!records) return
  targets.set(records.map(parseTargetRecord))
}

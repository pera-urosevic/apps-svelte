import { sourceGroups } from '~external/seeker'
import { onUpdate } from '@pages/seeker/stores/onUpdate'
import type { TargetObject } from '@pages/seeker/types'

export const onGroup = (target: TargetObject, selectedGroup: string) => {
  for (const [group, sources] of Object.entries(sourceGroups)) {
    if (group !== selectedGroup) continue
    for (const source of sources) {
      const index = target.sources.indexOf(source.name)
      if (index > -1) {
        target.sources.splice(index, 1)
      } else {
        target.sources.push(source.name)
      }
    }
  }
  onUpdate(target)
}


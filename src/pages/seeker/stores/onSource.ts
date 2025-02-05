import { onUpdate } from '@pages/seeker/stores/onUpdate'
import type { TargetObject } from '@pages/seeker/types'

export const onSource = (target: TargetObject, source: string) => {
  const index = target.sources.indexOf(source)
  if (index > -1) {
    target.sources.splice(index, 1)
  } else {
    target.sources.push(source)
  }
  onUpdate(target)
}

import { targets } from '@pages/seeker/stores'
import type { TargetObject } from '@pages/seeker/types'

export const onInit = (initialTargets: TargetObject[]) => {
  targets.set(initialTargets)
}

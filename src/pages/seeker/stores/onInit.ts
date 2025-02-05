import { targets } from '@pages/seeker/stores'
import type { TargetObjects } from '@pages/seeker/types'

export const onInit = (initialTargets: TargetObjects) => {
  targets.set(initialTargets)
}

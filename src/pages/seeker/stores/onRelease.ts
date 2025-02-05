import { onUpdate } from '@pages/seeker/stores/onUpdate'
import type { TargetObject } from '@pages/seeker/types'

export const onRelease = async (target: TargetObject) => {
  const release = prompt('Release', target.release)
  if (!release) return
  target.release = release
  onUpdate(target)
}


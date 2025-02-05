import { onUpdate } from '@pages/seeker/stores/onUpdate'
import type { TargetObject } from '@pages/seeker/types'
import { sanitizeName } from '@pages/seeker/helpers'

export const onTitle = async (target: TargetObject) => {
  const titleOld = target.title
  const title = prompt('Title', target.title)
  if (!title) return
  target.title = sanitizeName(title)
  onUpdate(target, titleOld)
}

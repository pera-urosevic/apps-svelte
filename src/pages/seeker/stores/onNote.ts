import { onUpdate } from '@pages/seeker/stores/onUpdate'
import type { TargetObject } from '@pages/seeker/types'

export const onNote = async (target: TargetObject) => {
  const note = prompt('Note', target.note)
  if (!note) return
  target.note = note
  onUpdate(target)
}


import { sourceGroups } from '~external/seeker'
import type { TargetObject } from '@pages/seeker/types'
import dayjs from '@services/dayjs'
import { onUpdate } from '@pages/seeker/stores/onUpdate'

export const onSeek = (target: TargetObject) => {
  for (const sources of Object.values(sourceGroups)) {
    for (const source of sources) {
      if (target.sources.includes(source.name)) {
        const url = source.link(target.title)
        window.open(url, '_blank')
      }
    }
  }
  target.checked = dayjs().format('YYYY-MM-DD')
  onUpdate(target)
}


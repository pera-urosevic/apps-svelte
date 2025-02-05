import type { TargetObject } from '@pages/seeker/types'

export const onWeb = (target: TargetObject) => {
  window.open(`https://search.brave.com/search?q=${target.title}`, '_blank', 'noopener,noreferrer')
}


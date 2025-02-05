import { activeArticleProps } from '@pages/reader/viewer/stores'
import { get } from 'svelte/store'

export const onArticleOpen = () => {
  const articleProps = get(activeArticleProps)
  if (!articleProps?.link) return
  window.open(articleProps.link, '_blank', 'noopener,noreferrer')
}

import { activeBundle, activeArticleIndex } from '@pages/reader/viewer/stores'
import { get } from 'svelte/store'

export const onArticlePrev = async () => {
  const bundle = get(activeBundle)
  if (!bundle) return

  const articleIndex = get(activeArticleIndex)
  if (!articleIndex) return

  const prevArticleIndex = articleIndex - 1
  if (prevArticleIndex in bundle.articles) {
    activeArticleIndex.set(prevArticleIndex)
  }

  document.getElementById('preview')?.scrollTo(0, 0)
}

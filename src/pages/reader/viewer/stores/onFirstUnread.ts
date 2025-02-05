import { activeArticleIndex, activeBundleIndex, bundles } from '@pages/reader/viewer/stores'
import { get } from 'svelte/store'

export const onFirstUnreadBundle = () => {
  const i = get(bundles).findIndex((bundle) => bundle.articles.length > 0)
  if (i < 0) {
    activeBundleIndex.set(null)
    activeArticleIndex.set(null)
    return
  }
  activeBundleIndex.set(i)
  activeArticleIndex.set(0)
}

import { activeArticleIndex, activeBundleIndex, bundles } from '@pages/reader/viewer/stores'
import { get } from 'svelte/store'

export const onBundleSelectPrev = () => {
  const bundleIndex = get(activeBundleIndex)
  if (bundleIndex === null) return

  const allBundles = get(bundles)
  if (allBundles === null) return

  for (let i = bundleIndex - 1; i > -1; i--) {
    if (allBundles[i].articles.length > 0) {
      activeBundleIndex.set(i)
      activeArticleIndex.set(0)
      return
    }
  }
}

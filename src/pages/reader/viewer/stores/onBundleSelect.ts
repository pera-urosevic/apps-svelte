import { activeArticleIndex, activeBundleIndex } from '@pages/reader/viewer/stores'

export const onFeed = (feedIndex: number) => {
  activeBundleIndex.set(feedIndex)
  activeArticleIndex.set(0)
}

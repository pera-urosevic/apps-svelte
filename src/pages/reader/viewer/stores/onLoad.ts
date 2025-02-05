import { getBundles } from '@pages/reader/api'
import { onParseBundles } from '@pages/reader/viewer/stores/onParseBundles'

export const onLoad = async () => {
  const data = await getBundles()
  if (!data) return
  const { feeds, articles } = data
  onParseBundles(feeds, articles)
}

import { bundles } from '@pages/reader/viewer/stores'
import { onFirstUnreadBundle } from '@pages/reader/viewer/stores/onFirstUnread'
import { get } from 'svelte/store'

export const onPurge = async () => {
  const bundlesNew = get(bundles).map((bundle) => {
    const articlesPurged = bundle.articles.filter((a) => !a.discarded)
    return { ...bundle, articles: articlesPurged }
  })
  bundles.set(bundlesNew)
  onFirstUnreadBundle()
}

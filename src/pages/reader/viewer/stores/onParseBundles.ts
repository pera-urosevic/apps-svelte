import type { Article, Feed } from '@pages/reader/types'
import { bundles, type Bundle } from '@pages/reader/viewer/stores'
import { onFirstUnreadBundle } from '@pages/reader/viewer/stores/onFirstUnread'

export const onParseBundles = async (feeds: Feed[], articles: Article[]) => {
  const bundlesUnread: Bundle[] = []
  const bundlesEnabled: Bundle[] = []
  const bundlesDisabled: Bundle[] = []
  for (const feed of feeds) {
    const feedArticles = articles.filter((article) => article.feed_name === feed.name)
    if (feed.disabled) {
      bundlesDisabled.push({ feed, articles: feedArticles })
      continue
    }
    if (feedArticles.length < 1) {
      bundlesEnabled.push({ feed, articles: feedArticles })
      continue
    }
    bundlesUnread.push({ feed, articles: feedArticles })
  }
  bundlesUnread.sort((a: Bundle, b: Bundle) => a.articles.length - b.articles.length)
  const parsedBundles: Bundle[] = [...bundlesUnread, ...bundlesEnabled, ...bundlesDisabled]
  bundles.set(parsedBundles)
  onFirstUnreadBundle()
}

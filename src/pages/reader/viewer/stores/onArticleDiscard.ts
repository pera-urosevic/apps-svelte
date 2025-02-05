import { discardArticle } from '@pages/reader/api'
import { bundles } from '@pages/reader/viewer/stores'
import { get } from 'svelte/store'

export const onArticleDiscard = async (feedName: string, articleID: string) => {
  const success = await discardArticle(articleID)
  if (success) {
    const bundlesNew = get(bundles).map((bundle) => {
      if (bundle.feed.name === feedName) {
        const articlesNew = bundle.articles.map((a) => {
          if (a.id === articleID) return { ...a, discarded: true }
          return a
        })
        return { ...bundle, articles: articlesNew }
      }
      return bundle
    })
    bundles.set(bundlesNew)
  }
}

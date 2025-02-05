import { activeArticle, activeFeed, activeBundle, activeArticleIndex } from '@pages/reader/viewer/stores'
import { onArticleDiscard } from '@pages/reader/viewer/stores/onArticleDiscard'
import { get } from 'svelte/store'

export const onArticleNext = async () => {
  const bundle = get(activeBundle)
  if (bundle == null) return

  const articleIndex = get(activeArticleIndex)
  if (articleIndex == null) return

  const feed = get(activeFeed)
  const article = get(activeArticle)
  if (!feed || !article) return
  if (!article.discarded) onArticleDiscard(feed.name, article.id)

  const nextArticleIndex = articleIndex + 1
  if (nextArticleIndex in bundle.articles) {
    activeArticleIndex.set(nextArticleIndex)
  }

  document.getElementById('preview')?.scrollTo(0, 0)
}

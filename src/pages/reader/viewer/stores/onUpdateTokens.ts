import { updateFeed } from '@pages/reader/api'
import type { Feed, Tokens } from '@pages/reader/types'
import { bundles } from '@pages/reader/viewer/stores'

export const onUpdateTokens = async (feed: Feed, tokens: Tokens) => {
  feed.tokens = JSON.stringify(tokens)
  const data = await updateFeed(feed.name, feed)
  if (!data) return
  const feedNew = data
  bundles.update((bundles) => {
    const t = bundles.map((bundle) => {
      if (bundle.feed.name === feedNew.name) {
        return {
          ...bundle,
          feed: feedNew,
        }
      }
      return bundle
    })
    return t
  })
}

import { discardFeed } from '@pages/reader/api'
import { activeFeed, bundles } from '@pages/reader/viewer/stores'
import { onFirstUnreadBundle } from '@pages/reader/viewer/stores/onFirstUnread'
import { get } from 'svelte/store'

export const onDiscardFeed = async () => {
  const feed = get(activeFeed)
  if (!feed) return

  const confirmed = confirm('Are you sure you want to mark as read all articles in this feed?')
  if (!confirmed) return

  const success = await discardFeed(feed.name)
  if (success) {
    const bundlesNew = get(bundles).map((bundle) => {
      if (bundle.feed.name === feed.name) return { ...bundle, articles: [] }
      return bundle
    })
    bundles.set(bundlesNew)
    onFirstUnreadBundle()
  }
}

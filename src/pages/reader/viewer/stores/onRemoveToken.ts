import { activeFeed, activeFeedTokens } from '@pages/reader/viewer/stores'
import { onUpdateTokens } from '@pages/reader/viewer/stores/onUpdateTokens'
import { get } from 'svelte/store'

export const onRemoveToken = async (token: string) => {
  const feed = get(activeFeed)
  if (!feed) return
  const tokens = get(activeFeedTokens)
  if (!tokens) return

  const tokensNew = structuredClone(tokens)
  delete tokensNew[token]

  await onUpdateTokens(feed, tokensNew)
}

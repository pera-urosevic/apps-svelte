import type { TokenRating } from '@pages/reader/types'
import { activeFeed, activeFeedTokens } from '@pages/reader/viewer/stores'
import { onUpdateTokens } from '@pages/reader/viewer/stores/onUpdateTokens'
import { get } from 'svelte/store'

export const onAddToken = async (token: string, score: TokenRating) => {
  const feed = get(activeFeed)
  if (!feed) return
  const tokens = get(activeFeedTokens)
  if (!tokens) return

  const tokensNew = structuredClone(tokens)
  tokensNew[token] = score

  await onUpdateTokens(feed, tokensNew)
}

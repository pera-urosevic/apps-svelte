import type { Article, Feed, Tokens } from '@pages/reader/types'
import { derived, writable } from 'svelte/store'
import { compile } from 'html-to-text'

// bundle

export type Bundle = {
  feed: Feed
  articles: Article[]
}

export const bundles = writable<Bundle[]>([])

export const activeBundleIndex = writable<number | null>(null)

export const activeBundle = derived([bundles, activeBundleIndex], ([$bundles, $activeBundleIndex]) => {
  if ($activeBundleIndex !== null) {
    return $bundles[$activeBundleIndex]
  }
  return null
})

export const bundleUnreadArticles = derived([bundles], ([$bundles]) => {
  const unreadArticles: Record<string, string> = {}
  for (const bundle of $bundles) {
    const count = bundle.articles.filter((article) => !article.discarded).length
    unreadArticles[bundle.feed.name] = count ? String(count) : ''
  }
  return unreadArticles
})

// feed

export const activeFeed = derived([activeBundle], ([$activeBundle]) => {
  if ($activeBundle) {
    return $activeBundle.feed
  }
  return null
})

export const activeFeedTokens = derived([activeFeed], ([$activeFeed]) => {
  if ($activeFeed) {
    return JSON.parse($activeFeed.tokens) as Tokens
  }
  return null
})

// article

export type ArticleProps = {
  id: string
  title: string
  image?: {
    url: string
  }
  categories?: string[]
  description?: string
  content?: string
  link: string
  publishedParsed: string
  discarded: boolean
  enclosures?: {
    url?: string,
    length?: string,
    type?: string,
  }[],
  extensions?: {
    media?: {
      thumbnail?: {
        attrs: {
          url: string
        }
      }[]
    }
  }
}

export const activeArticleIndex = writable<number | null>(null)

export const activeArticle = derived([activeBundle, activeArticleIndex], ([$activeBundle, $activeArticleIndex]) => {
  if ($activeBundle && $activeArticleIndex !== null) {
    return $activeBundle.articles[$activeArticleIndex]
  }
  return null
})

export const activeArticleProps = derived(activeArticle, ($activeArticle) => {
  if ($activeArticle) {
    const props = JSON.parse($activeArticle.content) as ArticleProps
    return props
  }
  return null
})

export const activeArticleRatings = derived([activeFeedTokens, activeArticleProps], ([$activeFeedTokens, $activeArticleProps]) => {
  type Ratings = {
    positive: string[]
    negative: string[]
  }
  const ratings: Ratings = {
    positive: [],
    negative: [],
  }

  if ($activeFeedTokens === null || $activeArticleProps === null) return ratings

  const html2text = compile({
    wordwrap: 0,
    selectors: [
      { selector: 'a', format: 'inlineSurround', },
      { selector: 'img', format: 'inlineSurround', },
    ]
  })

  const texts = [
    $activeArticleProps.title,
    ($activeArticleProps.categories ?? []).join(' | '),
    html2text($activeArticleProps.description ?? ''),
    html2text($activeArticleProps.content ?? ''),
  ]

  for (const [token, score] of Object.entries($activeFeedTokens)) {
    if (token.startsWith('/') && token.endsWith('/')) {
      const regexp = new RegExp(token.slice(1, -1), 'i')
      for (const text of texts) {
        if (regexp.test(text)) {
          score > 0 ? ratings.positive.push(token) : ratings.negative.push(token)
          break
        }
      }
    } else {
      for (const text of texts) {
        if (text.toLowerCase().includes(token)) {
          score > 0 ? ratings.positive.push(token) : ratings.negative.push(token)
          break
        }
      }
    }
  }

  return ratings
})

export const activeArticleScore = derived([activeArticleRatings], ([$activeArticleRatings]) => {
  if ($activeArticleRatings === null) return ''
  const positive = $activeArticleRatings.positive.length
  const negative = $activeArticleRatings.negative.length
  if (positive > 0 && negative === 0) return 'positive'
  if (positive === 0 && negative > 0) return 'negative'
  return ''
})

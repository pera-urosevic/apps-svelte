export type TokenRating = -1 | 0 | 1

export type Tokens = Record<string, TokenRating>

export type Feed = {
  name: string
  url: string
  web: string
  icon: string | null
  tokens: string
  style: string
  disabled: boolean
  updated: number
}

export type Article = {
  id: string
  content: string
  feed_name: string
  discarded: boolean
}

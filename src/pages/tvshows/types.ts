export enum TVShowStatus {
  development = 'In Development',
  running = 'Running',
  tbd = 'To Be Determined',
  ended = 'Ended',
  unknown = 'Unknown',
}

export type TVShowRecordEpisode = {
  fetched: boolean
  title: string | undefined
  season: number
  number: number
  airing: string | undefined
}

export type TVShowRecord = {
  id: number
  title: string
  status: TVShowStatus
  premiered: Date | null
  tvmaze: number
  imdb: string | null
  website: string | null
  updated: Date
  episodes: TVShowRecordEpisode[]
  watching: number
  image: string | null
  stream: string | null
  runtime: number | null
}

export type CategoryTVShow = {
  id: number
  title: string
  watching: boolean
  tvmaze: number
  stream: string | null
  nextAiring: number | null
  runtime: number | null
}
export type TVShowCategories = Record<string, CategoryTVShow[]>


export type TVShowCreate = {
  id: number
  title: string
  text: string
  url: string
  image: string | null
  year: string
  status: string
  runtime: number | null
}

export type TVMazeSearchResult = {
  show: {
    name: string
    id: number
    summary?: string
    url: string
    image?: {
      medium?: string
    }
    premiered?: string
    status: string
    averageRuntime?: number
  }
}

export type TVMazeEpisode = {
  name: string
  season: number
  number: number
  airstamp: string
}

export type TVMazeTVShow = {
  id: number
  name: string
  status: string
  premiered?: string
  externals?: {
    imdb?: string
  }
  officialSite?: string
  _embedded?: {
    episodes?: TVMazeEpisode[]
  }
  image?: {
    medium?: string
  }
  averageRuntime?: number
}

export type EpisodeDetails = {
  fetched: boolean
  title: string | undefined
  season: number
  number: number
  date: string | undefined
  local: string | undefined
  aired: boolean | undefined
  id: string
}

export type TVShowDetails = {
  id: number
  title: string
  updated: string
  tvmaze: number
  imdb: string | null
  website: string | null
  episodes: EpisodeDetails[]
  watching: boolean
  image: string | null
  stream: string | null
  runtime: number | null
}

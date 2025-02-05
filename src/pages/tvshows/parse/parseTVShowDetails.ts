import { episodeID } from '@pages/tvshows/helpers'
import type { EpisodeDetails, TVShowDetails, TVShowRecord, TVShowRecordEpisode } from '@pages/tvshows/types'
import dayjs from '@services/dayjs'

const parseEpisodes = (recordEpisodes: TVShowRecordEpisode[]): EpisodeDetails[] => {
  const episodes = recordEpisodes.map((ep: any) => {
    const airing = dayjs(ep.airing)
    const date = airing.format('YYYY-MM-DD')
    const airingOffset = airing.add(6, 'hours')
    const local = airingOffset.format('YYYY-MM-DD HH:mm:ss (Z)')
    const aired = airingOffset.diff(dayjs(), 'hours') < 0
    const id = episodeID(ep.season, ep.number)
    return {
      title: ep.title,
      season: ep.season,
      number: ep.number,
      fetched: ep.fetched,
      local: local,
      date: date,
      aired: aired,
      id: id,
    }
  })
  episodes.sort((a: any, b: any) => {
    const compareAiring = b.date.localeCompare(a.date)
    if (compareAiring !== 0) return compareAiring
    const compareSeason = b.season - a.season
    if (compareSeason !== 0) return compareSeason
    return b.number - a.number
  })
  return episodes
}

export const parseTVShowDetails = (record: TVShowRecord): TVShowDetails => {
  const tvshow: TVShowDetails = {
    id: record.id,
    title: record.title,
    updated: dayjs(record.updated).format('YYYY-MM-DD HH:mm:ss'),
    tvmaze: record.tvmaze,
    imdb: record.imdb,
    website: record.website,
    episodes: parseEpisodes(record.episodes),
    watching: record.watching !== 0,
    image: record.image,
    stream: record.stream,
    runtime: record.runtime,
  }
  return tvshow
}

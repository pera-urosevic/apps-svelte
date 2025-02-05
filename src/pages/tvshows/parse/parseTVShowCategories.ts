import { TVShowStatus, type TVShowRecord } from '@pages/tvshows/types'
import { getStale } from '@pages/tvshows/helpers'
import type { TVShowCategories } from '@pages/tvshows/types'
import dayjs from '@services/dayjs'

export const isReady = (record: TVShowRecord) => {
  const nextUnfetchedEpisode = record.episodes.find((ep: any) => !ep.fetched)
  if (!nextUnfetchedEpisode) return null
  if (!nextUnfetchedEpisode.airing) return null
  const nextUnfetchedEpisodeAiring = dayjs(nextUnfetchedEpisode.airing)
  const nextUnfetchedEpisodeAiringOffset = nextUnfetchedEpisodeAiring.add(6, 'hours')
  const ready = nextUnfetchedEpisodeAiringOffset.diff(dayjs(), 'hours') < 0
  return ready
}

export const getNextAiringDays = (record: TVShowRecord) => {
  const nextUnfetchedEpisode = record.episodes.find((ep: any) => !ep.fetched)
  if (!nextUnfetchedEpisode) return null
  if (!nextUnfetchedEpisode.airing) return null
  const nextUnfetchedEpisodeAiring = dayjs(nextUnfetchedEpisode.airing).add(6, 'hours')
  const days = dayjs(nextUnfetchedEpisodeAiring).diff(dayjs(), 'days')
  return days
}

export const getCategory = (record: TVShowRecord): string => {
  if (record.status === TVShowStatus.ended) return 'Ended'
  if (getStale(record.updated)) return 'Stale'
  const ready = isReady(record)
  if (ready !== null) {
    if (ready) return 'Fetch'
    return 'Airing'
  }
  if (record.status === TVShowStatus.running) return 'Running'
  if (record.status === TVShowStatus.tbd) return 'TBD'
  if (record.status === TVShowStatus.development) return 'Development'
  return 'Unknown'
}

export const parseTVShowsCategories = (records: TVShowRecord[]): TVShowCategories => {
  const tvShows: TVShowCategories = {}
  for (const record of records) {
    const tvShow = {
      id: record.id,
      title: record.title,
      status: record.status,
      tvmaze: record.tvmaze,
      nextAiring: getNextAiringDays(record),
      watching: Boolean(record.watching),
      stream: record.stream,
      runtime: record.runtime,
    }
    const category = getCategory(record)
    if (!tvShows[category]) tvShows[category] = []
    tvShows[category].push(tvShow)
  }
  for (const category of Object.keys(tvShows)) {
    switch (category) {
      case 'Airing':
        tvShows[category].sort((a, b) => a.nextAiring! - b.nextAiring!)
        break
      default:
        tvShows[category].sort((a, b) => a.title.localeCompare(b.title))
    }
  }
  return tvShows
}

import type { TVMazeEpisodes, TVShowRecordEpisode } from '@pages/tvshows/types'

export const mergeEpisodes = (episodes: TVShowRecordEpisode[], episodeResults: TVMazeEpisodes) => {
  const merged: TVShowRecordEpisode[] = []
  for (const episode2 of episodeResults) {
    const season2 = episode2.season
    const number2 = episode2.number
    let found = false
    for (const episode1 of episodes) {
      const season1 = episode1.season
      const number1 = episode1.number
      if (season1 === season2 && number1 === number2) {
        merged.push({
          fetched: episode1.fetched,
          title: episode2.name,
          season: episode1.season,
          number: episode1.number,
          airing: episode2.airstamp ? new Date(episode2.airstamp).toISOString() : undefined,
        })
        found = true
        break
      }
    }
    if (!found) {
      merged.push({
        fetched: false,
        title: episode2.name,
        season: episode2.season,
        number: episode2.number,
        airing: episode2.airstamp ? new Date(episode2.airstamp).toISOString() : undefined,
      })
    }
  }
  return merged
}

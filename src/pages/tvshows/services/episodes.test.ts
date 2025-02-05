import { describe, expect, test } from 'vitest'
import type { TVMazeEpisodes, TVShowRecordEpisode } from '@pages/tvshows/services/types'
import { mergeEpisodes } from '@pages/tvshows/services/episodes'

describe('episodes', async () => {

  test('merge', async () => {
    const episodes: TVShowRecordEpisode[] = [
      {
        fetched: true,
        season: 1,
        number: 1,
        title: 'episode 1',
        airing: '2022-01-01T00:00:00.000Z',
      },
      {
        fetched: false,
        season: 1,
        number: 2,
        title: 'episode 2',
        airing: '2022-01-02T00:00:00.000Z',
      },
    ]
    const episodeResults: TVMazeEpisodes = [
      {
        season: 1,
        number: 1,
        name: 'Ep 1',
        airstamp: '2022-02-01T00:00:00.000Z',
      },
      {
        season: 1,
        number: 2,
        name: 'Ep 2',
        airstamp: '2022-02-02T00:00:00.000Z',
      },
      {
        season: 1,
        number: 3,
        name: 'Ep 3',
        airstamp: '2022-02-03T00:00:00.000Z',
      },
    ]
    const merged = mergeEpisodes(episodes, episodeResults)
    expect(merged).toMatchObject([
      {
        fetched: true,
        season: 1,
        number: 1,
        title: 'Ep 1',
        airing: '2022-02-01T00:00:00.000Z',
      },
      {
        fetched: false,
        season: 1,
        number: 2,
        title: 'Ep 2',
        airing: '2022-02-02T00:00:00.000Z',
      },
      {
        fetched: false,
        season: 1,
        number: 3,
        title: 'Ep 3',
        airing: '2022-02-03T00:00:00.000Z',
      },
    ])
  })

})

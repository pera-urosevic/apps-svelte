import { describe, expect, test } from 'vitest'
import { parseTVShowsCategories } from '@pages/tvshows/parse/parseTVShowCategories'
import dayjs from 'dayjs'
import { TVShowStatus, type TVShowCategories } from '@pages/tvshows/types'

const mockTVShowRecords = (partials: Record<string, any>[]): TVShowCategories => {
  let id = 0
  const records = partials.map((partial) => {
    id++
    return {
      id: id,
      title: `title ${id}`,
      status: TVShowStatus.unknown,
      premiered: dayjs().toDate(),
      tvmaze: 123 + id,
      imdb: null,
      website: null,
      updated: dayjs().toDate(),
      episodes: [],
      watching: 0,
      image: null,
      stream: null,
      runtime: null,
      ...partial
    }
  })
  return parseTVShowsCategories(records)
}

describe('parseTVShows', async () => {

  describe('getCategory', async () => {

    test('for ended', async () => {
      const tvShows = mockTVShowRecords([{
        title: 'ended',
        status: TVShowStatus.ended
      }])
      expect(tvShows.Ended[0].title).toBe('ended')
    })

    test('for stale', async () => {
      const tvShows = mockTVShowRecords([{
        title: 'stale',
        updated: dayjs().subtract(31, 'day').toISOString()
      }])
      expect(tvShows.Stale[0].title).toBe('stale')
    })

    test('for fetch', async () => {
      const tvShows = mockTVShowRecords([{
        title: 'fetch',
        status: TVShowStatus.running,
        episodes: [{
          'fetched': false,
          'title': `Episode 1`,
          'season': 1,
          'number': 1,
          'airing': dayjs().subtract(1, 'day').toISOString()
        }]
      }])
      expect(tvShows.Fetch[0].title).toBe('fetch')
    })

    test('for airing', async () => {
      const tvShows = mockTVShowRecords([{
        title: 'airing',
        status: TVShowStatus.running,
        episodes: [{
          'fetched': false,
          'title': `Episode 1`,
          'season': 1,
          'number': 1,
          'airing': dayjs().add(1, 'day').toISOString()
        }]
      }])
      expect(tvShows.Airing[0].title).toBe('airing')
    })

    test('for running', async () => {
      const tvShows = mockTVShowRecords([{
        title: 'running',
        status: TVShowStatus.running,
        episodes: [{
          'fetched': true,
          'title': `Episode 1`,
          'season': 1,
          'number': 1,
          'airing': dayjs().subtract(1, 'day').toISOString()
        }]
      }])
      expect(tvShows.Running[0].title).toBe('running')
    })

    test('for tbd', async () => {
      const tvShows = mockTVShowRecords([{
        title: 'tbd',
        status: TVShowStatus.tbd
      }])
      expect(tvShows.TBD[0].title).toBe('tbd')
    })

    test('for development', async () => {
      const tvShows = mockTVShowRecords([{
        title: 'development',
        status: TVShowStatus.development
      }])
      expect(tvShows.Development[0].title).toBe('development')
    })

    test('for unknown', async () => {
      const tvShows = mockTVShowRecords([{
        title: 'unknown',
      }])
      expect(tvShows.Unknown[0].title).toBe('unknown')
    })

  })

})

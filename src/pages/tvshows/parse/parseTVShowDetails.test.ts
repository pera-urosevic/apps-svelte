import { describe, expect, test } from 'vitest'
import { type TVShow } from '@pages/tvshows/[id]/_types'
import { parseTVShow } from '@pages/tvshows/[id]/_parse/parseTVShow'
import dayjs from 'dayjs'
import { TVShowStatus } from '@pages/tvshows/_db'

const mockTVShowRecord = (partial: Record<string, any>): TVShow => {
  const record = {
    id: 1,
    title: `title 1`,
    status: TVShowStatus.unknown,
    premiered: dayjs().toDate(),
    tvmaze: 123,
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
  return parseTVShow(record)
}

describe('parseTVShow', async () => {

  test('for watching false', async () => {
    const tvShow = mockTVShowRecord({
      watching: 0
    })
    expect(tvShow.watching).toBe(false)
  })

  test('for watching false', async () => {
    const tvShow = mockTVShowRecord({
      watching: 1
    })
    expect(tvShow.watching).toBe(true)
  })

  test('for no episodes', async () => {
    const tvShow = mockTVShowRecord({
      episodes: []
    })
    expect(tvShow.episodes.length).toBe(0)
  })

  test('for episode date', async () => {
    const tvShow = mockTVShowRecord({
      episodes: [{
        'fetched': true,
        'title': 'Episode 1',
        'season': 1,
        'number': 1,
        'airing': '2020-01-01T12:00:00.000Z'
      }]
    })
    expect(tvShow.episodes[0].date).toBe('2020-01-01')
  })

  test('for episode id', async () => {
    const tvShow = mockTVShowRecord({
      episodes: [{
        'fetched': true,
        'title': 'Episode 1',
        'season': 1,
        'number': 1,
        'airing': '2020-01-01T12:00:00.000Z'
      }]
    })
    expect(tvShow.episodes[0].id).toBe('S01E01')
  })

  test('for episode before aired', async () => {
    const tvShow = mockTVShowRecord({
      episodes: [{
        'fetched': true,
        'title': 'Episode 1',
        'season': 1,
        'number': 1,
        'airing': dayjs().toISOString()
      }]
    })
    expect(tvShow.episodes[0].aired).toBe(false)
  })

  test('for episode after aired', async () => {
    const tvShow = mockTVShowRecord({
      episodes: [{
        'fetched': true,
        'title': 'Episode 1',
        'season': 1,
        'number': 1,
        'airing': dayjs().subtract(7, 'hour').toISOString()
      }]
    })
    expect(tvShow.episodes[0].aired).toBe(true)
  })

  test('for episodes order', async () => {
    const tvShow = mockTVShowRecord({
      episodes: [{
        'fetched': true,
        'title': 'Episode 1',
        'season': 1,
        'number': 1,
        'airing': dayjs().subtract(5, 'day').toISOString()
      }, {
        'fetched': false,
        'title': 'Episode 2',
        'season': 1,
        'number': 2,
        'airing': dayjs().add(2, 'day').toISOString()
      }]
    })
    expect(tvShow.episodes[0].number).toBe(2)
    expect(tvShow.episodes[1].number).toBe(1)
  })

})

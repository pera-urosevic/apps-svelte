import { proxy } from '@pages/database/api'
import { cacheRead, cacheWrite } from '@pages/database/cache'
import type { DocModel, ImporterSearchResult } from '@pages/database/types'

const VERSION = '4.1 SK'
const ID = String(import.meta.env.VITE_API_IGDB_ID)
const SECRET = String(import.meta.env.VITE_API_IGDB_SECRET)
const cacheKey = 'Importer:IGDB:Token'

const auth = async () => {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${ID}&client_secret=${SECRET}&grant_type=client_credentials`
  const response = await proxy(url, 'POST')
  if (!response) return
  const result = JSON.parse(await response.json())
  await cacheWrite(cacheKey, result.access_token)
}

const IGDB = async (url: string, body: string, authorized = false): Promise<Record<string, any> | undefined> => {
  const TOKEN = await cacheRead(cacheKey)
  try {
    const response = await proxy(url, 'POST',
      { 'Client-ID': ID, Authorization: `Bearer ${TOKEN}` },
      body,
    )
    if (!response) return
    if (response.status === 401 && !authorized) {
      await auth()
      return await IGDB(url, body, true)
    }
    const data = JSON.parse(await response.json())
    return data
  } catch (error) {
    console.error('IGDB:', error)
  }
}

export const searchDoc = async (doc: DocModel) => {
  const data = await IGDB(
    'https://api.igdb.com/v4/games',
    `fields id, name, first_release_date, platforms.*; search "${doc.name}"; limit 100;`,
  )

  if (!data) throw new Error('IGDB: no data')

  const results = data.map((item: Record<string, any>) => {
    let label = item.name
    let value = item
    let tooltip = item.platforms?.map((platform: Record<string, any>) => platform.name)
    try {
      const year = new Date(item.first_release_date * 1000).getFullYear()
      label += ` (${year})`
    } catch (error) {
      // silently fail, game has no release date
    }
    return { value, label, tooltip }
  })
  return results
}

export const fetchDoc = async (sr: ImporterSearchResult) => {
  const id = sr.value.id
  const results = await IGDB(
    'https://api.igdb.com/v4/games',
    `fields aggregated_rating, cover.*, first_release_date, genres.*, name, platforms.*, summary, url; where id=${id};`,
  )
  if (!results) return {}
  const result = results[0]

  const doc: DocModel = {}

  // name
  try {
    doc.name = result.name
  } catch (error) {
    console.error('result.name', result.name)
  }

  // image
  try {
    doc.image = 'https:' + result.cover?.url.replace('t_thumb', 't_cover_big')
  } catch (error) {
    console.error('result.cover.url', result.cover?.url)
  }

  // year
  try {
    doc.year = new Date(result.first_release_date * 1000).getFullYear().toString()
  } catch (error) {
    console.error('result.first_release_date', result.first_release_date)
  }

  // platforms
  try {
    doc.platforms = result.platforms.map((platform: Record<string, any>) => platform.name)
  } catch (error) {
    doc.platforms = []
    console.error('result.platforms', result.platforms)
  }

  // genres
  try {
    doc.genres = result.genres.map((genre: Record<string, any>) => genre.name)
  } catch (error) {
    doc.genres = []
    console.error('result.genres', result.genres)
  }

  // website
  try {
    doc.website = result.url
  } catch (error) {
    console.error('result.url', result.url)
  }

  // rating
  try {
    doc.rating = result.aggregated_rating ? Math.round(result.aggregated_rating).toString() : ''
  } catch (error) {
    console.error('result.aggregated_rating', result.aggregated_rating)
  }

  // description
  try {
    doc.description = result.summary
  } catch (error) {
    console.error('result.summary', result.summary)
  }

  // importer
  doc.importer = `IGDB ${VERSION} ${new Date().toISOString()}`

  return doc
}

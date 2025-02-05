import { proxy } from '@pages/database/api'
import type { DocModel, ImporterSearchResult } from '@pages/database/types'

const VERSION = '4.0 SK'
const KEY = String(import.meta.env.VITE_API_RAWG)

export const searchDoc = async (doc: DocModel) => {
  const url = `https://api.rawg.io/api/games?search=${doc.name.toLowerCase()}&key=${KEY}`
  const response = await proxy(url, 'GET')
  if (!response) return
  const data = JSON.parse(await response.json())
  const results = data.results.map((item: Record<string, any>) => {
    let label = item.name
    try {
      const year = new Date(item.released).getFullYear()
      label += ` (${year})`
    } catch (error) {
      // silently fail, game has no release date
    }
    return { value: item, label: label }
  })
  return results
}

export const fetchDoc = async (sr: ImporterSearchResult) => {
  const id = sr.value.id
  const url = `https://api.rawg.io/api/games/${id}?key=${KEY}`
  const response = await proxy(url, 'GET')
  if (!response) return {}
  const result = JSON.parse(await response.json())

  const doc: DocModel = {}

  // name
  try {
    doc.name = result.name
  } catch (error) {
    console.error('result.name', result.name)
  }

  // image
  try {
    doc.image = result.background_image
  } catch (error) {
    console.error('result.background_image', result.background_image)
  }

  // year
  try {
    doc.year = new Date(result.released).getFullYear().toString()
  } catch (error) {
    console.error('result.released', result.released)
  }

  // platforms
  try {
    doc.platforms = result.platforms.map((platform: Record<string, any>) => platform.platform.name)
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
    doc.website = `https://rawg.io/games/${result.slug}`
  } catch (error) {
    console.error('result.slug', result.slug)
  }

  // rating
  try {
    doc.rating = result.metacritic ? result.metacritic.toString() : ''
  } catch (error) {
    console.error('result.metacritic', result.metacritic)
  }

  // description
  try {
    doc.description = result.description_raw
  } catch (error) {
    console.error('result.description_raw', result.description_raw)
  }

  // importer
  doc.importer = `RAWG ${VERSION} ${new Date().toISOString()}`

  return doc
}

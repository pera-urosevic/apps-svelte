import { proxy } from '@pages/database/api'
import type { DocModel, ImporterSearchResult } from '@pages/database/types'

const VERSION = '4.0 SK'
const KEY = String(import.meta.env.VITE_API_GIANTBOMB)

export const searchDoc = async (doc: DocModel) => {
  const query = encodeURIComponent(doc.name)
  const url = `https://www.giantbomb.com/api/search/?api_key=${KEY}&query=${query}&resources=game&format=json`
  const response = await proxy(url, 'GET')
  if (!response) return
  const data = JSON.parse(await response.json())
  const results = data.results.map((item: Record<string, any>) => {
    let label = item.name
    try {
      const year = new Date(item.original_release_date).getFullYear()
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
  const url = `https://www.giantbomb.com/api/game/${id}?api_key=${KEY}&format=json`
  const response = await proxy(url, 'GET')
  if (!response) return {}
  const data = JSON.parse(await response.json())

  const doc: DocModel = {}

  // name
  try {
    doc.name = data.results.name
  } catch (error) {
    console.error('results.name', data.results.name)
  }

  // image
  try {
    doc.image = data.results.image.screen_large_url || data.results.image.screen_url || data.results.image.original_url
  } catch (error) {
    console.error('results.image.screen_url', data.results.image.screen_url)
  }

  // year
  try {
    const originalReleaseDate: string = data.results.original_release_date
    const expectedReleaseYear = data.results.expected_release_year
    doc.year = String(originalReleaseDate ? originalReleaseDate.slice(0, 4) : expectedReleaseYear)
  } catch (error) {
    console.error('results.expected_release_year', data.results.expected_release_year)
  }

  // platforms
  try {
    doc.platforms = data.results.platforms.map((platform: Record<string, any>) => platform.name)
  } catch (error) {
    doc.platforms = []
    console.error('results.platforms', data.results.platforms)
  }

  // genres
  try {
    doc.genres = data.results.genres.map((genre: Record<string, any>) => genre.name)
  } catch (error) {
    doc.genres = []
    console.error('results.genres', data.results.genres)
  }

  // website
  try {
    const guid = data.results.guid
    doc.website = `https://www.giantbomb.com/saboteur/${guid}/`
  } catch (error) {
    console.error('results.guid', data.results.guid)
  }

  // description
  try {
    doc.description = data.results.description
  } catch (error) {
    console.error('results.description', data.results.description)
  }

  // importer
  doc.importer = `GiantBomb ${VERSION} ${new Date().toISOString()}`

  return doc
}

import type { Facet } from '@pages/database/types'
import { caseTitle } from '@services/text'

export const dbTitle = (text?: string) => {
  if (!text) return ''
  return caseTitle(text.replaceAll('_', ' '))
}

export const collectionURL = (database: string, collection: string, facet: Facet) => {
  const where = encodeURIComponent(facet.where)
  const order = encodeURIComponent(facet.order)
  return `/database-collection.html?database=${database}&collection=${collection}&where=${where}&order=${order}`
}

export const docURL = (database: string, collection: string, doc: number) => {
  return `/database-doc.html?database=${database}&collection=${collection}&doc=${doc}`
}

export const escapeQuotes = (str: string) => {
  return str.replace(/'/g, `''`)
}

import { arrayJson, datetimeString, imageUrl, urlImage, jsonArray, stringDatetime } from '@pages/database/convert'
import type { DatabaseModel, DocModel, DocRecord } from '@pages/database/types'

const blankDoc = {
  paid: '0',
  stores: [],
  status: '',
  comments: '',
  image: '',
  year: '',
  platforms: [],
  genres: [],
  website: '',
  rating: -1,
  description: '',
  importer: '',
}

const docFromRecord = (record: DocRecord): DocModel => {
  const doc = {
    ...record,
    stores: jsonArray(record.stores),
    platforms: jsonArray(record.platforms),
    genres: jsonArray(record.genres),
    rating: String(record.rating),
    image: imageUrl(record.image),
    createdAt: stringDatetime(record.createdAt),
    updatedAt: stringDatetime(record.updatedAt),
  } as DocModel
  return doc
}

const recordFromDoc = (doc: DocModel): DocRecord => {
  const record = {
    ...doc,
    stores: arrayJson(doc.stores),
    platforms: arrayJson(doc.platforms),
    genres: arrayJson(doc.genres),
    rating: Number(doc.rating),
    image: urlImage(doc.image),
    updatedAt: datetimeString(new Date()),
  } as DocRecord
  delete record.createdAt
  if (!record.image) delete record.image
  return record
}

const autocompleteFields = {
  selects: ['status'],
  tags: ['stores', 'platforms', 'genres'],
}

const model: DatabaseModel = {
  blankDoc,
  docFromRecord,
  recordFromDoc,
  autocompleteFields,
}

export default model

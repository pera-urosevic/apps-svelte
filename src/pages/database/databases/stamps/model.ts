import { datetimeString, imageUrl, urlImage, stringDatetime } from '@pages/database/convert'
import type { DatabaseModel, DocModel, DocRecord } from '@pages/database/types'

const blankDoc = {
  name: '',
  series: '',
  country: '',
  themes: '',
  issued: '',
  expiry: '',
  size: '',
  colors: '',
  designers: '',
  printers: '',
  format: '',
  emission: '',
  perforation: '',
  printing: '',
  value: '',
  printed: 0,
  colnect: '',
  image: '',
  description: '',
  codes: '',
  duplicates: 0,
  discard: false,
  importer: '',
}

const docFromRecord = (record: DocRecord): DocModel => {
  const doc = {
    ...record,
    image: imageUrl(record.image),
    discard: Boolean(record.discard),
    createdAt: stringDatetime(record.createdAt),
    updatedAt: stringDatetime(record.updatedAt),
  } as DocModel
  return doc
}

const recordFromDoc = (doc: DocModel): DocRecord => {
  const record = {
    ...doc,
    image: urlImage(doc.image),
    discard: doc.discard ? 1 : 0,
    updatedAt: datetimeString(new Date()),
  } as DocRecord
  delete record.createdAt
  if (!record.image) delete record.image
  return record
}

const autocompleteFields = {
  selects: ['country'],
  tags: [],
}

const model: DatabaseModel = {
  blankDoc,
  docFromRecord,
  recordFromDoc,
  autocompleteFields,
}

export default model


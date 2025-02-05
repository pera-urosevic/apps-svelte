import { datetimeString, imageUrl, urlImage, stringDatetime } from '@pages/database/convert'
import type { DatabaseModel, DocModel, DocRecord } from '@pages/database/types'

const blankDoc = {
  date: '',
  tag: '',
  location: '',
  image: '',
}

const docFromRecord = (record: DocRecord): DocModel => {
  const doc = {
    ...record,
    image: imageUrl(record.image),
    createdAt: stringDatetime(record.createdAt),
    updatedAt: stringDatetime(record.updatedAt),
  } as DocModel
  return doc
}

const recordFromDoc = (doc: DocModel): DocRecord => {
  const record = {
    ...doc,
    image: urlImage(doc.image),
    updatedAt: datetimeString(new Date()),
  } as DocRecord
  delete record.createdAt
  if (!record.image) delete record.image
  return record
}

const autocompleteFields = {
  selects: ['tag', 'location'],
  tags: [],
}

const model: DatabaseModel = {
  blankDoc,
  docFromRecord,
  recordFromDoc,
  autocompleteFields,
}

export default model

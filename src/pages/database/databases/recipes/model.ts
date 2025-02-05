import { arrayJson, datetimeString, imageUrl, urlImage, jsonArray, stringDatetime } from '@pages/database/convert'
import type { DatabaseModel, DocModel, DocRecord } from '@pages/database/types'

const blankDoc = {
  image: '',
  components: [],
  steps: [],
}

const docFromRecord = (record: DocRecord): DocModel => {
  const doc = {
    ...record,
    image: imageUrl(record.image),
    components: jsonArray(record.components),
    steps: jsonArray(record.steps),
    createdAt: stringDatetime(record.createdAt),
    updatedAt: stringDatetime(record.updatedAt),
  } as DocModel
  return doc
}

const recordFromDoc = (doc: DocModel): DocRecord => {
  const record = {
    ...doc,
    image: urlImage(doc.image),
    components: arrayJson(doc.components),
    steps: arrayJson(doc.steps),
    updatedAt: datetimeString(new Date()),
  } as DocRecord
  delete record.createdAt
  if (!record.image) delete record.image
  return record
}

const autocompleteFields = {
  selects: [],
  tags: [],
}

const model: DatabaseModel = {
  blankDoc,
  docFromRecord,
  recordFromDoc,
  autocompleteFields,
}

export default model

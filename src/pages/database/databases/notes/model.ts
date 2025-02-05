import { datetimeString, stringDatetime } from '@pages/database/convert'
import type { DatabaseModel, DocModel, DocRecord } from '@pages/database/types'

const blankDoc = {
  content: '',
}

const docFromRecord = (record: DocRecord): DocModel => {
  const doc = {
    ...record,
    updatedAt: stringDatetime(record.updatedAt),
  } as DocModel
  return doc
}

const recordFromDoc = (doc: DocModel): DocRecord => {
  const record = {
    ...doc,
    updatedAt: datetimeString(new Date()),
  } as DocRecord
  delete record.createdAt
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

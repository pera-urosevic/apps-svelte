import { arrayJson, booleanNumber, dateString, datetimeString, imageUrl, urlImage, jsonArray, numberBoolean, stringDate, stringDatetime } from '@pages/database/convert'
import type { DatabaseModel, DocModel, DocRecord } from '@pages/database/types'

const blankDoc = {
  string: '',
  number: 0,
  text: '',
  markdown: '',
  boolean: false,
  date: new Date(),
  datetime: new Date(),
  select: '',
  tags: [],
  list: [],
  image: '',
}

const docFromRecord = (record: DocRecord): DocModel => {
  const doc = {
    ...record,
    boolean: numberBoolean(record.boolean),
    date: stringDate(record.date),
    datetime: stringDatetime(record.datetime),
    tags: jsonArray(record.tags),
    list: jsonArray(record.list),
    image: imageUrl(record.image),
    createdAt: stringDatetime(record.createdAt),
    updatedAt: stringDatetime(record.updatedAt),
  } as DocModel
  return doc
}

const recordFromDoc = (doc: DocModel): DocRecord => {
  const record = {
    ...doc,
    boolean: booleanNumber(doc.boolean),
    date: dateString(doc.date),
    datetime: datetimeString(doc.datetime),
    tags: arrayJson(doc.tags),
    list: arrayJson(doc.list),
    image: urlImage(doc.image),
    updatedAt: datetimeString(new Date()),
  } as DocRecord
  delete record.createdAt
  if (!record.image) delete record.image
  return record
}

const autocompleteFields = {
  selects: ['select'],
  tags: ['tags'],
}

const model: DatabaseModel = {
  blankDoc,
  docFromRecord,
  recordFromDoc,
  autocompleteFields,
}

export default model

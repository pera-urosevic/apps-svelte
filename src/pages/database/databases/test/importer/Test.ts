import type { DocModel, ImporterSearchResult } from '@pages/database/types'
import dayjs from 'dayjs'

const docs = {
  first: {
    name: 'Imported A',
    date: dayjs('2022-02-22'),
    dateTime: dayjs('2022-02-22T:02:02:02.000Z'),
    image: 'https://en.wikipedia.org/static/images/icons/wikipedia.png',
    text: 'a4\na5\na6',
    markdown: '---\n* a1\n* a2\n* a3\n* a4\n* a5\n* a6\n---',
    select: 'A - AAA',
    string: 'a string',
    boolean: true,
    list: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a0'],
    tags: ['TagA1', 'TagA2', 'TagA3', 'TagA4', 'TagA5'],
  },
  second: {
    name: 'Imported B',
    date: dayjs('2022-02-22'),
    dateTime: dayjs('2022-02-22T:02:02:02.000Z'),
    image: '',
    text: '',
    markdown: '',
    select: 'B - BBB',
    string: '',
    boolean: false,
    list: [],
    tags: [],
  },
}

export const searchDoc = async (doc: DocModel) => {
  return [
    { value: docs.first, label: 'Imported A' },
    { value: docs.second, label: 'Imported B' },
  ]
}

export const fetchDoc = async (sr: ImporterSearchResult) => {
  return sr.value
}


import type { RecipeObject, RecipeRecord } from '@pages/brew/types'
import dayjs from '@services/dayjs'

export const parseRecords = (records?: RecipeRecord[]) => {
  if (!records) return []
  return records.map((record) => {
    const time = dayjs.duration(record.time, 's').format('mm:ss')
    const recipe: RecipeObject = {
      id: record.id,
      name: record.name,
      coffee: record.coffee,
      water: record.water,
      grind: record.grind,
      time: time,
      notes: record.notes,
    }
    return recipe
  })
}

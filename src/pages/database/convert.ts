import dayjs from 'dayjs'

export const booleanNumber = (boolean: boolean) => {
  return boolean ? 1 : 0
}

export const numberBoolean = (number: Number) => {
  return number === 1 ? true : false
}

export const dateString = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const stringDate = (string: string) => {
  const date = dayjs(string)
  if (!date.isValid()) return new Date()
  return date.toDate()
}

export const datetimeString = (datetime: Date) => {
  return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')
}

export const stringDatetime = (string: string) => {
  const datetime = dayjs(string)
  if (!datetime.isValid()) return new Date()
  return datetime.toDate()
}

export const jsonArray = (json: string) => {
  if (!json) return []
  const array = JSON.parse(json)
  return array
}

export const arrayJson = (array: any[]) => {
  if (!array) return ''
  const json = JSON.stringify(array)
  return json
}

export const jsonObject = (json: string) => {
  if (!json) return []
  const object = JSON.parse(json)
  return object
}

export const objectJson = (object: Record<string, any>) => {
  if (!object) return ''
  const json = JSON.stringify(object)
  return json
}

export const imageUrl = (image: Buffer) => {
  if (!image) return ''
  const bytes = image.toString('base64')
  if (!bytes) return ''
  const base64 = 'data:image/jpeg;base64,' + bytes
  return base64
}

export const urlImage = (image: string) => {
  if (!image) return ''
  if (image.startsWith('http')) {
    return `🕸${image}🕸`
  }
  return ''
}

const search = (q: string) => {
  const qSafe = q.replaceAll(`'`, `''`)
  const whereNew = `name like '%${qSafe}%' OR description like '%${qSafe}%'`
  return whereNew
}

export default search

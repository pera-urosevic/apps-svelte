const search = (q: string) => {
  const qSafe = q.replaceAll(`'`, `''`)
  const whereNew = `name like '%${qSafe}%' OR components like '%${qSafe}%' OR steps like '%${qSafe}%'`
  return whereNew
}

export default search

const search = (q: string) => {
  const qSafe = q.replaceAll(`'`, `''`)
  const whereNew = `name like '%${qSafe}%' OR tag like '%${qSafe}%' OR location like '%${qSafe}%'`
  return whereNew
}

export default search

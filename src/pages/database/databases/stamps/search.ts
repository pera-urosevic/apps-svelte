const search = (q: string) => {
  const qSafe = q.replaceAll(`'`, `''`)
  const whereNew = `name like '%${qSafe}%' OR series like '%${qSafe}%' OR country like '%${qSafe}%' OR themes like '%${qSafe}%' OR issued like '%${qSafe}%' OR colors like '%${qSafe}%' OR country like '%${qSafe}%' OR value like '%${qSafe}%' OR description like '%${qSafe}%'`
  return whereNew
}

export default search

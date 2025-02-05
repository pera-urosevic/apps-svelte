const search = (q: string) => {
  const qSafe = q.replaceAll(`'`, `''`).replaceAll(`%`, `∫%`)
  const whereNew = `name like '%${qSafe}%' escape '∫'`
  return whereNew
}

export default search

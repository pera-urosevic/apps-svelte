export const caseCapital = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const caseTitle = (text: string) => {
  if (!text) return ''
  const stopwords = ['a', 'an', 'and', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet']
  const splitter = /(\s+|[-‑–—,:;!?()])/
  return text
    .split(splitter)
    .map((word, index, all) => {
      if (index % 2) {
        // if (/\s+/.test(word)) return word
        if (/\s+/.test(word)) return ' '
        return word
      }
      const lower = word.toLowerCase()
      if (index !== 0 && index !== all.length - 1 && stopwords.includes(lower)) {
        return lower
      }
      return caseCapital(word)
    })
    .join('')
}

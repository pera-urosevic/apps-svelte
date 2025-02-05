export type TargetRecord = {
  title: string
  note: string
  sources: string
  release: string
  checked: string
}

export type TargetObject = {
  title: string
  note: string
  sources: string[]
  release: string
  released: boolean
  checked: string
  checkedAgo: string
  releasedAgo?: string
}


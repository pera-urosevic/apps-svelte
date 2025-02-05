import { createFeed } from '@pages/reader/api'

export const onCreateFeed = async () => {
  const name = window.prompt('New Feed Name?')
  if (!name) return
  const data = await createFeed(name)
  if (!data) return
  const feed = data
  window.location.href = `/reader-edit.html?edit=${feed.name}`
}


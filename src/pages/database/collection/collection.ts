import { mount } from 'svelte'
import Collection from '@pages/database/collection/Collection.svelte'

const params = new URLSearchParams(window.location.search)
const props = {
  database: params.get('database') ?? 'test',
  collection: params.get('collection') ?? 'test',
  where: params.get('where') ?? 'true',
  order: params.get('order') ?? 'id DESC',
}

const app = mount(Collection, { props, target: document.body })

export default app

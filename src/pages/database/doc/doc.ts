import { mount } from 'svelte'
import Doc from '@pages/database/doc/Doc.svelte'

const params = new URLSearchParams(window.location.search)
const props = {
  database: params.get('database') ?? 'test',
  collection: params.get('collection') ?? 'test',
  id: Number(params.get('doc')) ?? 1,
}

const app = mount(Doc, { props, target: document.body })

export default app

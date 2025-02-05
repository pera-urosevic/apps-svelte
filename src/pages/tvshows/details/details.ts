import { mount } from 'svelte'
import Details from '@pages/tvshows/details/Details.svelte'

const params = new URLSearchParams(window.location.search)
const props = {
  id: Number(params.get('id')) ?? 0,
}

const app = mount(Details, { props, target: document.body })

export default app

import { mount } from 'svelte'
import Create from '@pages/tvshows/create/Create.svelte'

const params = new URLSearchParams(window.location.search)
const props = {
  title: params.get('title') ?? '',
}

const app = mount(Create, { props, target: document.body })

export default app

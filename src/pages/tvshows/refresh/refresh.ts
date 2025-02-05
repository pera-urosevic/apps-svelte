import { mount } from 'svelte'
import Refresh from '@pages/tvshows/refresh/Refresh.svelte'

const params = new URLSearchParams(window.location.search)
const props = {
  refresh: params.get('refresh') ?? '',
  back: params.get('back') ?? '',
}

const app = mount(Refresh, { props, target: document.body })

export default app

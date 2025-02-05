import { mount } from 'svelte'
import Navigator from './Navigator.svelte'

const params = new URLSearchParams(window.location.search)
const props = {
  path: params.get('path') ?? '',
}

const app = mount(Navigator, { props, target: document.body })

export default app

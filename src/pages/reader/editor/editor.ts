import { mount } from 'svelte'
import Viewer from '@pages/reader/editor/Editor.svelte'

const params = new URLSearchParams(window.location.search)
const props = {
  name: params.get('edit') ?? '',
}

const app = mount(Viewer, { props, target: document.body })

export default app

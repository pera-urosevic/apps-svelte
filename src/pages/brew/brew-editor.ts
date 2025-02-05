import { mount } from 'svelte'
import Editor from './Editor.svelte'

const params = new URLSearchParams(window.location.search)
const props = {
  id: Number(params.get('id'))
}

const app = mount(Editor, { props, target: document.body })

export default app

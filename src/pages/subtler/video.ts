import { mount } from 'svelte'
import Video from './Video.svelte'

const params = new URLSearchParams(window.location.search)
const props = {
  video: params.get('video') ?? '',
}

const app = mount(Video, { props, target: document.body })

export default app

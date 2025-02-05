import { mount } from 'svelte'
import Viewer from '@pages/reader/viewer/Viewer.svelte'

const app = mount(Viewer, { target: document.body })

export default app

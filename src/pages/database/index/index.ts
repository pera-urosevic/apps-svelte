import { mount } from 'svelte'
import Index from '@pages/database/index/Index.svelte'

const app = mount(Index, { target: document.body })

export default app

import type { TargetObjects } from '@pages/seeker/types'
import { writable } from 'svelte/store'

export const targets = writable<TargetObjects>([])

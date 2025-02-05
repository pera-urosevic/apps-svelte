<script lang="ts">
  import Input from '@components/forms/Input.svelte'
  import type { DocModel } from '../types'
  import Importer from './Importer/Importer.svelte'
  import { getDuplicate } from '@pages/database/api'
  import { isMobile } from '@services/browser'

  interface Props {
    value: string
    placeholder: string
    database: string
    collection: string
    doc: DocModel
    onDoc: (doc: DocModel) => void
    onValue: (value: any) => void
  }

  const { value, placeholder, onValue, doc, database, collection, onDoc }: Props = $props()

  let warned = false

  const onFocus = (event: FocusEvent) => {
    if (isMobile()) return
    const input = event.target as HTMLInputElement
    if (input) input.select()
  }

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    onValue(target.value)
  }

  const onCheckDuplicate = async (e: Event) => {
    if (warned) return
    const target = e.target as HTMLInputElement
    const name = target.value
    const exists = await getDuplicate(database, collection, doc.id, name)
    if (exists) alert(`${name} already exists!`)
    warned = true
  }
</script>

<div class="EditName">
  <Input
    autofocus
    type="text"
    {value}
    {placeholder}
    title={placeholder}
    onfocus={onFocus}
    oninput={onInput}
    onblur={onCheckDuplicate}
  />
  <Importer {doc} {onDoc} {database} />
</div>

<style>
  .EditName {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }
</style>

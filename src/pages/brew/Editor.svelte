<script lang="ts">
  import Button from '@components/actions/Button.svelte'
  import ButtonText from '@components/actions/ButtonText.svelte'
  import Link from '@components/actions/Link.svelte'
  import Input from '@components/forms/Input.svelte'
  import Label from '@components/forms/Label.svelte'
  import Textarea from '@components/forms/Textarea.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import { createRecipe, getRecipe, removeRecipe, updateRecipe } from '@pages/brew/api'
  import type { RecipeRecord } from '@pages/brew/types'
  import { onMount } from 'svelte'

  type Props = {
    id: number
  }
  const { id = 0 }: Props = $props()

  let record = $state<RecipeRecord>()

  const onSave = async () => {
    if (!record) return
    const ok = record.id < 1 ? await createRecipe(record) : await updateRecipe(record)
    if (ok) window.location.href = `/brew.html`
  }

  const onRemove = async () => {
    if (!record) return
    if (record.id < 1) return
    const confirmed = confirm('Are you sure you want to remove this recipe?')
    if (!confirmed) return
    const ok = await removeRecipe(record.id)
    if (ok) window.location.href = `/brew.html`
  }

  const onName = (e: Event) => {
    if (!record) return
    const target = e.target as HTMLInputElement
    record.name = target.value
  }

  const onCoffee = (e: Event) => {
    if (!record) return
    const target = e.target as HTMLInputElement
    record.coffee = Number(target.value)
  }

  const onWater = (e: Event) => {
    if (!record) return
    const target = e.target as HTMLInputElement
    record.water = Number(target.value)
  }

  const onGrind = (e: Event) => {
    if (!record) return
    const target = e.target as HTMLInputElement
    record.grind = target.value
  }

  const onTime = (e: Event) => {
    if (!record) return
    const target = e.target as HTMLInputElement
    record.time = Number(target.value)
  }

  const onNotes = (e: Event) => {
    if (!record) return
    const target = e.target as HTMLInputElement
    record.notes = target.value
  }

  onMount(async () => {
    if (id) {
      const res = await getRecipe(id)
      if (res) record = res
      return
    }
    record = {
      id: 0,
      name: 'New',
      coffee: 20,
      water: 240,
      grind: '',
      time: 180,
      notes: '',
    }
  })
</script>

<Header>
  {#snippet start()}
    <Link href="/brew.html">Brew</Link>
  {/snippet}
</Header>
<Main>
  {#if record}
    <div class="form">
      <Label for="name">Name</Label>
      <Input type="text" name="name" id="name" value={record.name} oninput={onName} />
      <Label for="coffee">Coffee</Label>
      <Input type="number" step="0.1" name="coffee" id="coffee" value={record.coffee} oninput={onCoffee} />
      <Label for="water">Water</Label>
      <Input type="number" step="1" name="water" id="water" value={record.water} oninput={onWater} />
      <Label for="grind">Grind</Label>
      <Input type="text" name="grind" id="grind" value={record.grind} oninput={onGrind} />
      <Label for="time">Time</Label>
      <Input type="number" step="0" name="time" id="time" value={record.time} oninput={onTime} />
      <Label for="notes">Notes</Label>
      <Textarea name="notes" id="notes" value={record.notes} oninput={onNotes} />
      &nbsp;
      <div class="actions">
        <Button name="save" onclick={onSave}>Save</Button>
        <ButtonText name="remove" onclick={onRemove}>Remove</ButtonText>
      </div>
    </div>
  {/if}
</Main>

<style>
  .form {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 10px;
    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  :global(body.desktop .form) {
    width: 400px;
    place-self: center;
  }
</style>

<script lang="ts">
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import Input from '@components/forms/Input.svelte'
  import { packs } from '~external/seeker/'
  import { onAdd } from '@pages/seeker/stores/onAdd'

  const params = new URLSearchParams(window.location.search)

  let targetTitle = $state<string>(params.get('add') ?? '')
  let targetNote = $state<string>(params.get('note') ?? '')
  let targetRelease = $state<string>(params.get('release') ?? '')

  const onTitle = (event: Event) => {
    const target = event.target as HTMLInputElement
    targetTitle = target.value
  }

  const onNote = (event: Event) => {
    const target = event.target as HTMLInputElement
    targetNote = target.value
  }

  const onRelease = (event: Event) => {
    const target = event.target as HTMLInputElement
    targetRelease = target.value
  }

  const onNew = async () => {
    const added = await onAdd(targetTitle, targetNote, targetRelease)
    if (added) {
      targetTitle = ''
      targetNote = ''
      targetRelease = ''
    }
  }
</script>

<div class="form">
  <Input type="text" placeholder="Title" value={targetTitle} onchange={onTitle} />
  <Input type="text" placeholder="Note" maxlength={4} list="notes" value={targetNote} onchange={onNote} />
  <datalist id="notes">
    {#each Object.keys(packs) as note}
      <option value={note}></option>
    {/each}
  </datalist>
  <Input type="text" placeholder="Release" value={targetRelease} onchange={onRelease} />
  <ButtonEmoji name="create" onclick={onNew}>➕</ButtonEmoji>
</div>

<style>
  .form {
    display: grid;
    grid-template-columns: auto 80px 120px auto;
    align-items: center;
    gap: 8px;
  }
</style>

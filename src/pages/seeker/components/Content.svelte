<script lang="ts">
  import { onNote } from '@pages/seeker/stores/onNote'
  import { onTitle } from '@pages/seeker/stores/onTitle'
  import Button from '@components/actions/Button.svelte'
  import Sources from '@pages/seeker/components/Sources.svelte'
  import type { TargetObject } from '@pages/seeker/types'

  type Props = {
    target: TargetObject
  }
  let { target }: Props = $props()
</script>

<div class="content">
  <div class="form">
    <Button name="note" onclick={() => onNote(target)}>{target.note}</Button>
    <Button name="title" onclick={() => onTitle(target)}>{target.title}</Button>
  </div>
  <Sources {target} />
</div>

<style>
  .content {
    margin-top: 8px;
    border-top: 1px solid var(--color-primary-dark);
    padding-top: 4px;
  }
  .form {
    padding: 8px;
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
</style>

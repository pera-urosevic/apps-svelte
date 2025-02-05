<script lang="ts">
  import Button from '@components/actions/Button.svelte'
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import ButtonText from '@components/actions/ButtonText.svelte'
  import { isStale } from '@pages/seeker/stores/isStale'
  import { onRelease } from '@pages/seeker/stores/onRelease'
  import { onRemove } from '@pages/seeker/stores/onRemove'
  import { onSeek } from '@pages/seeker/stores/onSeek'
  import { onWeb } from '@pages/seeker/stores/onWeb'
  import type { TargetObject } from '@pages/seeker/types'

  type Props = {
    target: TargetObject
    onToggleFolded: (e: Event) => void
  }
  let { target, onToggleFolded }: Props = $props()
  const classStale = isStale(target) ? 'stale' : ''
</script>

<button class="header" class:stale={classStale} onclick={onToggleFolded}>
  <Button name="title" onclick={() => onSeek(target)}>{target.note} {target.title}</Button>
  <div class="actions">
    <div class="muted-0">
      {target.checkedAgo}
    </div>
    <div class="muted-1">
      <ButtonText onclick={() => onRelease(target)}>
        {target.release}
      </ButtonText>
    </div>
    <div class="muted-2" class:stale={classStale}>
      {target.releasedAgo && `(${target.releasedAgo})`}
    </div>
    <div class="buttons">
      <ButtonEmoji name="web" onclick={() => onWeb(target)}>🌍</ButtonEmoji>
      <ButtonEmoji name="remove" onclick={() => onRemove(target)}>❌</ButtonEmoji>
    </div>
  </div>
</button>

<style>
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
    border: none;
    background-color: transparent;
    :global(> .Button) {
      background-color: var(--color-base-alt);
    }
  }
  .actions {
    display: grid;
    grid-template-columns: 120px 120px 120px auto;
    align-items: center;
    justify-items: end;
    gap: 8px;
    cursor: default;
    .muted-0 {
      opacity: 1;
    }
    .muted-1 {
      opacity: 0.5;
    }
    .muted-2 {
      opacity: 0.25;
    }
    .buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      margin-left: 8px;
    }
    .stale {
      color: var(--color-error);
      opacity: 1;
    }
  }
  :global(body.mobile) {
    .header {
      flex-direction: column;
      align-items: start;
    }
    .actions {
      padding: 6px 16px 12px 16px;
      display: grid;
      grid-template-columns: repeat(3, auto);
      grid-template-rows: repeat(2, 1fr);
      align-items: start;
      justify-items: start;
      gap: 8px;
      row-gap: 12px;
      .buttons {
        margin-left: 0;
      }
    }
  }
</style>

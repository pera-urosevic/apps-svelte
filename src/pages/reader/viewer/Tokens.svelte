<script lang="ts">
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import type { TokenRating } from '@pages/reader/types'
  import { onAddToken } from '@pages/reader/viewer/stores/onAddToken'
  import { onRemoveToken } from '@pages/reader/viewer/stores/onRemoveToken'
  import { onDestroy, onMount } from 'svelte'

  let selectedText: string = $state('')

  const onSelectionChange = () => {
    const selection = document.getSelection()
    if (selection && selection.type === 'Range') {
      selectedText = selection.toString().trim()
    } else {
      selectedText = ''
    }
  }

  const onToken = (score: TokenRating) => {
    const token = window.prompt(`Token (${score})`, selectedText.toLowerCase().trim())
    if (!token) return
    if (score === 0) {
      onRemoveToken(token)
    } else {
      onAddToken(token, score)
    }
  }

  onMount(() => {
    document.addEventListener('selectionchange', onSelectionChange)
  })

  onDestroy(() => {
    document.removeEventListener('selectionchange', onSelectionChange)
  })
</script>

<div class="tokens" class:visible={selectedText}>
  <ButtonEmoji onclick={() => onToken(-1)}>👎</ButtonEmoji>
  <ButtonEmoji onclick={() => onToken(0)}>⛓️‍💥</ButtonEmoji>
  <ButtonEmoji onclick={() => onToken(+1)}>👍</ButtonEmoji>
</div>

<style>
  .tokens {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    visibility: hidden;
    &.visible {
      visibility: visible;
    }
  }
</style>

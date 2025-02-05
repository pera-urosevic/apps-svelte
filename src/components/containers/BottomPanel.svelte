<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    show?: boolean
    children?: Snippet
  }
  const { show, children }: Props = $props()
</script>

<div class="BottomPanel" class:visible={show}>{@render children?.()}</div>

<style>
  .BottomPanel {
    visibility: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: var(--color-base-alt);
    border-top: 1px solid var(--color-primary);
    box-shadow: 0 -2px 12px #000;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    &.visible {
      visibility: visible;
    }
  }
</style>

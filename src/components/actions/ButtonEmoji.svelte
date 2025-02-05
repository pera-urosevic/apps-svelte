<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  const { children, ...props }: HTMLButtonAttributes = $props()
</script>

<button class="ButtonEmoji" {...props}>{@render children?.()}</button>

<style>
  .ButtonEmoji {
    user-select: none;
    font-size: 16px;
    width: 1em;
    height: 1em;
    line-height: 1em;
    padding: 0.2em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 50%;
    font-family: var(--font-family);
    cursor: pointer;
    filter: saturate(0.25) opacity(0.5);
    &:hover {
      filter: saturate(1) opacity(1);
    }
    &:disabled {
      filter: saturate(0) opacity(0.1);
      cursor: not-allowed;
      &:hover {
        filter: saturate(0) opacity(0.1);
      }
    }
  }
</style>

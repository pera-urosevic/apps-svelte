<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  const {children, ...props}: HTMLButtonAttributes = $props()
</script>

<button class="ButtonText" {...props}>{@render children?.()}</button>

<style>
  .ButtonText {
    user-select: none;
    background-color: transparent;
    color: var(--color-light);
    border: none;
    font-family: var(--font-family);
    font-size: var(--font-size);
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      color: var(--color-primary);
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      &:hover {
        filter: none;
      }
    }
  }
</style>

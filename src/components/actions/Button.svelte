<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  const {children, ...props}: HTMLButtonAttributes = $props()
</script>

<button class="Button" {...props}>{@render children?.()}</button>

<style>
  .Button {
    user-select: none;
    background-color: var(--color-primary);
    color: var(--color-light);
    border: none;
    border-radius: 6px;
    height: 36px;
    line-height: 36px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 12px;
    font-family: var(--font-family);
    font-size: var(--font-size);
    cursor: pointer;
    white-space: nowrap;
    overflow-x: clip;
    text-overflow: ellipsis;
    &:hover {
      filter: brightness(1.2);
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

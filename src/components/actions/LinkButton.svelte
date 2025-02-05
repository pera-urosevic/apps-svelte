<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  const { children, ...props }: HTMLAnchorAttributes = $props()
</script>

<a class="LinkButton" {...props}>{@render children?.()}</a>

<style>
  .LinkButton {
    user-select: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary);
    color: var(--color-light);
    border-radius: 6px;
    height: 36px;
    line-height: 36px;
    padding: 0 12px;
    font-family: var(--font-family);
    font-size: var(--font-size);
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
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

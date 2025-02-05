<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  const {children, ...props}: HTMLAnchorAttributes = $props()
</script>

<a class="LinkEmoji" {...props}>{@render children?.()}</a>

<style>
  .LinkEmoji {
    user-select: none;
    font-size: 16px;
    width: 1em;
    height: 1em;
    padding: 0.2em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 50%;
    font-family: var(--font-family);
    cursor: pointer;
    text-decoration: none;
    filter: saturate(0) brightness(0.5);
    &:hover {
      filter: saturate(1) brightness(1);
    }
    &:active {
      text-decoration: none;
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

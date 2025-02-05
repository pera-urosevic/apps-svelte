<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  const {children, ...props}: HTMLAnchorAttributes = $props()
</script>

<a class="LinkText" {...props}>{@render children?.()}</a>

<style>
  .LinkText {
    user-select: none;
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    &:hover {
      color: var(--color-primary);
    }
  }
</style>

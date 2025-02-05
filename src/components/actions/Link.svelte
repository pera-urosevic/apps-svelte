<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  const {children, ...props}: HTMLAnchorAttributes = $props()
</script>

<a class="Link" {...props}>{@render children?.()}</a>

<style>
  .Link {
    user-select: none;
    color: var(--color-primary-light);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      text-decoration-color: var(--color-primary-dark);
      text-decoration-thickness: 1px;
      text-underline-offset: 4px;
    }
  }
</style>

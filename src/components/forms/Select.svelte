<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements'

  const {children, ...props}: HTMLSelectAttributes = $props()
</script>

<select class="Select" {...props}>
  {@render children?.()}
</select>

<style>
  .Select {
    background-color: var(--color-base);
    color: var(--color-light);
    border: 1px solid var(--color-primary);
    border-radius: 6px;
    font-family: var(--font-family);
    font-size: var(--font-size);
    accent-color: var(--color-primary);
    height: 36px;
    line-height: 36px;
    padding: 0 6px;
    &:focus {
      outline: none;
      border-color: var(--color-secondary);
    }
  }
</style>

<script lang="ts">
  import type { HTMLLabelAttributes } from 'svelte/elements'
  const { children, ...props }: HTMLLabelAttributes = $props()
</script>

<label class="Label" {...props}>{@render children?.()}</label>

<style>
  .Label {
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    font-family: var(--font-family);
    font-size: var(--font-size);
  }
</style>

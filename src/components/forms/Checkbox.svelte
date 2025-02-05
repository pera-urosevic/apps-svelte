<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'
  const props: HTMLInputAttributes = $props()
</script>

<input class="Checkbox" {...props} type="checkbox" />

<style>
  .Checkbox {
    appearance: none;
    -webkit-appearance: none;
    accent-color: var(--color-primary);
    border-radius: 6px;
    min-height: 36px;
    height: 36px;
    max-height: 36px;
    min-width: 36px;
    width: 36px;
    max-width: 36px;
    margin: 0;
    border: 1px solid var(--color-primary);
    background-color: var(--color-base);
    cursor: pointer;
    &:checked {
      background-color: var(--color-primary);
      &::before {
        content: '✓';
        color: var(--color-light);
        display: block;
        text-align: center;
        line-height: 36px;
        font-size: 20px;
        font-family: var(--font-family);
        font-weight: bold;
      }
    }
  }
</style>

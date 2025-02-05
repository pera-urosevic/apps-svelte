<script lang="ts">
  import type { Action } from 'svelte/action'
  import type { HTMLInputAttributes } from 'svelte/elements'

  type Props = HTMLInputAttributes & { autofocus?: boolean }
  const { autofocus, ...props }: Props = $props()

  const focus: Action = (node) => {
    if (autofocus) node.focus()
  }
</script>

<input class="Input" use:focus {...props} />

<style>
  .Input {
    background-color: var(--color-base);
    color: var(--color-light);
    border: 1px solid var(--color-primary);
    border-radius: 6px;
    height: 22px;
    line-height: 22px;
    padding: 6px 8px;
    font-family: var(--font-family);
    font-size: var(--font-size);
    accent-color: var(--color-primary);
    &:focus {
      outline: none;
      border-color: var(--color-secondary);
    }
    &:autofill {
      background-clip: text;
      -webkit-background-clip: text;
      -moz-background-clip: text;
      -webkit-text-fill-color: var(--color-light);
      border: 1px solid var(--color-primary);
      &:focus {
        outline: none;
        border-color: var(--color-secondary);
      }
    }
  }
</style>

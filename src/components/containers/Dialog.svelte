<script lang="ts">
  import type { HTMLDialogAttributes } from 'svelte/elements'

  type Props = HTMLDialogAttributes
  const { children, ...props }: Props = $props()
</script>

<dialog class="Dialog" {...props}>
  <form method="dialog">
    {@render children?.()}
  </form>
</dialog>

<style>
  .Dialog {
    background-color: var(--color-base);
    border: 1px solid var(--color-primary);
    border-radius: 6px;
    box-shadow: 0 0 12px #000;
    padding: 16px;
  }
</style>

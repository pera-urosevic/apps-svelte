<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    button: Snippet<[() => void]>
    dropdown: Snippet
  }
  const { button, dropdown }: Props = $props()

  let open = $state(false)

  const onMenu = () => {
    open = !open
  }
</script>

<div class="Menu">
  {@render button(onMenu)}
  {#if open}
    <button class="mask" onclick={onMenu} aria-label="close"></button>
    <button class="dropdown" onclick={onMenu}>
      {@render dropdown()}
    </button>
  {/if}
</div>

<style>
  .Menu {
    position: relative;
  }
  .dropdown {
    position: absolute;
    right: 0;
    z-index: 10;
    border-radius: 6px;
    border: 1px solid var(--color-primary-darker);
    background-color: var(--color-base);
    box-shadow: 0 0 12px #000;
  }
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    border: none;
    background-color: var(--color-mask);
  }
</style>

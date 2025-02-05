<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    children?: Snippet
  }
  const { children }: Props = $props()
</script>

<main class="Main">
  {@render children?.()}
</main>

<style>
  .Main {
    position: absolute;
    top: var(--header--height);
    left: 0;
    right: 0;
    bottom: 0;
    margin: 16px;
    overflow: auto;
    scrollbar-width: thin;
  }
</style>

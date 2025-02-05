<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'
  const props: HTMLInputAttributes = $props()
</script>

<input class="Slider" {...props} type="range" />

<style>
  .Slider {
    accent-color: var(--color-primary);
    cursor: pointer;
  }
</style>

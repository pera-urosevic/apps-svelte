<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'

  interface Props {
    children?: import('svelte').Snippet
  }
  let { children }: Props = $props()

  let root: HTMLElement | undefined = $state()
  let dispatch = createEventDispatcher()

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) dispatch('intersect', entry)
    })
  })

  onMount(() => {
    if (root) observer.observe(root)
  })

  onDestroy(() => {
    observer.disconnect()
  })
</script>

<div class="center" bind:this={root}>
  {@render children?.()}
</div>

<style>
  .center {
    display: flex;
    justify-content: center;
  }
</style>

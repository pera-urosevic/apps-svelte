<script lang="ts">
  import Content from '@pages/seeker/components/Content.svelte'
  import Header from '@pages/seeker/components/Header.svelte'
  import type { TargetObject } from '@pages/seeker/types'

  type Props = {
    target: TargetObject
  }
  const { target }: Props = $props()

  let folded = $state<boolean>(true)

  const onToggleFolded = (e: Event) => {
    if (e.target === e.currentTarget) {
      folded = !folded
    }
  }
</script>

<div class="target" class:unreleased={!target.released}>
  <Header {target} {onToggleFolded} />
  {#if !folded}
    <Content {target} />
  {/if}
</div>

<style>
  .target {
    display: flex;
    flex-direction: column;
    background-color: var(--color-base-alt);
    padding: 4px 16px 4px 4px;
    border-radius: 6px;
    &.unreleased {
      opacity: 0.25;
    }
  }
</style>

<script lang="ts">
  import Gauge from '@pages/monitor/sensors/common/Gauge.svelte'
  import { storage } from '@pages/monitor/stores'
</script>

{#if $storage}
  <div class="container">
    {#each Object.entries($storage) as [key, value]}
      {#if !key.startsWith('/boot')}
        <Gauge label={key} value={Math.round(value)} />
      {/if}
    {/each}
  </div>
{/if}

<style>
  .container {
    display: flex;
    flex-direction: row;
    gap: 6px;
  }
</style>

<script lang="ts">
  import { uptime } from '@pages/monitor/stores'
</script>

{#if $uptime}
  <div class="uptime" title="Uptime">
    Uptime {$uptime.days}d {$uptime.hours}h
  </div>
{/if}

<style>
  .uptime {
    font-size: 24px;
  }
</style>

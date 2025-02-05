<script lang="ts">
  import Gauge from '@pages/monitor/sensors/common/Gauge.svelte'
  import { mem } from '@pages/monitor/stores'
</script>

{#if $mem}
  <Gauge label="mem" value={Math.round($mem.usage)} />
{/if}

<script lang="ts">
  import Gauge from '@pages/monitor/sensors/common/Gauge.svelte'
  import { cpu } from '@pages/monitor/stores'
</script>

{#if $cpu}
  <Gauge label="cpu" value={Math.round($cpu.usage)} />
{/if}

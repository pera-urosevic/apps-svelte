<script lang="ts">
  import Gauge from '@pages/monitor/sensors/common/Gauge.svelte'
  import { temp } from '@pages/monitor/stores'
</script>

{#if $temp}
  <Gauge label="temp" value={Math.round($temp.cpu_thermal)} unit="°C" />
{/if}

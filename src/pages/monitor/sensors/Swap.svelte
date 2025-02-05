<script lang="ts">
  import Gauge from '@pages/monitor/sensors/common/Gauge.svelte'
  import { swap } from '@pages/monitor/stores'
</script>

{#if $swap}
  <Gauge label="swap" value={Math.round($swap.usage)} minColor={[120, 120, 120]} maxColor={[120, 120, 120]} />
{/if}

<script lang="ts">
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import Uptime from '@pages/monitor/sensors/Uptime.svelte'
  import Temp from '@pages/monitor/sensors/Temp.svelte'
  import Storage from '@pages/monitor/sensors/Storage.svelte'
  import Cpu from '@pages/monitor/sensors/Cpu.svelte'
  import Mem from '@pages/monitor/sensors/Mem.svelte'
  import Swap from '@pages/monitor/sensors/Swap.svelte'
  import Log from '@pages/monitor/notifications/Log.svelte'
  import { notifications, ready, stats } from '@pages/monitor/stores'
  import { onMount } from 'svelte'
  import Link from '@components/actions/Link.svelte'
  import { onFetchData } from '@pages/monitor/stores/onFetchData'

  onMount(async () => {
    await onFetchData()
  })
</script>

<Header>
  {#snippet start()}
    <Link href="/monitor.html">Monitor</Link>
  {/snippet}
</Header>
<Main>
  {#if $ready}
    <div class="stats">
      {#if $stats}
        <div><Uptime /></div>
        <div class="gauges">
          <Temp />
          <div><Storage /></div>
          <Cpu />
          <Mem />
          <Swap />
        </div>
      {/if}
      {#if $notifications}<Log />{/if}
    </div>
  {/if}
</Main>

<style>
  .stats {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 24px;
    .gauges {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: start;
      gap: 6px;
      margin-bottom: 12px;
    }
  }
  :global(body.mobile) {
    .stats {
      align-items: center;
      gap: 12px;
    }
    .gauges {
      margin-top: 12px;
      flex-direction: column;
      gap: 12px;
    }
  }
</style>

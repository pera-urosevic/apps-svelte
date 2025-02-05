<script lang="ts">
  import Tab from '@pages/monitor/notifications/controls/Tab.svelte'
  import Messages from '@pages/monitor/notifications/controls/Messages.svelte'
  import { channel, channelNotificationsCount } from '@pages/monitor/stores'
  import { Channel } from '@pages/monitor/types'
  import { notificationColor } from '@pages/monitor/helpers'

  const color = $derived(notificationColor(Channel[$channel]))
</script>

{#if $channelNotificationsCount > 0}
  <div class="log">
    <div class="tabs">
      {#each Object.values(Channel) as channel}
        <Tab {channel} />
      {/each}
    </div>
    <Messages {color} />
  </div>
{/if}

<style>
  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    gap: 6px;
  }
</style>

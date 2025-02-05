<script lang="ts">
  import Button from '@components/actions/Button.svelte'
  import { notificationColor } from '@pages/monitor/helpers'
  import { notifications } from '@pages/monitor/stores'
  import { onChannel } from '@pages/monitor/stores/onChannel'
  import type { Channel } from '@pages/monitor/types'

  type Props = {
    channel: Channel
  }
  const { channel }: Props = $props()
  const color = notificationColor(channel)
  const count = $derived($notifications[channel]?.length ?? 0)
</script>

{#if count > 0}
  <Button onclick={() => onChannel(channel)} style={`background: ${color}`}>
    {channel} ({count})
  </Button>
{/if}

<script lang="ts">
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import { channel, channelNotifications } from '@pages/monitor/stores'
  import { onRemoveNotification } from '@pages/monitor/stores/onRemoveNotification'
  import { onRemoveNotifications } from '@pages/monitor/stores/onRemoveNotifications'
  import dayjs from '@services/dayjs'

  type Props = {
    color: string
  }
  const { color }: Props = $props()
</script>

<div class="content" style={`color: ${color}`}>
  <table>
    <thead>
      <tr>
        <th>Time</th>
        <th>Topic</th>
        <th>Message</th>
        <th><ButtonEmoji onclick={() => onRemoveNotifications($channel)}>❌</ButtonEmoji></th>
      </tr>
    </thead>
    <tbody>
      {#each $channelNotifications as n}
        <tr>
          <td>{dayjs.unix(n.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
          <td>{n.topic}</td>
          <td class="message">{n.message}</td>
          <td class="remove">
            <ButtonEmoji onclick={() => onRemoveNotification(n)}>❌</ButtonEmoji>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  table {
    width: 100%;
    tr:hover td {
      background-color: var(--color-base-alt);
    }
    th,
    td {
      padding: 6px 12px 6px 0;
      vertical-align: top;
      text-align: left;
    }
    td {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 1%;
      &.message {
        white-space: normal;
        word-break: break-word;
        min-width: 300px;
        width: 100%;
      }
      &.remove {
        padding-top: 12px;
      }
    }
  }
  :global(body.mobile) {
    table {
      margin-top: 12px;
      display: block;
    }
    thead {
      display: none;
    }
    tbody {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    tr {
      display: flex;
      flex-direction: column;
      background-color: var(--color-base-alt);
      padding: 8px 12px;
      border-radius: 8px;
      gap: 4px;
      position: relative;
    }
    td {
      display: block;
      width: 100%;
      padding: 0;
      &.remove {
        width: auto;
        position: absolute;
        top: 8px;
        right: 12px;
      }
    }
  }
</style>

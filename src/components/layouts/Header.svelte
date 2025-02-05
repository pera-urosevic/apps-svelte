<script lang="ts">
  import Busy from '@components/layouts/Busy.svelte'
  import type { Snippet } from 'svelte'

  type Props = {
    start?: Snippet
    center?: Snippet
    end?: Snippet
  }
  const { start, center, end }: Props = $props()
</script>

<header class="Header">
  <div class="section start">{@render start?.()}</div>
  <div class="section center">{@render center?.()}</div>
  <div class="section end">{@render end?.()}</div>
</header>
<Busy />

<style>
  .Header {
    background-color: var(--color-header);
    height: var(--header--height);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 16px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    overflow: visible;
    scrollbar-width: none;
    justify-items: center;
    align-items: center;
    gap: 16px;
    .section {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }
    :global {
      .Link {
        white-space: nowrap;
        font-size: 20px;
        font-weight: 500;
        color: var(--color-light);
        &:hover {
          text-decoration: underline;
          text-decoration-color: var(--color-light);
          text-decoration-thickness: 1px;
          text-underline-offset: 4px;
        }
      }
      .ButtonText {
        white-space: nowrap;
        font-size: 20px;
        font-weight: 500;
      }
      .LinkButton,
      .Button {
        white-space: nowrap;
        background-color: var(--color-header);
        img {
          width: 24px;
          height: 24px;
        }
      }
      .ButtonEmoji,
      .LinkEmoji {
        font-size: 24px;
      }
      .Input {
        height: 16px;
        line-height: 16px;
      }
      .Select {
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>

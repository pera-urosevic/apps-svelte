<script lang="ts">
  import type { CategoryTVShow } from '@pages/tvshows/types'
  import netflix from '@pages/tvshows/icons/netflix.svg?url'
  import apple from '@pages/tvshows/icons/apple.svg?url'
  import LinkText from '@components/actions/LinkText.svelte'
  import { isShortRuntime } from '@pages/tvshows/helpers'

  type Props = {
    categoryName: string
    tvShow: CategoryTVShow
  }
  const { categoryName, tvShow }: Props = $props()

  const streams: Record<string, string> = { netflix, apple }
</script>

<LinkText href={`/tvshows-details.html?id=${tvShow.id}`} title={tvShow.title}>
  <span class="show">
    {#if categoryName === 'Stale'}
      <span class="stale">💫</span>
    {/if}
    {#if categoryName === 'Fetch' && tvShow.watching}
      <span class="watching">💥</span>
    {/if}
    {#if categoryName === 'Airing'}
      <span class="airing">{tvShow.nextAiring || '~'}</span>
    {/if}
    {#if categoryName === 'Airing' && tvShow.watching}
      <span class="watching">🍿</span>
    {/if}
    <span class="title" class:watching={categoryName !== 'Airing' && categoryName !== 'Fetch' && tvShow.watching}>
      {tvShow.title}
    </span>
    {tvShow.runtime && isShortRuntime(tvShow.runtime) ? '⏱️' : ''}
    {#if categoryName !== 'Airing' && categoryName !== 'Fetch' && tvShow.watching}
      <span class="watching">🍿</span>
    {/if}
    {#if tvShow.stream}
      <img class="stream" src={streams[tvShow.stream]} alt="" />
    {/if}
  </span>
</LinkText>

<style>
  .show {
    display: flex;
    gap: 4px;
    font-size: 15px;
    line-height: 24px;
    align-items: center;
  }
  .airing {
    color: var(--color-light);
    background-color: var(--color-base-alt);
    border-radius: 4px;
    min-width: 22px;
    max-width: 22px;
    font-size: 12px;
    padding: 0 2px;
    line-height: 16px;
    text-align: right;
  }
  .title {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &.watching {
      color: var(--color-success);
      &:hover {
        color: var(--color-primary);
      }
    }
  }
  .stream {
    width: 20px;
    height: 20px;
    opacity: 0.5;
    transform: translateY(1px);
  }
  :global(body.mobile) {
    .show {
      width: 100%;
      overflow: hidden;
    }
    .title {
      max-width: 100%;
    }
  }
</style>

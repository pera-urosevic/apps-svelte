<script lang="ts">
  import Link from '@components/actions/Link.svelte'
  import LinkEmoji from '@components/actions/LinkEmoji.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import netflix from '@pages/tvshows/icons/netflix.svg?url'
  import apple from '@pages/tvshows/icons/apple.svg?url'
  import type { TVShowRecord } from '@pages/tvshows/types'
  import { onMount } from 'svelte'
  import { getTVShows } from '@pages/tvshows/api'
  import { busy } from '@components/layouts/store'
  import { isLongRuntime, isShortRuntime } from '@pages/tvshows/helpers'
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import { getCategory } from '@pages/tvshows/parse/parseTVShowCategories'

  let pool = $state<TVShowRecord[]>([])
  let groups = $state<Record<string, TVShowRecord[]>>({})
  let watch = $state<TVShowRecord>()

  const streams: Record<string, string> = { netflix, apple }

  const onWatch = () => {
    watch = pool[Math.floor(Math.random() * pool.length)]
  }

  onMount(async () => {
    busy.set(true)
    const tvshowCategories = await getTVShows()
    busy.set(false)
    if (!tvshowCategories) return
    pool = tvshowCategories.filter((tvshow) => {
      if (!tvshow.watching) return false
      return tvshow.episodes.every((ep: any) => ep.fetched)
    })
    groups = {
      short: pool.filter((tvshow) => isLongRuntime(tvshow.runtime)),
      long: pool.filter((tvshow) => isShortRuntime(tvshow.runtime)),
    }
    onWatch()
  })
</script>

{#if watch}
  <Header>
    {#snippet start()}
      <Link href="/tvshows.html">TV Shows</Link>
      <Link href="/tvshows-watch.html">Watch</Link>
    {/snippet}
    {#snippet end()}
      <ButtonEmoji onclick={onWatch}>🎲</ButtonEmoji>
    {/snippet}
  </Header>
  <Main>
    <div class="grid">
      <div class="watch">
        <a class="title" href={`/tvshows-details.html?id=${watch.id}`}>
          {watch.title}
        </a>
        <div class="links">
          {#if watch.tvmaze}
            <LinkEmoji href={`https://www.tvmaze.com/shows/${watch.tvmaze}`} target="_blank" rel="noreferrer noopener">
              📺
            </LinkEmoji>
          {/if}
          {#if watch.imdb}
            <LinkEmoji href={`https://www.imdb.com/title/${watch.imdb}`} target="_blank" rel="noreferrer noopener">
              🎞️
            </LinkEmoji>
          {/if}
          {#if watch.website}
            <LinkEmoji href={watch.website} target="_blank" rel="noreferrer noopener">🌍</LinkEmoji>
          {/if}
        </div>
        <div class="cover">
          <img src={watch.image} alt="" />
        </div>
        {#if watch.runtime || watch.stream}
          <div class="details">
            {#if watch.runtime}
              <div class="runtime">{isShortRuntime(watch.runtime) ? '⏱️' : ''}</div>
            {/if}
            {#if watch.stream}
              <img class="stream" src={streams[watch.stream]} alt="" />
            {/if}
          </div>
        {/if}
      </div>
      <div class="tvshows">
        {#each Object.values(groups) as group}
          <div class="group">
            {#each Object.values(group) as tvshow}
              <a class="tvshow" href={`/tvshows-details.html?id=${tvshow.id}`}>
                <div class="title">{tvshow.title}</div>
                {#if tvshow.runtime}
                  <div class="runtime">{isShortRuntime(tvshow.runtime) ? '⏱️' : ''}</div>
                {/if}
                {#if tvshow.stream}
                  <img class="stream" src={streams[tvshow.stream]} alt="" />
                {/if}
              </a>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </Main>
{/if}

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .tvshows {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 36px;
    .group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .tvshow {
        display: flex;
        flex-direction: row;
        gap: 8px;
        &:hover {
          color: var(--color-light);
          text-decoration: none;
        }
        .title {
          white-space: nowrap;
          font-size: 18px;
        }
        .runtime {
          font-size: 20px;
        }
        .stream {
          transform: translateY(2px);
        }
      }
    }
  }
  .watch {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    .title {
      font-size: 36px;
      line-height: 48px;
      text-align: center;
      font-weight: 600;
      margin-bottom: 12px;
      &:hover {
        color: var(--color-light);
        text-decoration: none;
      }
    }
    .links {
      display: flex;
      flex-direction: row;
      gap: 24px;
      :global {
        .LinkEmoji {
          font-size: 42px;
        }
      }
    }
    .details {
      display: flex;
      flex-direction: row;
      gap: 24px;
      align-items: center;
      .runtime {
        font-size: 36px;
      }
      .stream {
        width: 42px;
        height: 42px;
        transform: translateY(4px);
      }
    }
  }
  :global {
    body.mobile {
      .grid {
        grid-template-columns: 1fr;
        row-gap: 36px;
      }
    }
  }
</style>

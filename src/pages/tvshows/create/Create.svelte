<script lang="ts">
  import Button from '@components/actions/Button.svelte'
  import Link from '@components/actions/Link.svelte'
  import Card from '@components/containers/Card.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import { createTVShow, getTVMaze, searchTVMaze } from '@pages/tvshows/api'
  import { mergeEpisodes } from '@pages/tvshows/services/episodes'
  import type {
    TVMazeSearchResult,
    TVMazeTVShow,
    TVShowCreate,
    TVShowRecord,
    TVShowRecordEpisode,
    TVShowStatus,
  } from '@pages/tvshows/types'
  import dayjs from 'dayjs'
  import { onMount } from 'svelte'

  type Props = {
    title: string
  }
  const { title }: Props = $props()

  let found = $state<TVShowCreate[]>()

  const statusEmoji: Record<TVShowStatus, string> = {
    'In Development': '🚧',
    Running: '🎬',
    'To Be Determined': '🎱',
    Ended: '💀',
    Unknown: '❓',
  }

  const onCreate = async (e: Event, found: TVShowCreate) => {
    e.preventDefault()
    const json = await getTVMaze(found.id)
    if (!json) return
    const tvmaze = JSON.parse(json) as TVMazeTVShow
    const now = dayjs()
    const episodes = mergeEpisodes([], tvmaze._embedded?.episodes ?? []).map((ep: TVShowRecordEpisode) => ({
      ...ep,
      fetched: Boolean(ep.airing) && Boolean(now.isAfter(ep.airing)),
    }))
    const record: TVShowRecord = {
      id: 0,
      title: tvmaze.name,
      status: tvmaze.status as TVShowStatus,
      tvmaze: tvmaze.id,
      imdb: tvmaze.externals?.imdb ?? null,
      website: tvmaze.officialSite ?? null,
      premiered: tvmaze.premiered ? dayjs(tvmaze.premiered).toDate() : null,
      updated: now.toDate(),
      episodes: episodes,
      watching: 0,
      image: tvmaze.image?.medium ?? null,
      stream: null,
      runtime: tvmaze.averageRuntime ?? null,
    }
    const res = await createTVShow(record)
    if (res) {
      window.location.href = `/tvshows-details.html?id=${res.id}`
    }
  }

  onMount(async () => {
    const data = await searchTVMaze(title)
    if (!data) return
    found = JSON.parse(data).map((t: TVMazeSearchResult) => {
      const tvshow: TVShowCreate = {
        id: t.show.id,
        title: t.show.name,
        text: t.show.summary ?? '',
        url: t.show.url,
        image: t.show.image?.medium ?? null,
        year: t.show.premiered ? dayjs(t.show.premiered).format('YYYY') : '',
        status: t.show.status,
        runtime: t.show.averageRuntime ?? null,
      }
      return tvshow
    })
  })
</script>

{#if found}
  <Header>
    {#snippet start()}
      <Link href="/tvshows.html">TVShows</Link>
      <div>Searched for "{title}"</div>
    {/snippet}
  </Header>
  <Main>
    <div class="results">
      {#each found as f}
        <Card title={`${statusEmoji[f.status as TVShowStatus]} ${f.title} (${f.year})`} href={f.url} target="_blank">
          <div class="content">
            <div class="image">
              <img src={f.image} alt="" />
            </div>
            <div class="text">
              {@html f.text}
            </div>
            <div class="actions">
              <Button onclick={(e) => onCreate(e, f)}>Add</Button>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </Main>
{/if}

<style>
  .results {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    :global(.Card) {
      max-width: 250px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    max-width: 210px;
    justify-items: center;
    align-items: center;
    margin: 0 auto;
  }
  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210px;
    height: 295px;
    background-color: var(--color-base);
  }
  .text {
    height: calc(var(--line-height) * 8 + 4px);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    :global(.Button) {
      width: 100%;
    }
  }
</style>

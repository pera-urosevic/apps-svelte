<script lang="ts">
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import LinkButton from '@components/actions/LinkButton.svelte'
  import Actions from '@pages/tvshows/details/Actions.svelte'
  import netflix from '@pages/tvshows/icons/netflix.svg?url'
  import apple from '@pages/tvshows/icons/apple.svg?url'
  import type { EpisodeDetails, TVShowDetails, TVShowRecord } from '@pages/tvshows/types'
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import ButtonText from '@components/actions/ButtonText.svelte'
  import sites from '~external/tvshows/sites'
  import Link from '@components/actions/Link.svelte'
  import { getTVShow, removeTVShow, updateTVShow } from '@pages/tvshows/api'
  import { onMount } from 'svelte'
  import { parseTVShowDetails } from '@pages/tvshows/parse/parseTVShowDetails'

  const streamIcon: Record<string, string> = { netflix, apple }

  type Props = {
    id: number
  }
  const props: Props = $props()

  let record = $state<TVShowRecord>()
  let tvshow = $derived<TVShowDetails | undefined>(record ? parseTVShowDetails($state.snapshot(record)) : undefined)
  let selectedEpisode = $state<EpisodeDetails | undefined>()

  const onToggleEpisode = (episode: EpisodeDetails) => {
    if (!tvshow) return
    if (selectedEpisode?.id === episode.id) {
      selectedEpisode = undefined
    } else {
      selectedEpisode = episode
    }
  }

  const episodeFetchedEmoji = (episode: EpisodeDetails) => {
    if (!tvshow) return
    if (episode.fetched) return '✔️'
    if (episode.aired) {
      if (tvshow.stream) return '☑️'
      return '🔽'
    }
    return '⌚'
  }

  const onToggleFetched = async (episode: EpisodeDetails) => {
    if (!record) return
    const recordNew = $state.snapshot(record)
    recordNew.episodes = recordNew.episodes.map((e) => {
      if (e.number === episode.number && e.season === episode.season) {
        e.fetched = !e.fetched
      }
      return e
    })
    const res = await updateTVShow(recordNew)
    if (!res) return
    record = res
  }

  const onStream = async (e: Event) => {
    if (!record) return
    const target = e.target as HTMLSelectElement
    const recordNew = $state.snapshot(record)
    recordNew.stream = target.value
    const res = await updateTVShow(recordNew)
    if (!res) return
    record = res
  }

  const onWatching = async () => {
    if (!record) return
    const recordNew = $state.snapshot(record)
    recordNew.watching = recordNew.watching === 0 ? 1 : 0
    const res = await updateTVShow(recordNew)
    if (!res) return
    record = res
  }

  const onRemove = async () => {
    if (!record) return
    const confirmed = confirm('Are you sure you want to remove this show?')
    if (!confirmed) return
    const res = await removeTVShow(record.id)
    if (!res) return
    window.location.href = '/tvshows.html'
  }

  onMount(async () => {
    const data = await getTVShow(props.id)
    if (!data) return
    record = data
  })
</script>

{#if tvshow}
  <Header>
    {#snippet start()}
      <Link href="/tvshows.html">TV Shows</Link>
      <Actions tvshow={tvshow!} {onWatching} {onStream} {onRemove} />
    {/snippet}
  </Header>
  <Main>
    <div class="tvshow">
      <div class="cover">
        {#if tvshow.image}
          <img src={tvshow.image} alt="" />
        {/if}
        {#if tvshow.watching}
          <div class="watching">🍿</div>
        {/if}
        {#if tvshow.stream}
          <img class="stream" src={streamIcon[tvshow.stream]} alt="" />
        {/if}
      </div>
      <div class="episodes">
        {#each tvshow.episodes as episode}
          <div class="date" title={episode.local}>{episode.date}</div>
          <div class="fetched">
            <ButtonEmoji onclick={() => onToggleFetched(episode)}>{episodeFetchedEmoji(episode)}</ButtonEmoji>
          </div>
          <div class="name">
            {#if tvshow.stream}
              <span>
                <span class="optional">{tvshow.title} - </span>
                {episode.id} <span class="optional"> - {episode.title}</span>
              </span>
            {:else}
              <ButtonText onclick={() => onToggleEpisode(episode)}>
                <span class="optional">{tvshow.title} - </span>
                {episode.id} <span class="optional"> - {episode.title}</span>
              </ButtonText>
              {#if selectedEpisode?.id === episode.id}
                <div class="links">
                  {#each sites as site}
                    <LinkButton href={site.link(tvshow.title, episode.season, episode.number)} target="_blank">
                      {site.name}
                    </LinkButton>
                  {/each}
                </div>
              {/if}
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </Main>
{/if}

<style>
  .episodes {
    display: grid;
    grid-template-columns: auto auto 1fr;
    align-items: baseline;
    justify-items: start;
    gap: 16px;
    row-gap: 12px;
  }
  .date {
    white-space: nowrap;
  }
  .name {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 8px;
    white-space: nowrap;
  }
  .links {
    border-top: 2px solid var(--color-primary);
    padding-top: 8px;
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
  .cover {
    position: fixed;
    top: 84px;
    right: 32px;
    background-color: var(--color-base-alt);
    width: 182px;
    height: 256px;
    z-index: -1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .watching {
      position: absolute;
      top: 10px;
      left: 6px;
      font-size: 26px;
      text-shadow: 0 0 2px #000;
    }
    .stream {
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 32px;
      height: 32px;
      text-shadow: 0 0 2px #000;
    }
  }
  :global {
    body.mobile {
      .Main .cover {
        position: relative;
        top: 0;
        right: 0;
        left: 0;
        margin-bottom: 16px;
      }
      .Main .episodes .optional {
        display: none;
      }
    }
  }
</style>

<script lang="ts">
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import Category from '@pages/tvshows/dashboard/Category.svelte'
  import LinkEmoji from '@components/actions/LinkEmoji.svelte'
  import AddNew from '@pages/tvshows/dashboard/AddNew.svelte'
  import { tvShowCategories } from '@pages/tvshows/categories'
  import Link from '@components/actions/Link.svelte'
  import { onMount } from 'svelte'
  import { getTVShows } from '@pages/tvshows/api'
  import { parseTVShowsCategories } from '@pages/tvshows/parse/parseTVShowCategories'
  import type { TVShowCategories } from '@pages/tvshows/types'
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'

  let overview = $state<TVShowCategories>()
  const categoriesAvailable = $derived(overview ? tvShowCategories.filter((category) => overview![category.name]) : [])

  const onRefreshAll = async () => {
    if (!overview) return
    const ids = (overview.Stale ?? []).map((tvshow) => tvshow.id)
    if (ids.length < 1) return
    const refresh = JSON.stringify(ids)
    const back = '/tvshows.html'
    window.location.href = `/tvshows-refresh.html?refresh=${refresh}&back=${back}`
  }

  onMount(async () => {
    const data = await getTVShows()
    if (!data) return
    overview = parseTVShowsCategories(data)
  })
</script>

{#if overview}
  <Header>
    {#snippet start()}
      <Link href="/tvshows.html">TV Shows</Link>
      {#if overview?.Stale}
        <ButtonEmoji onclick={onRefreshAll}>🔄️</ButtonEmoji>
      {/if}
    {/snippet}
    {#snippet end()}
      <LinkEmoji href="/tvshows-watch.html">🍿</LinkEmoji>
      <AddNew />
    {/snippet}
  </Header>
  <Main>
    <div class="grid">
      {#each categoriesAvailable as category}
        <Category categoryName={category.name} categoryEmoji={category.emoji} tvShows={overview[category.name]} />
      {/each}
    </div>
  </Main>
{/if}

<style>
  .grid {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
  :global(body.mobile) {
    .grid {
      display: flex;
      flex-direction: column;
    }
  }
</style>

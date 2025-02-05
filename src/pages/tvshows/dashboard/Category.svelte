<script lang="ts">
  import LinkTVShow from '@pages/tvshows/dashboard/TVShowLink.svelte'
  import type { CategoryTVShow } from '@pages/tvshows/types'

  type Props = {
    categoryName: string
    categoryEmoji: string
    tvShows: CategoryTVShow[]
  }
  const { categoryName, categoryEmoji, tvShows }: Props = $props()
</script>

<div class="category">
  <div class="title">{categoryEmoji} {categoryName} <span class="count">({tvShows.length})</span></div>
  {#each tvShows as tvShow}
    <LinkTVShow {categoryName} {tvShow} />
  {/each}
</div>

<style>
  .category {
    flex-grow: 1;
    flex-basis: 0;
    min-width: 0;
  }
  .title {
    display: flex;
    gap: 4px;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--color-primary-dark);
    margin-bottom: 4px;
  }
  .count {
    font-size: 14px;
    opacity: 0.3;
    font-weight: 400;
  }
</style>

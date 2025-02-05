<script lang="ts">
  import Main from '@components/layouts/Main.svelte'
  import Header from '@components/layouts/Header.svelte'
  import LinkButton from '@components/actions/LinkButton.svelte'
  import Link from '@components/actions/Link.svelte'
  import { collectionURL, dbTitle } from '@pages/database/helpers'
  import { onMount } from 'svelte'
  import { getIndex } from '@pages/database/api'
  import type { Facet } from '@pages/database/types'

  type CollectionItem = {
    name: string
    facets: Facet[]
  }

  type DatabaseMenu = Record<string, CollectionItem[]>

  let menu = $state<DatabaseMenu>()

  onMount(async () => {
    const data = await getIndex()
    if (!data) return
    const temp: DatabaseMenu = {}
    for (const row of data) {
      if (!(row.database in temp)) temp[row.database] = []
      temp[row.database].push({
        name: row.collection,
        facets: JSON.parse(row.facets) as Facet[],
      })
    }
    menu = temp
  })
</script>

{#if menu}
  <Header>
    {#snippet start()}
      <Link href="/database-index.html">Database</Link>
    {/snippet}
  </Header>
  <Main>
    <div class="databases">
      {#each Object.entries(menu) as [database, collections]}
        <div class="database" title={database}>{dbTitle(database)}</div>
        <div class="collections">
          {#each collections as collection}
            <LinkButton href={collectionURL(database, collection.name, collection.facets[0])}>
              {dbTitle(collection.name)}
            </LinkButton>
          {/each}
        </div>
      {/each}
    </div>
  </Main>
{/if}

<style>
  .databases {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 8px;
  }
  .database {
    font-weight: 500;
    font-size: 20px;
  }
  .collections {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    gap: 12px;
    margin-bottom: 8px;
    :global {
      .LinkButton {
        font-size: 18px;
        padding: 4px 24px;
        font-weight: 500;
      }
    }
  }
</style>

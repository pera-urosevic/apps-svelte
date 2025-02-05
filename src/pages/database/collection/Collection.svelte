<script lang="ts">
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import Link from '@components/actions/Link.svelte'
  import Spinner from '@components/feedbacks/Spinner.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Intersect from '@components/layouts/Intersect.svelte'
  import Main from '@components/layouts/Main.svelte'
  import { createDoc, getDocs, getDocsCount, getFacets } from '@pages/database/api'
  import FacetsManager from '@pages/database/collection/FacetsManager.svelte'
  import { databaseList, databaseModel, databaseSearch, type DatabaseName } from '@pages/database/databases/databases'
  import { collectionURL, dbTitle, docURL } from '@pages/database/helpers'
  import type { DocModel, DocRecord, Facet } from '@pages/database/types'
  import { onMount, type Component } from 'svelte'

  type Props = {
    database: string
    collection: string
    where: string
    order: string
  }
  const { database, collection, where, order }: Props = $props()

  let records = $state<DocRecord[]>([])
  let docs = $state<DocModel[]>([])
  let facets = $state<Facet[]>([])
  let count = $state<number>(0)

  let model = $derived(databaseModel(database as DatabaseName))
  let search = $derived(databaseSearch(database as DatabaseName))

  const onAdd = async () => {
    const docNew = structuredClone(model.blankDoc)
    docNew.name = '_BLANK_'
    const recordNew = model.recordFromDoc(docNew)
    const data = await createDoc(database, collection, recordNew)
    if (!data) return
    window.location.href = docURL(database, collection, data)
  }

  const onSearch = async () => {
    const q = prompt('Search for')
    if (!q) return
    const whereNew = search(q)
    const facetNew = { name: 'search', where: whereNew, order }
    const url = collectionURL(database, collection, facetNew)
    window.location.href = url
  }

  const onIntersect = async () => {
    const offset = docs.length
    const moreRecords = await getDocs(database, collection, where, order, offset)
    if (!moreRecords) return
    records = [...records, ...moreRecords]
    const moreDocs = await Promise.all(moreRecords.map(async (r) => model.docFromRecord(r)))
    docs = [...docs, ...moreDocs]
  }

  let hasMore = $derived(count > docs.length)

  let ready = $state(false)
  let List: Component | undefined = $state()

  onMount(async () => {
    const dataDocs = await getDocs(database, collection, where, order, 0)
    if (dataDocs) {
      records = dataDocs
      docs = await Promise.all(records.map(async (r) => model.docFromRecord(r)))
    }
    const dataFacets = await getFacets(database, collection)
    if (dataFacets) {
      facets = dataFacets
    }
    const dataCount = await getDocsCount(database, collection, where)
    if (dataCount) {
      count = dataCount
    }
    List = databaseList(database as DatabaseName)
    ready = true
  })

  $effect(() => {
    if (!ready) return
    const main = document.querySelector('main')
    if (!main) return
    main.scrollTo({ top: 0, left: 0 })
  })
</script>

{#if ready}
  <Header>
    {#snippet start()}
      <Link href="/database-index.html">Database</Link>
      <Link href={collectionURL(database, collection, facets[0])}>{dbTitle(collection)}</Link>
    {/snippet}
    {#snippet center()}
      <ButtonEmoji name="search" onclick={onSearch}>🔎</ButtonEmoji>
      <FacetsManager {database} {collection} {facets} {where} {order} />
    {/snippet}
    {#snippet end()}
      <ButtonEmoji name="create" onclick={onAdd}>➕</ButtonEmoji>
    {/snippet}
  </Header>
  <Main>
    <List {database} {collection} {docs} />
    {#if hasMore}
      <Intersect on:intersect={onIntersect}>
        <Spinner />
      </Intersect>
    {/if}
    <div class="badge">{count}</div>
  </Main>
{/if}

<style>
  .badge {
    position: fixed;
    z-index: 1;
    right: 48px;
    bottom: 32px;
    border-radius: 100%;
    font-size: 14px;
    line-height: 14px;
    min-height: 20px;
    height: 20px;
    min-width: 20px;
    background-color: var(--color-base-alt);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
  }
</style>

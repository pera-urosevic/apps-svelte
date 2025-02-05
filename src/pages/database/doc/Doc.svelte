<script lang="ts">
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import { collectionURL, dbTitle, docURL } from '@pages/database/helpers'
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import Link from '@components/actions/Link.svelte'
  import { createDoc, getAutocompletes, getDoc, getFacets, removeDoc, updateDoc } from '@pages/database/api'
  import type { DocModel, DocRecord, Facet } from '@pages/database/types'
  import { onDestroy, onMount, type Component } from 'svelte'
  import { areEqualObjects } from '@services/objects'
  import { databaseEditor, databaseModel, databaseView, type DatabaseName } from '@pages/database/databases/databases'

  type Props = {
    database: string
    collection: string
    id: number
  }
  const { database, collection, id }: Props = $props()

  let record = $state<DocRecord>()
  let doc = $state<DocModel>()
  let facets = $state<Facet[]>()
  let autocompletes = $state<Record<string, string[]>>()
  let model = $derived(databaseModel(database as DatabaseName))

  const onDoc = (docNew: DocRecord) => {
    doc = docNew
  }

  const onField = (field: string, value: any) => {
    const docNew = { ...doc }
    docNew[field] = value
    onDoc(docNew)
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()
      if (e.type === 'keyup') onSave()
    }
  }

  const onWeb = async () => {
    if (!doc) return
    window.open(`https://google.com/search?q=${database} ${doc.name}`, 'web', 'noopener,noreferrer')
  }

  const onSave = async () => {
    if (!doc) return
    const docNew = $state.snapshot(doc)
    const recordNew = model.recordFromDoc(docNew)
    const data = await updateDoc(database, collection, recordNew)
    if (!data) return
    record = data
    doc = model.docFromRecord(data)
  }

  const onDelete = async () => {
    if (!doc || !facets) return
    const confirmed = confirm(`Are you sure you want to delete ${doc.name}?`)
    if (!confirmed) return
    const data = await removeDoc(database, collection, id)
    if (!data) return
    window.location.href = collectionURL(database, collection, facets[0])
  }

  const onAdd = async () => {
    const docNew = structuredClone(model.blankDoc)
    docNew.name = '_BLANK_'
    const recordNew = model.recordFromDoc(docNew)
    const data = await createDoc(database, collection, recordNew)
    if (!data) return
    window.location.href = docURL(database, collection, data)
  }

  let View: Component | undefined = $state()
  let Editor: Component | undefined = $state()

  const onNavigate = (e: Event) => {
    const oldDoc = model.docFromRecord($state.snapshot(record) as DocRecord)
    if (!areEqualObjects(doc, oldDoc)) {
      if (!confirm('There are unsaved changes, are you sure?')) {
        e.preventDefault()
      }
    }
  }

  onMount(async () => {
    const dataDoc = await getDoc(database, collection, id)
    if (dataDoc) {
      record = dataDoc
      doc = model.docFromRecord(dataDoc)
    }
    const dataFacets = await getFacets(database, collection)
    if (dataFacets) {
      facets = dataFacets
    }
    const dataAutocompletes = await getAutocompletes(database, collection, model.autocompleteFields)
    if (dataAutocompletes) {
      autocompletes = dataAutocompletes
    }
    View = databaseView(database as DatabaseName)
    Editor = databaseEditor(database as DatabaseName)
    window.addEventListener('beforeunload', onNavigate)
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)
  })

  onDestroy(() => {
    window.removeEventListener('keyup', onKey)
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('beforeunload', onNavigate)
  })
</script>

{#if doc}
  <Header>
    {#snippet start()}
      <Link href="/database-index.html">Database</Link>
      <Link href={facets ? collectionURL(database, collection, facets[0]) : ''}>{dbTitle(collection)}</Link>
      <ButtonEmoji name="web" onclick={onWeb}>🌍</ButtonEmoji>
    {/snippet}
    {#snippet center()}
      <ButtonEmoji onclick={onDelete}>🗑️</ButtonEmoji>
    {/snippet}
    {#snippet end()}
      <ButtonEmoji name="create" onclick={onAdd}>➕</ButtonEmoji>
      <ButtonEmoji name="save" onclick={onSave}>💾</ButtonEmoji>
    {/snippet}
  </Header>
  <Main>
    <div class="doc">
      <View {doc} {database} {collection} />
      {#if autocompletes}
        <Editor {doc} {database} {collection} {autocompletes} {onDoc} {onField} />
      {/if}
    </div>
  </Main>
{/if}

<style>
  .doc {
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    :global(> *) {
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0 16px 0 8px;
    }
  }
  :global {
    body.mobile {
      .doc {
        display: block;
        overflow-y: auto;
        .view {
          padding-bottom: 36px;
          border-bottom: 1px solid var(--color-primary-dark);
          margin-bottom: 36px;
        }
      }
    }
  }
</style>

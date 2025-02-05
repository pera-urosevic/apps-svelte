<script lang="ts">
  import type { DocModel } from '@pages/database/types'
  import EditDatetime from '@pages/database/editors/EditDatetime.svelte'
  import EditImage from '@pages/database/editors/EditImage.svelte'
  import EditName from '@pages/database/editors/EditName.svelte'
  import EditNumber from '@pages/database/editors/EditNumber.svelte'
  import EditSelect from '@pages/database/editors/EditSelect.svelte'
  import EditString from '@pages/database/editors/EditString.svelte'
  import EditTags from '@pages/database/editors/EditTags.svelte'
  import EditText from '@pages/database/editors/EditText.svelte'

  interface Props {
    database: string
    collection: string
    doc: DocModel
    autocompletes: Record<string, string[]>
    onField: (field: string, value: any) => void
    onDoc: (doc: DocModel) => void
  }

  let { database, collection, doc, autocompletes, onDoc, onField }: Props = $props()

  const autocompletesStatus = [
    ...new Set([
      '0 - Playing',
      '1 - Next',
      '2 - Todo',
      '3 - Sometime',
      '4 - Continue',
      '5 - Maybe',
      '6 - Discarded',
      '7 - Replay',
      '8 - Finished',
      '9 - Unreleased',
      ...autocompletes.status,
    ]),
  ]
  const autocompletesStores = autocompletes.stores
  const autocompletesPlatforms = autocompletes.platforms
  const autocompletesGenres = autocompletes.genres
</script>

<div class="editor">
  <EditName
    value={doc.name}
    onValue={(value) => onField('name', value)}
    placeholder="Name"
    {database}
    {collection}
    {doc}
    {onDoc}
  />
  <EditString value={doc.paid} onValue={(value) => onField('paid', value)} placeholder="Paid" />
  <EditTags
    value={doc.stores}
    onValue={(value) => onField('stores', value)}
    placeholder="Stores"
    autocompletes={autocompletesStores}
  />
  <EditSelect
    value={doc.status}
    onValue={(value) => onField('status', value)}
    placeholder="Status"
    autocompletes={autocompletesStatus}
  />
  <EditText value={doc.comments} onValue={(value) => onField('comments', value)} placeholder="Comments" />
  <EditImage value={doc.image} onValue={(value) => onField('image', value)} placeholder="Image" />
  <EditString value={doc.year} onValue={(value) => onField('year', value)} placeholder="Year" />
  <EditTags
    value={doc.platforms}
    onValue={(value) => onField('platforms', value)}
    placeholder="Platforms"
    autocompletes={autocompletesPlatforms}
  />
  <EditTags
    value={doc.genres}
    onValue={(value) => onField('genres', value)}
    placeholder="Genres"
    autocompletes={autocompletesGenres}
  />
  <EditString value={doc.website} onValue={(value) => onField('website', value)} placeholder="Website" />
  <EditNumber value={doc.rating} onValue={(value) => onField('rating', value)} placeholder="Rating" />
  <EditText value={doc.description} onValue={(value) => onField('description', value)} placeholder="Descriptions" />
  <EditString value={doc.importer} onValue={(value) => onField('importer', value)} placeholder="Importer" />
  <EditDatetime value={doc.createdAt} onValue={(value) => onField('createdAt', value)} placeholder="Date" />
</div>

<style>
  .editor {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }
</style>

<script lang="ts">
  import type { DocModel } from '@pages/database/types'
  import EditImage from '@pages/database/editors/EditImage.svelte'
  import EditName from '@pages/database/editors/EditName.svelte'
  import EditSelect from '@pages/database/editors/EditSelect.svelte'
  import EditString from '@pages/database/editors/EditString.svelte'

  interface Props {
    database: string
    collection: string
    doc: DocModel
    onField: (field: string, value: any) => void
    onDoc: (doc: DocModel) => void
    autocompletes: Record<string, string[]>
  }

  const { database, collection, doc, autocompletes, onField, onDoc }: Props = $props()

  const autocompletesTag = autocompletes.tag
  const autocompletesLocation = autocompletes.location
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
  <EditString value={doc.date} onValue={(value) => onField('date', value)} placeholder="Date" />
  <EditSelect
    value={doc.tag}
    onValue={(value) => onField('tag', value)}
    placeholder="Tag"
    autocompletes={autocompletesTag}
  />
  <EditSelect
    value={doc.location}
    onValue={(value) => onField('location', value)}
    placeholder="Location"
    autocompletes={autocompletesLocation}
  />
  <EditImage value={doc.image} onValue={(value) => onField('image', value)} placeholder="Image" />
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 12px;
  }
</style>

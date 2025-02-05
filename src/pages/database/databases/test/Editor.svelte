<script lang="ts">
  import type { DocModel } from '@pages/database/types'
  import EditBoolean from '@pages/database/editors/EditBoolean.svelte'
  import EditDate from '@pages/database/editors/EditDate.svelte'
  import EditDatetime from '@pages/database/editors/EditDatetime.svelte'
  import EditImage from '@pages/database/editors/EditImage.svelte'
  import EditList from '@pages/database/editors/EditList.svelte'
  import EditMarkdown from '@pages/database/editors/EditMarkdown.svelte'
  import EditName from '@pages/database/editors/EditName.svelte'
  import EditSelect from '@pages/database/editors/EditSelect.svelte'
  import EditString from '@pages/database/editors/EditString.svelte'
  import EditTags from '@pages/database/editors/EditTags.svelte'
  import EditText from '@pages/database/editors/EditText.svelte'
  import EditNumber from '@pages/database/editors/EditNumber.svelte'

  interface Props {
    database: string
    collection: string
    doc: DocModel
    autocompletes: Record<string, string[]>
    onField: (field: string, value: any) => void
    onDoc: (doc: DocModel) => void
  }

  let { database, collection, doc, autocompletes, onDoc, onField }: Props = $props()

  const autocompletesSelect = [...new Set(['1 - One', '2 - Two', '3 - Three', ...autocompletes.select])]
  const autocompletesTags = [...new Set(['Tag 1', 'Tag 2', 'Tag 3', ...autocompletes.tags])]
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
  <EditString value={doc.string} onValue={(value) => onField('string', value)} placeholder="String" />
  <EditNumber value={doc.number} onValue={(value) => onField('number', value)} placeholder="Number" />
  <EditText value={doc.text} onValue={(value) => onField('text', value)} placeholder="Text" />
  <EditMarkdown value={doc.markdown} onValue={(value) => onField('markdown', value)} placeholder="Markdown" />
  <EditBoolean checked={doc.boolean} onValue={(value) => onField('boolean', value)} placeholder="Boolean" />
  <EditDate value={doc.date} onValue={(value) => onField('date', value)} placeholder="Date" />
  <EditDatetime value={doc.datetime} onValue={(value) => onField('datetime', value)} placeholder="Datetime" />
  <EditList value={doc.list} onValue={(value) => onField('list', value)} placeholder="List" />
  <EditSelect
    value={doc.select}
    onValue={(value) => onField('select', value)}
    placeholder="Select"
    autocompletes={autocompletesSelect}
  />
  <EditTags
    value={doc.tags}
    onValue={(value) => onField('tags', value)}
    placeholder="Tags"
    autocompletes={autocompletesTags}
  />
  <EditImage value={doc.image} onValue={(value) => onField('image', value)} placeholder="Image" />
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>

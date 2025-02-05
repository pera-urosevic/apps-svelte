<script lang="ts">
  import type { DocModel } from '@pages/database/types'
  import EditMarkdown from '@pages/database/editors/EditMarkdown.svelte'
  import EditName from '@pages/database/editors/EditName.svelte'

  interface Props {
    database: string
    collection: string
    doc: DocModel
    onField: (field: string, value: any) => void
    onDoc: (doc: DocModel) => void
  }

  let { database, collection, doc, onField, onDoc }: Props = $props()
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
  <EditMarkdown value={doc.content} onValue={(value) => onField('content', value)} placeholder="Content" />
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>

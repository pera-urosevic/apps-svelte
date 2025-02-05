<script lang="ts">
  import type { DocModel } from '@pages/database/types'
  import EditImage from '@pages/database/editors/EditImage.svelte'
  import EditList from '@pages/database/editors/EditList.svelte'
  import EditName from '@pages/database/editors/EditName.svelte'

  interface Props {
    database: string
    collection: string
    doc: DocModel
    onField: (field: string, value: any) => void
    onDoc: (doc: DocModel) => void
  }

  const { database, collection, doc, onField, onDoc }: Props = $props()
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
  <EditImage value={doc.image} onValue={(value) => onField('image', value)} placeholder="Image" />
  <EditList value={doc.components} onValue={(value) => onField('components', value)} placeholder="Ingredients" />
  <EditList value={doc.steps} onValue={(value) => onField('steps', value)} placeholder="Steps" />
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 12px;
    :global {
      textarea {
        min-height: 320px;
      }
    }
  }
</style>

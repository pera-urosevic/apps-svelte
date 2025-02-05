<script lang="ts">
  import type { DocModel } from '@pages/database/types'
  import EditBoolean from '@pages/database/editors/EditBoolean.svelte'
  import EditImage from '@pages/database/editors/EditImage.svelte'
  import EditName from '@pages/database/editors/EditName.svelte'
  import EditNumber from '@pages/database/editors/EditNumber.svelte'
  import EditSelect from '@pages/database/editors/EditSelect.svelte'
  import EditString from '@pages/database/editors/EditString.svelte'
  import EditText from '@pages/database/editors/EditText.svelte'

  interface Props {
    database: string
    collection: string
    doc: DocModel
    autocompletes: Record<string, string[]>
    onField: (field: string, value: any) => void
    onDoc: (doc: DocModel) => void
  }

  let { database, collection, doc, onField, onDoc, autocompletes }: Props = $props()

  const autocompletesCountry = autocompletes.country
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
  <EditNumber value={doc.duplicates} onValue={(value) => onField('duplicates', value)} placeholder="Duplicates" />
  <EditBoolean checked={doc.discard} onValue={(value) => onField('discard', value)} placeholder="Discard" />
  <EditString value={doc.colnect} onValue={(value) => onField('colnect', value)} placeholder="Colnect" />
  <EditImage value={doc.image} onValue={(value) => onField('image', value)} placeholder="Image" />
  <EditString value={doc.series} onValue={(value) => onField('series', value)} placeholder="Series" />
  <EditSelect
    value={doc.country}
    onValue={(value) => onField('country', value)}
    placeholder="Country"
    autocompletes={autocompletesCountry}
  />
  <EditString value={doc.themes} onValue={(value) => onField('themes', value)} placeholder="Themes" />
  <EditString value={doc.issued} onValue={(value) => onField('issued', value)} placeholder="Issued" />
  <EditString value={doc.expiry} onValue={(value) => onField('expiry', value)} placeholder="Expiry" />
  <EditString value={doc.size} onValue={(value) => onField('size', value)} placeholder="Size" />
  <EditString value={doc.colors} onValue={(value) => onField('colors', value)} placeholder="Colors" />
  <EditString value={doc.designers} onValue={(value) => onField('designers', value)} placeholder="Designers" />
  <EditString value={doc.printers} onValue={(value) => onField('printers', value)} placeholder="Printers" />
  <EditString value={doc.format} onValue={(value) => onField('format', value)} placeholder="Format" />
  <EditString value={doc.emission} onValue={(value) => onField('emission', value)} placeholder="Emission" />
  <EditString value={doc.perforation} onValue={(value) => onField('perforation', value)} placeholder="Perforation" />
  <EditString value={doc.printing} onValue={(value) => onField('printing', value)} placeholder="Printing" />
  <EditString value={doc.value} onValue={(value) => onField('value', value)} placeholder="Value" />
  <EditNumber value={doc.printed} onValue={(value) => onField('printed', value)} placeholder="Printed" />
  <EditText value={doc.codes} onValue={(value) => onField('codes', value)} placeholder="Codes" />
  <EditText value={doc.description} onValue={(value) => onField('description', value)} placeholder="Description" />
  <EditString value={doc.importer} onValue={(value) => onField('importer', value)} placeholder="Importer" />
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 12px;
  }
</style>

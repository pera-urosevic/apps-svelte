<script lang="ts">
  import { collectionURL, escapeQuotes } from '@pages/database/helpers'
  import type { DocModel } from '@pages/database/types'

  interface Props {
    doc: DocModel
    database: string
    collection: string
  }

  let { doc, database, collection }: Props = $props()

  const onList = (where: string, order: string) => {
    const facet = { name: 'facet', where, order }
    const url = collectionURL(database, collection, facet)
    return url
  }
</script>

<div class="view">
  <div class="title">{doc.name}</div>
  <div><img src={doc.image} alt="" /></div>
  {#if doc.duplicates}
    <p>Duplicates: {doc.duplicates}</p>
  {/if}
  {#if doc.discard}
    <p class="error">Discard</p>
  {/if}
  {#if doc.series}
    <p>
      Series: <a
        class="link"
        href={onList(`series='${escapeQuotes(doc.series)}' AND country='${escapeQuotes(doc.country)}'`, 'value DESC')}
        >{doc.series}</a
      >
    </p>{/if}
  {#if doc.country}
    <p>
      Country: <a class="link" href={onList(`country='${escapeQuotes(doc.country)}'`, 'issued ASC')}>{doc.country}</a>
    </p>
  {/if}
  {#if doc.issued}
    <p>Issued: {doc.issued}</p>
  {/if}
  {#if doc.expiry}
    <p>Expiry: {doc.expiry}</p>
  {/if}
  {#if doc.themes}
    <p class="list">
      Themes:
      {#each doc.themes.split(' | ') as theme}
        <a class="link" href={onList(`themes like '%${escapeQuotes(theme)}%'`, 'issued ASC')}>{theme}</a>
      {/each}
    </p>
  {/if}
  {#if doc.colors}
    <p class="list">
      Colors:
      {#each doc.colors.split(' | ') as color}
        <a class="link" href={onList(`colors like '%${escapeQuotes(color)}%'`, 'issued ASC')}>{color}</a>
      {/each}
    </p>
  {/if}
  {#if doc.size}
    <p>Size: {doc.size}</p>
  {/if}
  {#if doc.colnect}
    <p>
      Colnect:
      <a class="link" href="https://colnect.com/en/stamps/stamp/{doc.colnect}" rel="noopener noreferrer">
        https://colnect.com/en/stamps/stamp/{doc.colnect}
      </a>
    </p>
  {/if}
  {#if doc.designers}
    <p>Designers: {doc.designers}</p>
  {/if}
  {#if doc.printers}
    <p>Printers: {doc.printers}</p>
  {/if}
  {#if doc.format}
    <p>Format: {doc.format}</p>
  {/if}
  {#if doc.emission}
    <p class:text-warning={doc.emission === 'Agency Issue'} class:text-error={doc.emission === 'Illegal'}>
      Emission: {doc.emission}
    </p>
  {/if}
  {#if doc.perforation}
    <p>Perforation: {doc.perforation}</p>
  {/if}
  {#if doc.printing}
    <p>Printing: {doc.printing}</p>
  {/if}
  {#if doc.value}
    <p>Value: {doc.value}</p>
  {/if}
  {#if doc.printed && doc.printed > 0}
    <p>Printed: {doc.printed}</p>
  {/if}
  {#if doc.codes}
    <p>Codes: {doc.codes.replaceAll('\n', ', ')}</p>
  {/if}
  {#if doc.description}
    <p>Description: {doc.description}</p>
  {/if}
  {#if doc.importer}
    <p>Importer: {doc.importer}</p>
  {/if}
</div>

<style>
  .view {
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 24px;
    margin-bottom: 8px;
  }
  img {
    outline: 2px solid #000;
    outline-offset: -2px;
  }
  .error {
    color: var(--color-error);
    font-weight: 600;
  }
  .link {
    text-decoration: underline;
    text-decoration-color: var(--color-primary-dark);
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
  }
  .list {
    display: inline-flex;
    flex-direction: row;
    gap: 8px;
  }
</style>

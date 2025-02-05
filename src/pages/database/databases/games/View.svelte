<script lang="ts">
  import { collectionURL, escapeQuotes } from '@pages/database/helpers'
  import type { DocModel } from '@pages/database/types'
  import dayjs from 'dayjs'

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

  <p>
    Status: <a class="link" href={onList(`status='${escapeQuotes(doc.status)}'`, 'createdAt DESC')}>{doc.status}</a>
  </p>

  <p>
    Year:
    <a class="link" href={onList(`year='${escapeQuotes(doc.year)}'`, 'createdAt DESC')}>{doc.year}</a>
  </p>

  <p>
    Genres:
    <span class="genres">
      {#each doc.genres as genre}
        <a class="link" href={onList(`genres like '%${escapeQuotes(genre)}%'`, 'createdAt DESC')}>{genre}</a>
      {/each}
    </span>
  </p>

  <p>Description: {@html doc.description}</p>

  <p>Website: <a class="link" href={doc.website} target="_blank">{doc.website}</a></p>

  {#if doc.rating > -1}
    <p>Rating: {doc.rating}</p>
  {/if}

  {#if doc.platforms.length > 0}
    <p>Platforms: {doc.platforms}</p>
  {/if}

  {#if doc.stores.length > 0}
    <p>Stores: {doc.stores}</p>
  {/if}
  {#if doc.paid != '0'}
    <p>Paid: {doc.paid}</p>
  {:else}
    <p>Free</p>
  {/if}

  {#if doc.comments}
    <p>Comments: {doc.comments}</p>
  {/if}

  <p>Importer: {doc.importer}</p>
  <p>Date: {dayjs(doc.createdAt).format('YYYY-MM-DD')}</p>
</div>

<style>
  .view {
    display: flex;
    flex-direction: column;
  }
  img {
    max-width: 100%;
  }
  .title {
    font-size: 24px;
    margin-bottom: 8px;
  }
  .link {
    text-decoration: underline;
    text-decoration-color: var(--color-primary-dark);
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
  }
  .genres {
    display: inline-flex;
    flex-direction: row;
    gap: 8px;
  }
</style>

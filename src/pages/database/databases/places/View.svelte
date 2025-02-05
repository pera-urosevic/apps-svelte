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
  <p>{doc.date}</p>
  <p>
    <a class="link" href={onList(`tag='${escapeQuotes(doc.tag)}'`, 'createdAt DESC')}>{doc.tag}</a>,
    <a class="link" href={onList(`location='${escapeQuotes(doc.location)}'`, 'createdAt DESC')}>{doc.location}</a>
  </p>
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
</style>

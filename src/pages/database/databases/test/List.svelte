<script lang="ts">
  import type { DocModel } from '@pages/database/types'
  import { docURL } from '@pages/database/helpers'

  interface Props {
    database: string
    collection: string
    docs: DocModel[]
  }

  let { database, collection, docs }: Props = $props()
</script>

<div class="list">
  {#each docs as doc}
    <a class="card" href={docURL(database, collection, doc.id)}>
      <div class="image">
        <img src={doc.image} alt="" />
      </div>
      <div class="title" title={doc.name}>
        {doc.name}
      </div>
    </a>
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .card {
    text-align: center;
    border: 1px solid #000;
    border-radius: 6px;
    background-color: var(--color-base-alt);
    &:hover {
      text-decoration: none;
      border: 1px solid var(--color-primary-dark);
    }
  }
  .image {
    width: 140px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    overflow: hidden;
    img {
      object-fit: contain;
      max-height: 100%;
      max-width: 100%;
    }
  }
  .title {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    color: var(--color-primary-lighter);
    padding: 16px;
    font-size: 14px;
    line-height: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>

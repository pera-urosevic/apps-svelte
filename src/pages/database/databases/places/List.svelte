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
      <img class="image" src={doc.image} alt="" title={doc.date} />
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
    justify-content: center;
    gap: 12px;
  }
  .card {
    position: relative;
    width: 256px;
    height: 192px;
    border-radius: 6px;
    overflow: hidden;
    text-decoration: none;
    .image {
      border-radius: 7px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 4px 6px;
      height: 20px;
      line-height: 20px;
      background-color: rgba(0, 0, 0, 0.9);
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      color: #fff;
      text-align: center;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>

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
      <img class="image" src={doc.image} alt="" />
      <div class="footer" title={doc.name}>
        <div class="title">
          {doc.name}
        </div>
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
    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .title {
      position: relative;
      bottom: 0;
      display: inline-block;
      color: #fff;
      padding: 3px 8px;
      height: 18px;
      line-height: 18px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      background-color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>

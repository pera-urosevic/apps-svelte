<script lang="ts">
  import type { DocModel } from '@pages/database/types'
  import { docURL } from '@pages/database/helpers'
  import dayjs from 'dayjs'

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
      <div class="title">{doc.name}</div>
      <div class="details">
        <div>{doc.name} ({doc.year})</div>
        <div>{doc.genres.join(', ')}</div>
        <div>Status: {doc.status}</div>
        {#if doc.rating && doc.rating != '0'}<div>Rating: {doc.rating}</div>{/if}
        <div>{dayjs(doc.createdAt).format('YYYY-MM-DD')}</div>
      </div>
    </a>
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
  .card {
    position: relative;
    width: 144px;
    height: 192px;
    border-radius: 6px;
    overflow: hidden;
    text-decoration: none;
    .image {
      border-radius: 7px;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 4px 6px;
      height: 20px;
      line-height: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-shadow:
        0 0 2px #000,
        0 0 2px #000,
        0 0 2px #000;
    }
    .details {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 4px 6px;
      line-height: 16px;
      background-color: rgba(0, 0, 0, 0.95);
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      overflow: hidden;
      word-break: keep-all;
    }
    &:hover {
      .title {
        display: none;
      }
      .details {
        display: flex;
      }
    }
  }
</style>

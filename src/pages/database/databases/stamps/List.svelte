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

  let tooltip: number | null = $state(null)
</script>

<div class="list">
  {#each docs as doc}
    <a class="card" class:border-error={doc.discard} href={docURL(database, collection, doc.id)}>
      <div class="image">
        <img src={doc.image} alt="" />
      </div>
      <div class="footer" title={doc.name}>
        <div class="title">{doc.name}</div>
      </div>
      <div class="details">
        <div>{doc.name}</div>
        {#if doc.country}<div>{doc.country}</div>{/if}
        {#if doc.issued}<div>({doc.issued})</div>{/if}
        {#if doc.duplicates}<div>[{doc.duplicates}]</div>{/if}
        {#if doc.series}<div>{doc.series}</div>{/if}
        {#if doc.themes}<div>{doc.themes}</div>{/if}
        {#if doc.description}<div>{doc.description}</div>{/if}
        {#if doc.value}<div>{doc.value}</div>{/if}
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
    background-color: #000;
    position: relative;
    width: 180px;
    height: 300px;
    border-radius: 6px;
    overflow: hidden;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    border: 1px solid transparent;
    &.border-error {
      border-color: var(--color-error);
    }
    .image {
      height: 280px;
      overflow: hidden;
      img {
        border-radius: 7px;
        width: 100%;
        height: auto;
        object-fit: contain;
        outline: 2px solid #000;
        outline-offset: -2px;
      }
    }
    .footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 6px;
    }
    .title {
      width: 100%;
      height: 20px;
      line-height: 20px;
      background-color: rgba(0, 0, 0, 0.9);
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
      .details {
        display: flex;
      }
    }
  }
</style>

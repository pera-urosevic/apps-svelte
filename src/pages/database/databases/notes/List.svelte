<script lang="ts">
  import LinkButton from '@components/actions/LinkButton.svelte'
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
    <LinkButton href={docURL(database, collection, doc.id)} title={doc.name}>
      {doc.name}
    </LinkButton>
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    :global {
      .LinkButton {
        width: 180px;
        padding: 8px 0;
      }
    }
  }
</style>

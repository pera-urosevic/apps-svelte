<script lang="ts">
  import type { DocModel } from '@pages/database/types'

  interface Props {
    doc: DocModel
  }

  let { doc }: Props = $props()
</script>

<div class="view">
  <div class="title">{doc.name}</div>
  <div><img src={doc.image} alt="" /></div>
  <div>
    <div class="subtitle">Ingredients</div>
    <ul class="list">
      {#each doc.components as component}
        <li>{component}</li>
      {/each}
    </ul>
  </div>
  {#if doc.steps.length > 0}
    <div>
      <div class="subtitle">Steps</div>
      <ol class="list">
        {#each doc.steps as step}
          <li>{step}</li>
        {/each}
      </ol>
    </div>
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
  .subtitle {
    font-size: 20px;
    margin-top: 8px;
  }
  .list {
    margin-top: 8px;
    margin-bottom: 12px;
    padding-left: 32px;
  }
</style>

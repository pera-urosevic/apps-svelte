<script lang="ts">
  import LinkEmoji from '@components/actions/LinkEmoji.svelte'
  import Card from '@components/containers/Card.svelte'
  import type { RecipeObject } from '@pages/brew/types'

  type Props = {
    recipe: RecipeObject
    onclick: () => void
  }
  const { recipe, onclick }: Props = $props()
</script>

<Card title={recipe.name} {onclick}>
  {#snippet toolbar()}
    <div class="toolbar">
      <LinkEmoji href={`/brew-edit.html?id=${recipe.id}`}>📝</LinkEmoji>
    </div>
  {/snippet}
  <div class="grid">
    <div class="label">Coffee</div>
    <div class="spacer"></div>
    <div class="value">{recipe.coffee}g</div>
    <div class="label">Water</div>
    <div class="spacer"></div>
    <div class="value">{recipe.water}g</div>
    <div class="label">Grind</div>
    <div class="spacer"></div>
    <div class="value">{recipe.grind}</div>
    <div class="label">Time</div>
    <div class="spacer"></div>
    <div class="value">{recipe.time}</div>
    {#if recipe.notes}
      <div class="notes">{recipe.notes}</div>
    {/if}
  </div>
</Card>

<style>
  .toolbar {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
  .label {
    font-weight: 600;
  }
  .value {
    text-align: right;
    white-space: nowrap;
  }
  .notes {
    margin-top: 4px;
    grid-column: 1 / -1;
    font-size: 0.9em;
  }
</style>

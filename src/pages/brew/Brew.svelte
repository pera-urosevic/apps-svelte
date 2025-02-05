<script lang="ts">
  import Link from '@components/actions/Link.svelte'
  import LinkEmoji from '@components/actions/LinkEmoji.svelte'
  import BottomPanel from '@components/containers/BottomPanel.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import { getRecipes } from '@pages/brew/api'
  import { parseRecords } from '@pages/brew/parse'
  import Recipe from '@pages/brew/Recipe.svelte'
  import Scaler from '@pages/brew/Scaler.svelte'
  import type { RecipeObject, RecipeRecord } from '@pages/brew/types'
  import { onMount } from 'svelte'

  let records = $state<RecipeRecord[]>()
  let recipes = $derived<RecipeObject[]>(parseRecords(records))
  let name = $state<string | undefined>()
  let coffee = $state<number | undefined>()
  let ratio = $state<number | undefined>()

  const onselect = (recipe: RecipeObject | undefined) => {
    if (!recipe) {
      coffee = undefined
      ratio = undefined
      name = undefined
      return
    }
    coffee = recipe.coffee
    ratio = recipe.water / recipe.coffee
    name = recipe.name
  }

  const onScale = (coffeeNew: number) => {
    coffee = coffeeNew
  }

  onMount(async () => {
    records = (await getRecipes()) ?? []
  })
</script>

<Header>
  {#snippet start()}
    <Link href="/brew.html">Brew</Link>
    <LinkEmoji href="/brew-edit.html">➕</LinkEmoji>
  {/snippet}
</Header>
<Main>
  {#if records}
    <div class="recipes">
      {#each recipes as recipe}
        <Recipe {recipe} onclick={() => onselect(recipe)} />
      {/each}
      {#if coffee && ratio && name}
        <BottomPanel show={true}>
          <Scaler {coffee} {ratio} {name} onClose={() => onselect(undefined)} {onScale} />
        </BottomPanel>
      {/if}
    </div>
  {/if}
</Main>

<style>
  .recipes {
    padding-right: 16px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
</style>

<script lang="ts">
  import type { KeyboardEventHandler } from 'svelte/elements'
  import type { Facet } from '@pages/database/types'
  import Input from '@components/forms/Input.svelte'
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import ButtonText from '@components/actions/ButtonText.svelte'
  import Button from '@components/actions/Button.svelte'
  import Menu from '@components/containers/Menu.svelte'
  import { collectionURL } from '@pages/database/helpers'
  import { updateFacets } from '@pages/database/api'

  interface Props {
    database: string
    collection: string
    facets: Facet[]
    where: string
    order: string
  }

  const props: Props = $props()

  const { database, collection } = props
  let facets = $state(props.facets)
  let where = $state(props.where)
  let order = $state(props.order)

  const onWhere = (e: Event) => {
    where = (e.target as HTMLInputElement).value
  }

  const onOrder = (e: Event) => {
    order = (e.target as HTMLInputElement).value
  }

  const onFacet: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key !== 'Enter') return
    const name = 'facet'
    const facetNew = { name, where, order }
    const url = collectionURL(database, collection, facetNew)
    window.location.href = url
  }

  const onApplyFacet = async (facet: Facet) => {
    const url = collectionURL(database, collection, facet)
    window.location.href = url
  }

  const onSaveFacet = async () => {
    const name = prompt('Enter name')
    if (!name) return
    const facetsNew = $state.snapshot(facets)
    const facetNew = { name, where, order }
    facetsNew.push(facetNew)
    const data = await updateFacets(database, collection, facetsNew)
    if (!data) return
    facets = data
  }

  const onRemoveFacet = async (facet: Facet) => {
    const confirmed = confirm(`Are you sure you want to remove facet ${facet.name}?`)
    if (!confirmed) return
    const facetsNew = $state.snapshot(facets).filter((f) => f.name !== facet.name)
    const data = await updateFacets(database, collection, facetsNew)
    if (!data) return
    facets = data
  }

  let sortedFacets = $derived.by(() => {
    const sorted = $state.snapshot(facets)
    sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  })
</script>

<div class="facets-manager">
  <Input name="where" type="text" value={where} onchange={onWhere} onkeyup={onFacet} />
  <Input name="order" type="text" value={order} onchange={onOrder} onkeyup={onFacet} />
  <Menu>
    {#snippet button(onMenu)}
      <ButtonEmoji name="facets" onclick={onMenu}>⚙️</ButtonEmoji>
    {/snippet}
    {#snippet dropdown()}
      <div class="dropdown">
        {#each sortedFacets as facet}
          <div class="facet">
            <ButtonText name={`facet-${facet.name}`} onclick={() => onApplyFacet(facet)}>{facet.name}</ButtonText>
            <ButtonEmoji name={`remove-${facet.name}`} onclick={() => onRemoveFacet(facet)}>🗑️</ButtonEmoji>
          </div>
        {/each}
        <div class="footer">
          <Button name="save" onclick={onSaveFacet}>Save Facet</Button>
        </div>
      </div>
    {/snippet}
  </Menu>
</div>

<style>
  .facets-manager {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    :global {
      .ButtonEmoji {
        margin: 0 8px;
      }
      .Input {
        font-size: 14px;
        &:first-of-type {
          border-radius: 6px 0 0 6px;
          &:focus-visible {
            z-index: 1;
          }
        }
        &:last-of-type {
          transform: translateX(-1px);
          border-radius: 0 6px 6px 0;
          &:focus-visible {
            z-index: 1;
          }
        }
      }
    }
  }
  .dropdown {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 8px;
    padding: 12px;
  }
  .facet {
    width: 100%;
    display: flex;
    flex-direction: row;
    min-width: 200px;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    :global {
      button.ButtonEmoji {
        font-size: 16px;
      }
      button.ButtonText {
        font-size: 16px;
        width: 100%;
        text-align: left;
      }
    }
  }
  .footer {
    width: 100%;
    margin-top: 8px;
    :global {
      .Button {
        width: 100%;
      }
    }
  }
</style>

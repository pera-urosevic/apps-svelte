<script lang="ts">
  import Button from '@components/actions/Button.svelte'
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import ButtonText from '@components/actions/ButtonText.svelte'
  import Menu from '@components/containers/Menu.svelte'

  interface Props {
    value: string[]
    onValue: (value: any) => void
    placeholder: string
    autocompletes: string[]
  }

  const { value, onValue, placeholder, autocompletes }: Props = $props()

  const onOption = (option: any) => {
    const otherTags = value.filter((t: any) => t !== option)
    const valueNew = [...otherTags, option]
    onValue(valueNew)
  }

  const onRemove = (tag: any) => {
    const valueNew = value.filter((t: any) => t !== tag)
    onValue(valueNew)
  }
</script>

<div class="EditTags">
  <div class="tags">
    {#if value && value.length > 0}
      {#each value as tag}
        <Button onclick={() => onRemove(tag)} title={placeholder}>
          {tag}
        </Button>
      {/each}
    {:else}
      <div class="placeholder">{placeholder}</div>
    {/if}
  </div>
  <Menu>
    {#snippet button(onMenu)}
      <ButtonEmoji onclick={onMenu}>🔽</ButtonEmoji>
    {/snippet}
    {#snippet dropdown()}
      <div class="dropdown">
        {#each autocompletes as option}
          <ButtonText onclick={() => onOption(option)}>{option}</ButtonText>
        {/each}
      </div>
    {/snippet}
  </Menu>
</div>

<style>
  .EditTags {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 8px;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 4px 4px 4px 4px;
    border-radius: 6px;
    border: 1px solid var(--color-primary);
    min-height: 22px;
    gap: 4px;
    :global {
      .Button {
        border-radius: 4px;
        padding: 2px 4px 6px 4px;
        height: 24px;
        line-height: 24px;
      }
    }
  }
  .placeholder {
    color: rgb(117, 117, 117);
    padding-left: 4px;
    user-select: none;
  }
  .dropdown {
    padding: 12px;
    :global {
      .ButtonText {
        width: 100%;
        text-align: left;
      }
    }
  }
</style>

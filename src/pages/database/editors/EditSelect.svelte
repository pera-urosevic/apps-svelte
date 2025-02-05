<script lang="ts">
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import ButtonText from '@components/actions/ButtonText.svelte'
  import Menu from '@components/containers/Menu.svelte'
  import Input from '@components/forms/Input.svelte'

  interface Props {
    value: string
    onValue: (value: any) => void
    placeholder: string
    autocompletes: string[]
  }

  const { value, onValue, placeholder, autocompletes }: Props = $props()

  const onOption = (option: any) => {
    const valueNew = option
    onValue(valueNew)
  }
</script>

<div class="EditSelect">
  <Input type="text" {value} {placeholder} title={placeholder} />
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
  .EditSelect {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 8px;
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

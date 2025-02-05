<script lang="ts">
  import Button from '@components/actions/Button.svelte'
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import Slider from '@components/forms/Slider.svelte'

  type Props = {
    coffee: number
    ratio: number
    name: string
    min?: number
    max?: number
    step?: number
    onScale: (coffeeNew: number) => void
    onClose: () => void
  }
  let { coffee, ratio, name, min = 1, max = 100, step = 0.1, onScale, onClose }: Props = $props()

  let water = $derived(coffee * ratio)

  const onDelta = (delta: number) => {
    let coffeeNew = coffee + delta
    if (coffeeNew < min) coffeeNew = min
    if (coffeeNew > max) coffeeNew = max
    onScale(coffeeNew)
  }

  const onCoffee = (event: Event) => {
    const target = event.target as HTMLInputElement
    const coffeeNew = Number(target.value)
    onScale(coffeeNew)
  }
</script>

<div class="scaler">
  <div class="title">Recipe: {name}</div>
  <div class="measurements">
    <span>
      Coffee {Number(coffee).toFixed(1)}g
    </span>
    <span>
      Water {water.toFixed(1)}g
    </span>
  </div>
  <div class="slider">
    <Slider id="coffee" type="range" {min} {max} {step} value={coffee} oninput={onCoffee} />
  </div>
  <div class="controls">
    <Button onclick={() => onDelta(-step * 10)}>- 1.0g</Button>
    <Button onclick={() => onDelta(-step)}>- 0.1g</Button>
    &nbsp;
    <Button onclick={() => onDelta(+step)}>+ 0.1g</Button>
    <Button onclick={() => onDelta(+step * 10)}>+ 1.0g</Button>
  </div>
  <div class="close">
    <ButtonEmoji onclick={onClose}>❌</ButtonEmoji>
  </div>
</div>

<style>
  .scaler {
    padding: 12px 24px 24px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }
  .title {
    font-size: 1.3rem;
    font-weight: 600;
  }
  .measurements {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .slider {
    :global(input) {
      width: 300px;
    }
  }
  .controls {
    display: grid;
    grid-template-columns: 1fr auto auto auto auto;
    align-items: center;
    justify-items: center;
    gap: 8px;
  }
  .close {
    position: absolute;
    top: 12px;
    right: 16px;
  }
</style>

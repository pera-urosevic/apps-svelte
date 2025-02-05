<script lang="ts">
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import Link from '@components/actions/Link.svelte'
  import Select from '@components/forms/Select.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import { getColors, removeColor, saveColor } from '@pages/colors/api'
  import type { Color } from '@pages/colors/types'
  import convert from 'color-convert'
  import type { HSL } from 'color-convert/conversions'
  import { onMount } from 'svelte'

  let colors = $state<Color[]>([])
  let color = $state<Color>()

  let hsl = $state<HSL>([
    Math.round(Math.random() * 36) * 10,
    Math.round(Math.random() * 4) * 10 + 30,
    Math.round(Math.random() * 4) * 10 + 30,
  ])

  let hex = $derived(convert.hsl.hex(hsl))
  let rgb = $derived(convert.hsl.rgb(hsl))

  const onHex = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    hsl = convert.hex.hsl(value)
  }

  const onR = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    const r = Number(value)
    hsl = convert.rgb.hsl(r, rgb[1], rgb[2])
  }

  const onG = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    const g = Number(value)
    hsl = convert.rgb.hsl(rgb[0], g, rgb[2])
  }

  const onB = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    const b = Number(value)
    hsl = convert.rgb.hsl(rgb[0], rgb[1], b)
  }

  const onColor = (e: Event) => {
    const colorName = (e.target as HTMLSelectElement).value
    const colorSelected = colors.find((c) => c.name === colorName)
    if (!colorSelected) return
    color = colorSelected
    hsl = [color.h, color.s, color.l]
  }

  const onSave = async () => {
    const name = prompt('Color Name?')
    if (!name) return
    const colorNew = { name, h: hsl[0], s: hsl[1], l: hsl[2] }
    const data = await saveColor(colorNew)
    if (!data) return
    colors.push(colorNew)
  }

  const onRemove = async () => {
    if (!color) return
    const confirmed = confirm('Are you sure you want to remove this color?')
    if (!confirmed) return
    const data = removeColor(color)
    if (!data) return
    colors = colors.filter((c) => c.name !== color!.name)
    color = undefined
  }

  onMount(async () => {
    const data = await getColors()
    if (!data) return
    colors = data
  })
</script>

<Header>
  {#snippet start()}
    <Link href="/colors.html">Colors</Link>
    <Link href="/colors-picker.html">Picker</Link>
    <Select onchange={onColor}>
      <option>Select Color</option>
      {#each colors as color}
        <option value={color.name}>{color.name}</option>
      {/each}
    </Select>
    <ButtonEmoji onclick={onRemove} disabled={!color}>🗑️</ButtonEmoji>
    <ButtonEmoji onclick={onSave}>➕</ButtonEmoji>
  {/snippet}
</Header>
<Main>
  <div class="panel">
    <div class="preview" style="background-color: hsl({hsl[0]}, {hsl[1]}%, {hsl[2]}%);">
      <input type="color" value={`#${hex}`} oninput={onHex} />
    </div>
    <div class="controls">
      <div class="format">
        <div class="name">HSL</div>
        <input class="unit" type="number" min="0" max="360" step="1" bind:value={hsl[0]} title="Hue" />
        <input class="unit" type="number" min="0" max="100" step="1" bind:value={hsl[1]} title="Saturation" />
        <input class="unit" type="number" min="0" max="100" step="1" bind:value={hsl[2]} title="Lightness" />
      </div>
      <div class="format">
        <div class="name">RGB</div>
        <input class="unit" type="number" min="0" max="255" step="1" value={rgb[0]} onchange={onR} title="Red" />
        <input class="unit" type="number" min="0" max="255" step="1" value={rgb[1]} onchange={onG} title="Green" />
        <input class="unit" type="number" min="0" max="255" step="1" value={rgb[2]} onchange={onB} title="Blue" />
      </div>
      <div class="format">
        <div class="name">HEX</div>
        <input class="hex" type="text" value={hex} onchange={onHex} />
      </div>
    </div>
  </div>
</Main>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: 12px;
    .preview {
      width: 270px;
      height: 64px;
      border-radius: 6px;
      input {
        cursor: pointer;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
    }
    .controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .format {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        gap: 12px;
        .name {
          width: 40px;
        }
        .unit {
          border: none;
          padding: 4px 0;
          border-radius: 4px;
          text-align: right;
          font-size: 18px;
          width: 64px;
        }
        .hex {
          border: none;
          padding: 4px 4px 4px 0;
          border-radius: 4px;
          text-align: right;
          font-size: 18px;
          width: 136px;
        }
      }
    }
  }
</style>

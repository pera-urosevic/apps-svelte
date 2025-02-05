<script lang="ts">
  import Link from '@components/actions/Link.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'

  const colors = {
    White: '#ffffff',
    Gray: '#808080',
    Black: '#000000',
    Red: '#ff0000',
    Green: '#00ff00',
    Blue: '#0000ff',
    Yellow: '#ffff00',
    Cyan: '#00ffff',
    Magenta: '#ff00ff',
  }

  let color = $state()

  const onColor = (newColor: string) => {
    if (newColor) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.fullscreenElement) document.exitFullscreen()
    }
    color = newColor
  }
</script>

<Header>
  {#snippet start()}
    <Link href="/colors.html">Colors</Link>
    <Link href="/colors-picker.html">Picker</Link>
  {/snippet}
</Header>
<Main>
  <div class="grid">
    {#each Object.entries(colors) as [key, value]}
      <button
        class="color"
        style={`background-color: ${value}`}
        onclick={() => onColor(value)}
        title={key}
        aria-label={key}
      ></button>
    {/each}
  </div>

  {#if color}
    <button class="fill" style={`background-color: ${color}`} onclick={() => onColor('')} aria-label="Dismiss">
    </button>
  {/if}
</Main>

<style>
  .grid {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    flex-wrap: wrap;
    justify-content: start;
    gap: 16px;
  }
  .color {
    cursor: pointer;
    border: none;
    border-radius: 8px;
  }
  .fill {
    cursor: pointer;
    border: none;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
  }
</style>

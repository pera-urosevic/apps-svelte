<script lang="ts">
  import ButtonText from '@components/actions/ButtonText.svelte'
  import Link from '@components/actions/Link.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import { getEntries } from '@pages/subtler/api'
  import type { Entry } from '@pages/subtler/types'
  import { onMount } from 'svelte'

  type Props = {
    path: string
  }
  const { path }: Props = $props()

  const PS = import.meta.env.VITE_SUBTLER_PATH_SEPARATOR

  let entries = $state<Entry[]>()

  const onParent = () => {
    const pathNew = path.split(PS).slice(0, -1).join(PS)
    window.location.href = `/subtler.html?path=${encodeURIComponent(pathNew)}`
  }

  const onEntries = async () => {
    const data = await getEntries(path)
    if (!data) return
    entries = data
  }

  const isExtractSubtitle = (entry: Entry) => {
    if (!entries) return false
    // skip if not mkv
    if (!entry.name.toLowerCase().endsWith('.mkv')) return false
    // skip if subtitle already present
    const baseName = entry.name.replace('.mkv', '')
    if (entries.find((e) => e.name.startsWith(baseName) && e.name !== entry.name)) return false
    return true
  }

  onMount(() => {
    onEntries()
  })
</script>

<Header>
  {#snippet start()}
    <Link href="/subtler.html">Subtler</Link>
    <ButtonText onclick={onParent} disabled={!path}>[parent]</ButtonText>
  {/snippet}
</Header>
<Main>
  {#if entries}
    <div class="subtler">
      <div class="path">
        {path || PS}
      </div>
      <div class="entries">
        {#each entries as entry}
          {#if entry.dir}
            <Link href={`/subtler.html?path=${encodeURIComponent((path ? path + PS : '') + entry.name)}`}>
              {entry.name}
            </Link>
          {:else if isExtractSubtitle(entry)}
            <Link href={`/subtler-video.html?video=${encodeURIComponent(path + PS + entry.name)}`}>{entry.name}</Link>
          {:else}
            <div class="file">{entry.name}</div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</Main>

<style>
  .subtler {
    :global {
      .Link {
        text-align: left;
        font-size: 18px;
        padding: 0;
        word-wrap: anywhere;
      }
    }
  }
  .path {
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 24px;
    word-wrap: anywhere;
  }
  .entries {
    display: flex;
    flex-direction: column;
    font-size: 18px;
    gap: 16px;
    align-items: start;
    .file {
      opacity: 0.2;
      word-wrap: anywhere;
    }
  }
</style>

<script lang="ts">
  import Link from '@components/actions/Link.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import { extractSubtitles } from '@pages/subtler/api'
  import { onMount } from 'svelte'

  type Props = {
    video: string
  }
  const { video }: Props = $props()

  const PS = import.meta.env.VITE_SUBTLER_PATH_SEPARATOR
  const path = video.split(PS).slice(0, -1).join(PS)
  const file = video.split(PS).slice(-1)

  let log = $state('')

  onMount(async () => {
    const data = await extractSubtitles(video)
    if (!data) return
    log = data
  })
</script>

<Header>
  {#snippet start()}
    <Link href="/subtler.html">Subtler</Link>
    <Link href="/subtler.html?path={encodeURIComponent(path)}">Back</Link>
  {/snippet}
</Header>
<Main>
  <div class="container">
    <div class="path">{path}</div>
    <div class="file">{file}</div>
    <pre class="log">{log}</pre>
  </div>
</Main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .path {
    font-size: 16px;
  }
  .file {
    font-size: 18px;
  }
  .log {
    font-size: 14px;
  }
</style>

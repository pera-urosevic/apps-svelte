<script lang="ts">
  import Preview from '@pages/reader/viewer/Preview.svelte'
  import Feeds from '@pages/reader/viewer/Feeds.svelte'
  import { onMount } from 'svelte'
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import { activeFeed } from '@pages/reader/viewer/stores'
  import LinkEmoji from '@components/actions/LinkEmoji.svelte'
  import { onDiscardFeed } from '@pages/reader/viewer/stores/onDiscardFeed'
  import { onCreateFeed } from '@pages/reader/viewer/stores/onCreateFeed'
  import { onArticleNext } from '@pages/reader/viewer/stores/onArticleNext'
  import { onArticlePrev } from '@pages/reader/viewer/stores/onArticlePrev'
  import { onKeyUp } from '@pages/reader/viewer/stores/onKeyUp'
  import Tokens from '@pages/reader/viewer/Tokens.svelte'
  import Link from '@components/actions/Link.svelte'
  import { onLoad } from '@pages/reader/viewer/stores/onLoad'
  import { isMobile } from '@services/browser'

  onMount(() => {
    onLoad()
  })
</script>

<Header>
  {#snippet start()}
    <Link href="/reader.html">Reader</Link>
    {#if $activeFeed}
      <ButtonEmoji name="discard" onclick={onDiscardFeed}>✅</ButtonEmoji>
      <LinkEmoji href={`/reader-edit.html?edit=${encodeURIComponent($activeFeed.name)}`}>📝</LinkEmoji>
      {#if !isMobile()}
        <ButtonEmoji name="prev" onclick={onArticlePrev}>◀️</ButtonEmoji>
        <ButtonEmoji name="next" onclick={onArticleNext}>▶️</ButtonEmoji>
      {/if}
    {/if}
  {/snippet}
  {#snippet end()}
    <Tokens />
    <ButtonEmoji name="create" onclick={onCreateFeed}>➕</ButtonEmoji>
  {/snippet}
</Header>
<Main>
  <div class="grid">
    <Feeds />
    {#if $activeFeed}
      <Preview />
    {/if}
  </div>
</Main>

<svelte:window onkeyup={onKeyUp} />

<style>
  .grid {
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
  }
  :global(body.mobile) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: 120px 1fr;
      justify-items: start;
      gap: 16px;
      row-gap: 16px;
    }
  }
</style>

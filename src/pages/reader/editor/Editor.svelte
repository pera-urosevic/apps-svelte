<script lang="ts">
  import Button from '@components/actions/Button.svelte'
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import Link from '@components/actions/Link.svelte'
  import Checkbox from '@components/forms/Checkbox.svelte'
  import Input from '@components/forms/Input.svelte'
  import Label from '@components/forms/Label.svelte'
  import Textarea from '@components/forms/Textarea.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import { getFeed, removeFeed, updateFeed } from '@pages/reader/api'
  import type { Feed } from '@pages/reader/types'
  import { onMount } from 'svelte'

  type Props = {
    name: string
  }
  const { name }: Props = $props()

  let feed = $state<Feed>()

  const onRefresh = async () => {
    if (!feed) return
    const feedNew = $state.snapshot(feed)
    feedNew.updated = 0
    const data = await updateFeed(name, feedNew)
    if (!data) return
    feed = data
  }

  const onUpdate = async () => {
    if (!feed) return
    const data = await updateFeed(name, feed)
    if (!data) return
    feed = data
  }

  const onRemove = async () => {
    const confirmed = confirm('Are you sure you want to remove this feed?')
    if (confirmed) {
      const success = await removeFeed(name)
      if (success) window.location.href = `/reader.html`
    }
  }

  const onUrl = (e: Event) => {
    if (!feed) return
    feed.url = (e.target as HTMLInputElement).value
  }

  const onWeb = (e: Event) => {
    if (!feed) return
    feed.web = (e.target as HTMLInputElement).value
  }

  const onIcon = (e: Event) => {
    if (!feed) return
    feed.icon = (e.target as HTMLInputElement).value
  }

  const onTokens = (e: Event) => {
    if (!feed) return
    feed.tokens = (e.target as HTMLTextAreaElement).value
  }

  const onStyle = (e: Event) => {
    if (!feed) return
    feed.style = (e.target as HTMLTextAreaElement).value
  }

  const onDisabled = (e: Event) => {
    if (!feed) return
    feed.disabled = (e.target as HTMLInputElement).checked
  }

  onMount(async () => {
    const data = await getFeed(name)
    if (!data) return
    feed = data
  })
</script>

{#if feed}
  <Header>
    {#snippet start()}
      <Link href="/reader.html">Reader</Link>
      {#if feed!.icon}
        <div class="icon">
          <img src={feed!.icon} alt="" />
        </div>
      {/if}
      <Link>{feed!.name}</Link>
      <ButtonEmoji name="refresh" onclick={onRefresh}>🔄️</ButtonEmoji>
      <ButtonEmoji name="remove" onclick={onRemove}>🗑️</ButtonEmoji>
    {/snippet}
  </Header>
  <Main>
    <div class="form">
      <Label for="url">URL</Label>
      <Input type="text" name="url" id="url" value={feed.url} oninput={onUrl} />

      <Label for="web">Web</Label>
      <Input type="text" name="web" id="web" value={feed.web} oninput={onWeb} />

      <Label for="icon">Icon</Label>
      <Input type="text" name="icon" id="icon" oninput={onIcon} />

      <Label for="tokens">Tokens</Label>
      <Textarea name="tokens" id="tokens" value={feed.tokens} oninput={onTokens} />

      <Label for="style">Style</Label>
      <Textarea name="style" id="style" value={feed.style} oninput={onStyle} />

      <Label for="disabled">Disabled</Label>
      <Checkbox name="disabled" id="disabled" checked={feed.disabled} oninput={onDisabled} />
      &nbsp;
      <div class="actions">
        <Button onclick={onUpdate}>Save</Button>
      </div>
    </div>
  </Main>
{/if}

<style>
  .icon {
    width: 24px;
    height: 24px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .form {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 10px;
    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  :global {
    body.desktop {
      form {
        width: 100%;
      }
    }
    #tokens {
      font-family: 'Consolas', monospace;
      font-size: 14px;
      height: 200px;
      max-height: 200px;
    }
    #style {
      font-family: 'Consolas', monospace;
      font-size: 14px;
      height: 400px;
      max-height: 400px;
    }
  }
</style>

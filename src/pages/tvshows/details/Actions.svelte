<script lang="ts">
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import LinkEmoji from '@components/actions/LinkEmoji.svelte'
  import Select from '@components/forms/Select.svelte'
  import type { TVShowDetails } from '@pages/tvshows/types'

  type Props = {
    tvshow: TVShowDetails
    onWatching: () => void
    onStream: (e: Event) => void
    onRemove: () => void
  }
  const { tvshow, onWatching, onStream, onRemove }: Props = $props()
</script>

<div class="actions">
  <LinkEmoji
    href={`/tvshows-refresh.html?refresh=[${tvshow.id}]&back=${encodeURIComponent(`/tvshows-details.html?id=${tvshow.id}`)}`}
    title={tvshow.updated}
  >
    🔄️
  </LinkEmoji>
  <div class="title">{tvshow.title}</div>
  {#if tvshow.runtime}
    <div class="runtime">~{tvshow.runtime}min</div>
  {/if}
  <ButtonEmoji name="watching" onclick={onWatching}>🍿</ButtonEmoji>
  <Select name="stream" onchange={onStream} value={tvshow.stream}>
    <option value=""></option>
    <option value="netflix">Netflix</option>
    <option value="apple">Apple TV</option>
  </Select>
  <LinkEmoji href={`https://www.tvmaze.com/shows/${tvshow.tvmaze}`} target="_blank" rel="noreferrer noopener">
    📺
  </LinkEmoji>
  {#if tvshow.imdb}
    <LinkEmoji href={`https://www.imdb.com/title/${tvshow.imdb}`} target="_blank" rel="noreferrer noopener">
      🎞️
    </LinkEmoji>
  {/if}
  {#if tvshow.website}
    <LinkEmoji href={tvshow.website} target="_blank" rel="noreferrer noopener">🌍</LinkEmoji>
  {/if}
  &nbsp;
  <ButtonEmoji name="remove" onclick={onRemove}>🗑️</ButtonEmoji>
</div>

<style>
  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
  .title {
    font-size: 18px;
    font-weight: 500;
    padding: 0 4px;
  }
  .runtime {
    opacity: 0.6;
  }
  :global(body.mobile) {
    .title {
      display: none;
    }
  }
</style>

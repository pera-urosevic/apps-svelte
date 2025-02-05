<script lang="ts">
  import LinkText from '@components/actions/LinkText.svelte'
  import { swipe, type Swipe } from '@components/actions/swipe.svelte'
  import {
    activeFeed,
    activeArticleProps,
    activeArticle,
    activeArticleRatings,
    activeArticleScore,
  } from '@pages/reader/viewer/stores'
  import { onArticleNext } from '@pages/reader/viewer/stores/onArticleNext'
  import { onArticlePrev } from '@pages/reader/viewer/stores/onArticlePrev'

  const onSwipe = (swipe: Swipe) => {
    if (swipe === 'left') return onArticleNext()
    if (swipe === 'right') return onArticlePrev()
  }

  $effect(() => {
    if ($activeArticleProps) console.log($activeArticleProps)
  })
</script>

{#if $activeFeed && $activeArticleProps}
  <div
    id="preview"
    class={`preview feed-${$activeFeed.name.replaceAll(' ', '')}`}
    class:discarded={$activeArticle?.discarded}
    use:swipe={onSwipe}
  >
    <div
      class="title"
      class:positive={$activeArticleScore === 'positive'}
      class:negative={$activeArticleScore === 'negative'}
    >
      <LinkText href={$activeArticleProps.link} target="_blank" rel="noreferrer noopener">
        {$activeArticleProps.title}
      </LinkText>
    </div>
    {#if $activeArticleRatings}
      <div class="ratings">
        {#each Object.entries($activeArticleRatings) as [score, tokens]}
          <div class="tokens">
            {#each tokens as token}
              <div class="token" class:positive={score === 'positive'} class:negative={score === 'negative'}>
                {token}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
    {#if $activeArticleProps.categories}
      <div class="categories">{$activeArticleProps.categories.join(' | ')}</div>
    {/if}
    {#if $activeArticleProps.image}
      <div class="image"><img src={$activeArticleProps.image.url} alt="" /></div>
    {/if}
    {#if $activeArticleProps.description}
      <div class="description html">
        {@html $activeArticleProps.description}
      </div>
    {/if}
    {#if $activeArticleProps.content}
      <div class="content html">
        {@html $activeArticleProps.content}
      </div>
    {/if}
    {#if $activeArticleProps.enclosures}
      <div class="enclosures">
        {#each $activeArticleProps.enclosures as enclosure}
          {#if enclosure.type?.startsWith('image')}
            <img src={enclosure.url} alt="" />
          {/if}
          {#if enclosure.type?.startsWith('video')}
            <video src={enclosure.url} controls>
              <track kind="captions" />
            </video>
          {/if}
          {#if enclosure.type?.startsWith('audio')}
            <audio src={enclosure.url} controls></audio>
          {/if}
        {/each}
      </div>
    {/if}
    {@html `<style>${$activeFeed.style}</style>`}
  </div>
{/if}

<style>
  .preview {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 6px;
    word-break: break-word;
    .title {
      font-size: 22px;
      font-weight: 600;
      &.positive {
        color: var(--color-success);
      }
      &.negative {
        color: var(--color-error);
      }
    }
    .ratings {
      display: flex;
      flex-direction: column;
      gap: 6px;
      .tokens {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 4px;
        .token {
          &::after {
            color: var(--color-light);
            content: ' · ';
          }
          &:last-child::after {
            content: '';
          }
          &.positive {
            color: var(--color-success);
          }
          &.negative {
            color: var(--color-error);
          }
        }
      }
    }
    &.discarded {
      opacity: 0.5;
    }
    img {
      max-width: 100%;
    }
    video {
      max-width: 100%;
    }
    audio {
      max-width: 100%;
    }
  }
  :global {
    body.mobile {
      .preview {
        width: 100%;
        .html {
          width: 100%;
          overflow-x: hidden;
          word-break: break-word;
          * {
            max-width: 100% !important;
            width: auto !important;
            overflow-x: hidden;
            height: auto !important;
          }
        }
      }
    }
  }
</style>

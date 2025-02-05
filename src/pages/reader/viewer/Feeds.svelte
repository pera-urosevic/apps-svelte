<script lang="ts">
  import ButtonText from '@components/actions/ButtonText.svelte'
  import { activeBundleIndex, bundles, bundleUnreadArticles } from '@pages/reader/viewer/stores'
  import { onFeed } from '@pages/reader/viewer/stores/onBundleSelect'
</script>

<div class="feeds">
  {#each $bundles as bundle, i}
    <ButtonText onclick={() => onFeed(i)}>
      <div
        class="feed"
        class:active={i === $activeBundleIndex}
        class:disabled={bundle.feed.disabled}
        class:empty={!bundle.feed.disabled && bundle.articles.length < 1}
      >
        <div class="image">
          {#if bundle.feed.icon}
            <img src={bundle.feed.icon} alt="" />
          {/if}
        </div>
        <div class="name">
          {bundle.feed.name}
        </div>
        <div class="unread">
          {$bundleUnreadArticles[bundle.feed.name]}
        </div>
      </div>
    </ButtonText>
  {/each}
</div>

<style>
  .feeds {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    scrollbar-width: none;
  }
  .feed {
    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-items: start;
    align-items: center;
    gap: 8px;
    padding: 2px 8px;
    border-bottom: 2px solid transparent;
    opacity: 0.3;
    &.active {
      border-bottom-color: var(--color-primary);
      opacity: 1;
    }
    &.empty {
      opacity: 0.3;
    }
    &.disabled {
      opacity: 0.1;
    }
  }
  .image {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .unread {
    margin-left: 8px;
  }
  :global(body.mobile) {
    .feeds {
      background-color: var(--color-base-alt);
      width: calc(100% - 8px);
      height: calc(100% - 12px);
      padding: 6px 4px;
    }
    .feed {
      gap: 4px;
    }
  }
</style>

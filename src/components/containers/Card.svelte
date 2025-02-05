<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    title?: string
    href?: string
    target?: string
    onclick?: () => void
    toolbar?: Snippet
    children?: Snippet
  }
  const { title, href, target, onclick, toolbar, children }: Props = $props()
</script>

<a class="Card" class:clickable={onclick} {href} {target} onclick={onclick}>
  {#if title || toolbar}
    <div class="header">
      {#if title}
        <div class="title" title={title}>{title}</div>
      {/if}
      {#if toolbar}
        {@render toolbar()}
      {/if}
    </div>
  {/if}
  {#if children}
    <div class="children">
      {@render children()}
    </div>
  {/if}
</a>

<style>
  .Card {
    user-select: none;
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    display: grid;
    grid-template-rows: repeat(2, auto);
    justify-content: stretch;
    align-content: start;
    background-color: var(--color-base-alt);
    border-radius: 8px;
    &:hover {
      background-color: var(--color-primary-dark);
    }
    &.clickable {
      cursor: pointer;
    }
    .header {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px;
      height: 48px;
      line-height: 48px;
      padding: 0 20px;
      border-bottom: 1px solid var(--color-primary-light);
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .children {
      padding: 12px 20px;
    }
  }
</style>

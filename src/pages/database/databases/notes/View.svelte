<script lang="ts">
  import type { DocModel } from '@pages/database/types'
  import { marked } from 'marked'

  interface Props {
    doc: DocModel
  }

  const { doc }: Props = $props()
  let html = $derived(marked(doc.content))
</script>

<div class="view">
  <div class="title">{doc.name}</div>
  <div class="markdown">
    {@html html}
  </div>
</div>

<style>
  .title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
  }
  :global {
    .markdown h1 {
      font-size: 2rem;
      font-weight: bold;
      margin: 0.5rem 0 0.5rem 0;
    }
    .markdown h2 {
      font-size: 1.6rem;
      font-weight: bold;
      margin: 0.4rem 0 0.4rem 0;
    }
    .markdown h3 {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0.3rem 0 0.3rem 0;
    }
    .markdown p {
      line-height: 1.5rem;
      margin: 0.8rem 0 0.8rem 0;
    }
    .markdown hr {
      margin: 0.5rem 0;
    }
  }
</style>

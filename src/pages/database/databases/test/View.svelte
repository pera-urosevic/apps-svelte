<script lang="ts">
  import type { DocModel } from '@pages/database/types'
  import { marked } from 'marked'

  interface Props {
    doc: DocModel
  }

  let { doc }: Props = $props()
</script>

<div class="view">
  <p>id: {doc.id}</p>
  <p>name: {doc.name}</p>
  <p>string: {doc.string}</p>
  <p>number: {doc.number}</p>
  <p>text: {doc.text}</p>
  <p>markdown: {@html marked(doc.markdown)}</p>
  <p>boolean: {doc.boolean}</p>
  <p>date: {doc.date}</p>
  <p>datetime: {doc.datetime}</p>
  <p>select: {doc.select}</p>
  <p>list: {doc.list}</p>
  <p>tags: {doc.tags}</p>
  <p>image: <img src={doc.image} alt="" /></p>
  <p>createdAt: {doc.createdAt}</p>
  <p>updatedAt: {doc.updatedAt}</p>
</div>

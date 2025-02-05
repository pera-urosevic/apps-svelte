<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements'
  let { value, ...props }: HTMLTextareaAttributes = $props()
</script>

<textarea class="Textarea" rows={8} {...props}>{value}</textarea>

<style>
  .Textarea {
    background-color: var(--color-base);
    color: var(--color-light);
    border: 1px solid var(--color-primary);
    min-height: 174px;
    padding: 6px 8px;
    border-radius: 6px;
    font-family: var(--font-family);
    font-size: var(--font-size);
    resize: var(--textarea--resize, none);
    &:focus {
      outline: none;
      border-color: var(--color-secondary);
    }
  }
</style>

<script lang="ts">
  import Textarea from '@components/forms/Textarea.svelte'

  interface Props {
    value: string
    onValue: (value: any) => void
    placeholder: string
  }

  const { value, onValue, placeholder }: Props = $props()

  const onInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    onValue(target.value)
  }
</script>

<Textarea {value} oninput={onInput} {placeholder} title={placeholder}></Textarea>

<script lang="ts">
  import Textarea from '@components/forms/Textarea.svelte'

  interface Props {
    value: string[]
    onValue: (value: any) => void
    placeholder: string
  }

  const { value, onValue, placeholder }: Props = $props()

  const onInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    const valueNew = target.value.split('\n')
    onValue(valueNew)
  }
</script>

<Textarea value={value.join('\n')} oninput={onInput} {placeholder} title={placeholder}></Textarea>

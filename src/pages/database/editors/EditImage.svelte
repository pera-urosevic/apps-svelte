<script lang="ts">
  import Input from '@components/forms/Input.svelte'

  interface Props {
    value: string | null
    onValue: (value: any) => void
    placeholder: string
  }

  const { value, onValue, placeholder }: Props = $props()

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    onValue(target.value)
  }
</script>

<Input
  type="url"
  value={value?.startsWith('data:image') ? '' : value}
  oninput={onInput}
  {placeholder}
  title={placeholder}
/>

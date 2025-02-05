<script lang="ts">
  import Input from '@components/forms/Input.svelte'

  interface Props {
    value: string
    placeholder: string
    onValue: (value: any) => void
  }

  const { value, onValue, placeholder }: Props = $props()

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    onValue(target.value)
  }
</script>

<Input type="text" {value} {placeholder} title={placeholder} oninput={onInput} />

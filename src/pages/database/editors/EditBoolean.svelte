<script lang="ts">
  import Checkbox from '@components/forms/Checkbox.svelte'

  interface Props {
    checked: boolean
    onValue: (value: any) => void
    placeholder: string
  }

  const { checked, onValue, placeholder }: Props = $props()

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    onValue(target.checked)
  }
</script>

<Checkbox type="checkbox" {checked} oninput={onInput} {placeholder} title={placeholder} />

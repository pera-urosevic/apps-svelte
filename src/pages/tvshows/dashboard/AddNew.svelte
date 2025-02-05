<script lang="ts">
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'

  const onCreate = () => {
    const title = window.prompt('TV Show Title')
    if (!title) return
    window.location.href = `/tvshows-create.html?title=${encodeURIComponent(title)}`
  }
</script>

<ButtonEmoji onclick={onCreate}>➕</ButtonEmoji>

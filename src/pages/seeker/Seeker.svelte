<script lang="ts">
  import Link from '@components/actions/Link.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import Actions from '@pages/seeker/components/Actions.svelte'
  import Target from '@pages/seeker/components/Target.svelte'
  import { targets } from '@pages/seeker/stores'
  import { onLoad } from '@pages/seeker/stores/onLoad'
  import { onMount } from 'svelte'

  onMount(() => {
    onLoad()
  })
</script>

<Header>
  {#snippet start()}
    <Link href="/seeker.html">Seeker</Link>
    <Actions />
  {/snippet}
</Header>
<Main>
  <div class="targets">
    {#each $targets as target}
      {#key target.title}
        <Target {target} />
      {/key}
    {/each}
  </div>
</Main>

<style>
  .targets {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 12px;
  }
</style>

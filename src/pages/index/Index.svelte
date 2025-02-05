<script lang="ts">
  import Link from '@components/actions/Link.svelte'
  import LinkButton from '@components/actions/LinkButton.svelte'
  import Header from '@components/layouts/Header.svelte'
  import Main from '@components/layouts/Main.svelte'
  import iconBrew from '@pages/brew/brew.svg?url'
  import iconColors from '@pages/colors/colors.svg?url'
  import iconMonitor from '@pages/monitor/monitor.svg?url'
  import iconSeeker from '@pages/seeker/seeker.svg?url'
  import iconReader from '@pages/reader/reader.svg?url'
  import iconTVShows from '@pages/tvshows/tvshows.svg?url'
  import iconSubtler from '@pages/subtler/subtler.svg?url'
  import iconDatabase from '@pages/database/database.svg?url'
</script>

<Header>
  {#snippet start()}
    <Link href="/">Apps</Link>
  {/snippet}
</Header>
<Main>
  <div class="grid">
    <LinkButton href="/brew.html"><img src={iconBrew} alt="" />Brew</LinkButton>
    <LinkButton href="/colors.html"><img src={iconColors} alt="" />Colors</LinkButton>
    <LinkButton href="/monitor.html"><img src={iconMonitor} alt="" />Monitor</LinkButton>
    <LinkButton href="/seeker.html"><img src={iconSeeker} alt="" />Seeker</LinkButton>
    <LinkButton href="/reader.html"><img src={iconReader} alt="" />Reader</LinkButton>
    <LinkButton href="/tvshows.html"><img src={iconTVShows} alt="" />TV Shows</LinkButton>
    <LinkButton href="/subtler.html"><img src={iconSubtler} alt="" />Subtler</LinkButton>
    <LinkButton href="/database-index.html"><img src={iconDatabase} alt="" />Database</LinkButton>
  </div>
</Main>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    gap: 16px;
    row-gap: 16px;
    & :global(.LinkButton) {
      display: flex;
      flex-direction: row;
      height: 60px;
      width: auto;
      gap: 8px;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
  :global {
    body.mobile {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  }
</style>

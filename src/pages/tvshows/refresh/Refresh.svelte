<script lang="ts">
  import { busy } from '@components/layouts/store'
  import { getTVMaze, getTVShow, updateTVShow } from '@pages/tvshows/api'
  import { mergeEpisodes } from '@pages/tvshows/services/episodes'
  import type { TVMazeTVShow, TVShowStatus } from '@pages/tvshows/types'
  import dayjs from 'dayjs'
  import { onMount } from 'svelte'

  type Props = {
    refresh: string
    back: string
  }
  const { refresh, back }: Props = $props()

  const onRefresh = async (ids: number[]) => {
    busy.set(true)
    for (const id of ids) {
      const record = await getTVShow(id)
      if (!record) continue
      const json = await getTVMaze(record.tvmaze)
      if (!json) continue
      const tvmaze = JSON.parse(json) as TVMazeTVShow
      const now = dayjs()
      const episodes = mergeEpisodes(record.episodes, tvmaze._embedded?.episodes ?? [])
      const recordNew = structuredClone(record)
      recordNew.status = tvmaze.status as TVShowStatus
      recordNew.website = tvmaze.officialSite ? tvmaze.officialSite : recordNew.website
      recordNew.imdb = tvmaze.externals?.imdb ? tvmaze.externals.imdb : recordNew.imdb
      recordNew.updated = now.toDate()
      recordNew.episodes = episodes
      recordNew.image = tvmaze.image?.medium ?? null
      recordNew.runtime = tvmaze.averageRuntime ? tvmaze.averageRuntime : recordNew.runtime
      await updateTVShow(recordNew)
    }
    busy.set(false)
    window.location.href = back || '/tvshows.html'
  }

  onMount(async () => {
    const ids = JSON.parse(refresh)
    onRefresh(ids)
  })
</script>

<style></style>

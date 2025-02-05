<script lang="ts">
  import Button from '@components/actions/Button.svelte'
  import ButtonEmoji from '@components/actions/ButtonEmoji.svelte'
  import ButtonText from '@components/actions/ButtonText.svelte'
  import { showDialog } from '@components/containers/Dialog'
  import Dialog from '@components/containers/Dialog.svelte'
  import Menu from '@components/containers/Menu.svelte'
  import { busy } from '@components/layouts/store'
  import { databaseImporter, type DatabaseName } from '@pages/database/databases/databases'
  import type { DatabaseImporterWorker, DocModel, ImporterSearchResult } from '@pages/database/types'
  import { alertError, alertServerError } from '@services/alert'

  interface Props {
    doc: DocModel
    onDoc: (doc: DocModel) => void
    database: string
  }

  const { doc, onDoc, database }: Props = $props()

  let importer = databaseImporter(database as DatabaseName)
  let srs: ImporterSearchResult[] | undefined = $state()
  let worker: DatabaseImporterWorker | null

  let enabled = $derived(importer !== undefined)

  const onImporterSearch = async (workerNew: DatabaseImporterWorker) => {
    $busy = true
    worker = workerNew
    srs = []
    try {
      srs = await worker.searchDoc(doc)
      if (srs) {
        // sort
        srs.sort((a: ImporterSearchResult, b: ImporterSearchResult) => a.label.localeCompare(b.label))
        // if only one match, apply it without choosing
        if (srs.length === 1) {
          onImporterFetch(srs[0])
        } else {
          // if exact match present, push to first place
          const exactMatchIndex = srs.findIndex((s: ImporterSearchResult) => s.label.startsWith(doc.name))
          if (exactMatchIndex > -1) {
            const exactMatch = srs[exactMatchIndex]
            srs.splice(exactMatchIndex, 1)
            srs.unshift(exactMatch)
          }
          showDialog('importer-results')
        }
      }
    } catch (error) {
      console.log(error)
      alertError(String(error))
    } finally {
      $busy = false
    }
  }

  const onImporterFetch = async (sr: ImporterSearchResult) => {
    if (!worker) return
    $busy = true
    try {
      const docImport = await worker.fetchDoc(sr)
      const docNew = $state.snapshot(doc)
      for (const key of Object.keys(docImport)) {
        docNew[key] = docImport[key]
      }
      onDoc(docNew)
    } catch (error) {
      console.log(error)
      alertError(String(error))
    } finally {
      worker = null
      $busy = false
    }
  }
</script>

{#if enabled}
  <div class="importers">
    <Menu>
      {#snippet button(onMenu)}
        <ButtonEmoji disabled={$busy} onclick={onMenu}>🪄</ButtonEmoji>
      {/snippet}
      {#snippet dropdown()}
        <div class="dropdown">
          {#each Object.entries(importer) as [workerName, worker]}
            <Button onclick={() => onImporterSearch(worker)}>{workerName}</Button>
          {/each}
        </div>
      {/snippet}
    </Menu>
    <Dialog id="importer-results">
      {#if srs && srs.length > 0}
        <div class="results">
          {#each srs as searchResult}
            <Button title={searchResult.tooltip} onclick={() => onImporterFetch(searchResult)}>
              {searchResult.label}
            </Button>
          {/each}
        </div>
      {:else}
        <p>Nothing found</p>
      {/if}
      <div class="results-action">
        <ButtonText>Cancel</ButtonText>
      </div>
    </Dialog>
  </div>
{/if}

<style>
  .importers {
    margin-left: 8px;
  }
  .dropdown {
    padding: 12px;
    min-width: 120px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    :global {
      .Button {
        width: 100%;
      }
    }
  }
  .results {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 12px;
    max-height: 400px;
    :global {
      .Button {
        align-items: start;
      }
    }
  }
  .results-action {
    margin-top: 12px;
  }
</style>

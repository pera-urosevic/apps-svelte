<script lang="ts">
  import ButtonText from '@components/actions/ButtonText.svelte'
  import Checkbox from '@components/forms/Checkbox.svelte'
  import Label from '@components/forms/Label.svelte'
  import { sourceGroups } from '~external/seeker/'
  import { onGroup } from '@pages/seeker/stores/onGroup'
  import { onSource } from '@pages/seeker/stores/onSource'
  import type { TargetObject } from '@pages/seeker/types'

  type Props = {
    target: TargetObject
  }
  let { target }: Props = $props()
</script>

<table class="table">
  <tbody>
    {#each Object.entries(sourceGroups) as [group, sources]}
      <tr>
        <td class="group">
          <ButtonText name={`group-${group}`} onclick={() => onGroup(target, group)}>
            {group}
          </ButtonText>
        </td>
        <td>
          <div class="sources">
            {#each sources as source}
              {@const id = `${group}:${source.name}`}
              <div class="source">
                <Checkbox
                  {id}
                  checked={target.sources.includes(source.name)}
                  onchange={() => onSource(target, source.name)}
                />
                <Label for={id}>{source.name}</Label>
              </div>
            {/each}
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .table {
    width: 100%;
    margin: 4px;
    tr {
      td {
        border-top: 1px solid var(--color-primary-dark);
      }
    }
    td {
      white-space: nowrap;
      padding: 4px 0 4px 0;
    }
    .group {
      vertical-align: top;
      padding-top: 10px;
      padding-right: 12px;
    }
    .sources {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }
    .source {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-right: 8px;
    }
  }
  :global(body.mobile) {
    .sources {
      flex-direction: column;
      align-items: start;
      gap: 6px;
    }
  }
</style>

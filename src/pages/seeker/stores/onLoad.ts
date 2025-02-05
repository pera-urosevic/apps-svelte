import { targets } from '@pages/seeker/stores'
import { parseTargetRecord } from '@pages/seeker/parse'
import { getTargets } from '@pages/seeker/api'

export const onLoad = async () => {
  const targetRecords = await getTargets()
  if (!targetRecords) return
  const targetsNew = targetRecords.map(parseTargetRecord)
  targets.set(targetsNew)
}

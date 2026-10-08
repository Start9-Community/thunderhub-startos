import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_0_18_4_0 } from './v0.18.4_0'
import { v_0_18_4_5 } from './v0.18.4_5'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_0_18_4_5, v_0_18_4_0],
})

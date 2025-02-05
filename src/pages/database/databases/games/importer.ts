import type { DatabaseImporter } from '@pages/database/types'

import * as RAWG from './importer/RAWG'
import * as GiantBomb from './importer/GiantBomb'
import * as IGDB from './importer/IGDB'

const importer: DatabaseImporter = { IGDB, RAWG, GiantBomb }

export default importer

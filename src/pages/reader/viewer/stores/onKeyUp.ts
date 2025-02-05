import { onArticleNext } from '@pages/reader/viewer/stores/onArticleNext'
import { onArticlePrev } from '@pages/reader/viewer/stores/onArticlePrev'
import { onBundleSelectPrev } from '@pages/reader/viewer/stores/onBundleSelectPrev'
import { onBundleSelectNext } from '@pages/reader/viewer/stores/onBundleSelectNext'
import { onArticleOpen } from '@pages/reader/viewer/stores/onOpenArticle'
import { onPurge } from '@pages/reader/viewer/stores/onPurge'

export const onKeyUp = (e: KeyboardEvent) => {
  switch (e.code) {
    case 'KeyW':
      onBundleSelectPrev()
      return
    case 'KeyS':
      onBundleSelectNext()
      return
    case 'KeyA':
      onArticlePrev()
      return
    case 'KeyD':
      onArticleNext()
      return
    case 'Backquote':
      onArticleOpen()
      return
    case 'KeyR':
      onPurge()
      return
  }
}

export type Swipe = 'left' | 'right' | 'up' | 'down'

export const swipe = (node: HTMLElement, fn: (swipe: Swipe) => void) => {

  let start: { x: number, y: number }

  const onTouchStart = (event: TouchEvent) => {
    start = {
      x: event.touches[0].screenX,
      y: event.touches[0].screenY,
    }
  }

  const onTouchEnd = (event: TouchEvent) => {
    if (!start) return
    const end = {
      x: event.changedTouches[0].screenX,
      y: event.changedTouches[0].screenY,
    }
    const deltaX = end.x - start.x
    const deltaY = end.y - start.y
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    if (absDeltaX > absDeltaY && absDeltaX > 100) {
      if (deltaX > 0) {
        fn('right')
      } else {
        fn('left')
      }
    }
    if (absDeltaY > absDeltaX && absDeltaY > 100) {
      if (deltaY > 0) {
        fn('down')
      } else {
        fn('up')
      }
    }
  }

  $effect(() => {
    node.addEventListener('touchstart', onTouchStart)
    node.addEventListener('touchend', onTouchEnd)

    return () => {
      node.removeEventListener('touchstart', onTouchStart)
      node.removeEventListener('touchend', onTouchEnd)
    }
  })
}

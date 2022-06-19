import { RefObject } from 'react'
import useEventListener from '@hooks/eventListener'

type Handler = (event: MouseEvent) => void

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, (event) => {
    const el = ref.current

    if (!el || el.contains(event.target as Node)) {
      return
    }

    handler(event)
  })
}

export default useOnClickOutside

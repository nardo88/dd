import { RefObject, useEffect, useLayoutEffect, useRef } from 'react'

export interface UseInfiniteScrollOption {
  callback?: () => void
  // при появлении этого блока во viewport будет срабатывать триггер
  triggerRef: RefObject<HTMLElement>
  wrapperRef: RefObject<HTMLElement> // блок который будет скролиться
}

export const useInfiniteScroll = ({
  wrapperRef,
  callback,
  triggerRef,
}: UseInfiniteScrollOption) => {
  // Держим актуальный callback в ref, чтобы не пересоздавать observer на каждый рендер
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current
    if (!wrapperElement || !triggerElement || !callback) return

    const options = {
      root: wrapperElement,
      rootMargin: '100px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver(([entrie]) => {
      if (entrie.isIntersecting) {
        callbackRef.current?.()
      }
    }, options)

    observer.observe(triggerElement)

    return () => {
      observer.unobserve(triggerElement)
    }
  }, [wrapperRef, triggerRef])
}

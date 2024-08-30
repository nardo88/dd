import { PointerEvent } from 'react'

export function detectLeftButton(e: PointerEvent) {
  return e?.buttons === 1
}

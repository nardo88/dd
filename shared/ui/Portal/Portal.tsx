import React, { ReactNode, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  appendTo?: HTMLElement
  children: ReactNode
  isFixedBody?: boolean
}

const DEFAULT_Z_INDEX = 1000
let portalAmount = DEFAULT_Z_INDEX

const Portal: React.FC<PortalProps> = (props) => {
  const { children, isFixedBody = true } = props

  const [container, setContainer] = useState<HTMLElement | null>(
    document.getElementById('portal-root')
  )

  useLayoutEffect(() => {
    portalAmount += 10
    if (container?.lastElementChild) {
      const lastElementChild = container.lastElementChild as HTMLElement
      lastElementChild.style.zIndex = String(portalAmount)
    } else {
      setTimeout(() => {
        const c = document.getElementById('portal-root')?.lastElementChild as HTMLElement
        c.style.zIndex = String(portalAmount)
      })
    }
    return (): void => {
      if (isFixedBody) {
        document.querySelectorAll('body').forEach((node) => {
          node.classList.remove('scroll-disabled')
        })
        document.querySelectorAll('.portal-padding, body').forEach((node) => {
          const element = node as HTMLElement
          element.style.removeProperty('padding-right')
        })
      }
    }
  }, [])

  useLayoutEffect(() => {
    if (!container) {
      const cont = document.createElement('div')
      cont.id = 'portal-root'
      setContainer(cont)
      document.body.appendChild(cont)
    }
  }, [])

  if (!container) return null

  return createPortal(children as any, container as HTMLElement)
}

export default Portal

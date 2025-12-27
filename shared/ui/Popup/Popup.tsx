import { type ReactNode, useEffect, useRef } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { CloseIcon } from '@shared/ui/Icons/CloseIcon'
import Portal from '@shared/ui/Portal'
import { Text } from '@shared/ui/Text/Text'

import cls from './Popup.module.scss'

type Props = {
  onClose?: () => void
  getRef?: (ref: HTMLDivElement | null) => void
  getWrapper?: (ref: HTMLDivElement | null) => void
  displayClose?: boolean
  className?: string
  title?: string | ReactNode
  maxWidth?: number
  getHide?: (v: () => void) => void
  children?: ReactNode
  needAnimate?: boolean
}

export const Popup: React.FC<Props> = (props) => {
  const {
    children,
    onClose,
    className,
    title,
    getRef,
    displayClose = true,
    maxWidth,
    getHide,
    getWrapper,
    needAnimate = true,
  } = props

  const overlay = useRef<HTMLDivElement | null>(null)

  const hideModal = () => {
    if (overlay.current && onClose) {
      const target = overlay.current as HTMLDivElement
      target.classList.add(cls.hidePopup)
      setTimeout(() => {
        onClose()
      }, 100)
    }
  }

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hideModal()
      }
    }

    if (getHide) {
      getHide(hideModal)
    }

    document.addEventListener('keydown', listener, false)
    return () => {
      document.removeEventListener('keydown', listener, false)
    }
  }, [])

  return (
    <Portal>
      <div
        onClick={hideModal}
        ref={(r) => {
          overlay.current = r
          getWrapper?.(r)
        }}
        className={classNames(cls.overlay, { [cls.fadeIn]: needAnimate }, [className])}
      >
        <div onClick={(e) => e.stopPropagation()} className={cls.popup} style={{ maxWidth }}>
          {(title || !!onClose) && (
            <div className={cls.popupHead}>
              {typeof title === 'string' && <Text className={cls.title}>{title}</Text>}
              {typeof title === 'object' && title}
              {!!onClose && displayClose && (
                <CloseIcon className={cls.closeBtn} onClick={hideModal} />
              )}
            </div>
          )}
          <div className={cls.content} ref={(ref) => getRef?.(ref)}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}

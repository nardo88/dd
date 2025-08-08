import { FC, PointerEvent, useRef, useState } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { CodeEditor } from '@shared/ui/CodeEditor/CodeEditor'

import cls from './Web.module.scss'

interface IWebProps {
  code?: string
}

export const Web: FC<IWebProps> = (props) => {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [javaScript, setJavaScript] = useState('')

  const container = useRef<HTMLDivElement>(null)
  const htmlRef = useRef<HTMLDivElement>(null)
  const cssRef = useRef<HTMLDivElement>(null)
  const jsRef = useRef<HTMLDivElement>(null)

  const onPointerDown = (ev: PointerEvent, _target: 'html' | 'css') => {
    if (
      ev?.buttons !== 1 ||
      !container.current ||
      !jsRef.current ||
      !htmlRef.current ||
      !cssRef.current
    )
      return

    const target = _target === 'html' ? htmlRef.current : cssRef.current
    const inside = _target === 'html' ? cssRef.current : jsRef.current
    const posX = ev.clientX
    const s = target.getBoundingClientRect()
    const c = inside.getBoundingClientRect()

    function dragMove(event: globalThis.PointerEvent) {
      if (!htmlRef.current) return
      const diff = event.clientX - posX

      target.style.width = `${s.width + diff}px`
      inside.style.width = `${c.width - diff}px`
    }

    document.onpointermove = dragMove

    function dragEnd() {
      document.onpointerup = null
      document.onpointermove = null
    }

    document.onpointerup = dragEnd
  }

  return (
    <div className={cls.web}>
      <div className={cls.codeBlock} ref={container}>
        <div ref={htmlRef} className={classNames(cls.codeSection)}>
          <div className={cls.codeWrapper}>
            <CodeEditor value={html} onChange={setHtml} language="html" />
          </div>
        </div>
        <div
          className={cls.resizer}
          onPointerDown={(e) => onPointerDown(e, 'html')}
          draggable={false}
        />
        <div ref={cssRef} className={classNames(cls.codeSection)}>
          <div className={cls.codeWrapper}>
            <CodeEditor value={css} onChange={setCss} language="css" />
          </div>
        </div>
        <div
          className={cls.resizer}
          onPointerDown={(e) => onPointerDown(e, 'css')}
          draggable={false}
        />
        <div ref={jsRef} className={classNames(cls.codeSection)}>
          <div className={cls.codeWrapper}>
            <CodeEditor value={javaScript} onChange={setJavaScript} language="javascript" />
          </div>
        </div>
      </div>
      <div className={cls.result}>result</div>
    </div>
  )
}

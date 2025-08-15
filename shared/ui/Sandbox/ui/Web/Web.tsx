import { FC, PointerEvent, useEffect, useRef, useState } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { CodeEditor } from '@shared/ui/CodeEditor/CodeEditor'
import { Css } from '@shared/ui/Icons/Css'
import { HTML } from '@shared/ui/Icons/Html'
import { Js } from '@shared/ui/Icons/Js'

import { PreviewFrame } from '../PreviewFrame/PreviewFrame'

import cls from './Web.module.scss'

interface IWebProps {
  code?: string
}

type SectionTypes = 'html' | 'css' | 'js'

export const Web: FC<IWebProps> = (props) => {
  const { code } = props
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [javaScript, setJavaScript] = useState('')
  const [current, setCurrent] = useState<SectionTypes | null>(null)

  const container = useRef<HTMLDivElement>(null)
  const result = useRef<HTMLDivElement>(null)
  const htmlRef = useRef<HTMLDivElement>(null)
  const cssRef = useRef<HTMLDivElement>(null)
  const jsRef = useRef<HTMLDivElement>(null)

  const codeColumnResize = (ev: PointerEvent, _target: 'html' | 'css') => {
    if (
      ev?.buttons !== 1 ||
      !container.current ||
      !jsRef.current ||
      !htmlRef.current ||
      !cssRef.current
    )
      return

    ev.preventDefault()

    const target = _target === 'html' ? htmlRef.current : cssRef.current
    const inside = _target === 'html' ? cssRef.current : jsRef.current
    const wrapper = container.current
    const posX = ev.clientX
    const s = target.getBoundingClientRect()
    const c = inside.getBoundingClientRect()
    const w = wrapper.getBoundingClientRect()

    function dragMove(event: globalThis.PointerEvent) {
      if (!htmlRef.current || event.clientX - w.left < 30 || w.left + w.width - event.clientX < 30)
        return
      const diff = event.clientX - posX
      if (s.width + diff < 30 || c.width - diff < 30) return

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

  const codeBlockResize = (ev: PointerEvent) => {
    if (!container.current || !result.current) return

    ev.preventDefault()
    ;(ev.target as HTMLElement).setPointerCapture(ev.pointerId) // фиксируем указатель
    document.body.style.userSelect = 'none'

    const wrapper = container.current
    const frame = result.current
    const startY = ev.clientY
    const startHeight = wrapper.offsetHeight
    const frameHeight = frame.offsetHeight

    const dragMove = (event: globalThis.PointerEvent) => {
      const dif = event.clientY - startY
      const height = startHeight + dif
      const fHeight = frameHeight - dif
      if (height < 100 || height > 500) return
      wrapper.style.height = `${height}px`
      frame.style.height = `${fHeight}px`
    }

    const dragEnd = () => {
      document.body.style.userSelect = ''
      ;(ev.target as HTMLElement).releasePointerCapture(ev.pointerId)
      window.removeEventListener('pointermove', dragMove)
      window.removeEventListener('pointerup', dragEnd)
      window.removeEventListener('pointercancel', dragEnd)
    }

    window.addEventListener('pointermove', dragMove)
    window.addEventListener('pointerup', dragEnd)
    window.addEventListener('pointercancel', dragEnd)
  }

  const resultBlockResize = (ev: PointerEvent) => {
    if (!result.current) return

    ev.preventDefault()
    ;(ev.target as HTMLElement).setPointerCapture(ev.pointerId) // фиксируем указатель
    document.body.style.userSelect = 'none'

    const wrapper = result.current
    const startY = ev.clientY
    const startHeight = wrapper.offsetHeight

    const dragMove = (event: globalThis.PointerEvent) => {
      const height = startHeight + (event.clientY - startY)
      if (height < 100 || height > 500) return
      wrapper.style.height = `${height}px`
    }

    const dragEnd = () => {
      document.body.style.userSelect = ''
      ;(ev.target as HTMLElement).releasePointerCapture(ev.pointerId)
      window.removeEventListener('pointermove', dragMove)
      window.removeEventListener('pointerup', dragEnd)
      window.removeEventListener('pointercancel', dragEnd)
    }

    window.addEventListener('pointermove', dragMove)
    window.addEventListener('pointerup', dragEnd)
    window.addEventListener('pointercancel', dragEnd)
  }

  const collapseSection = (section: SectionTypes) => {
    setCurrent((p) => (p === section ? null : section))
    //

    //

    // const targetRect = target.getBoundingClientRect()
    //

    // if (targetRect!.width < 35) {
    //
    // } else {
    //   const width = Math.ceil(wrapperRect.width / 3)
    //   cssRef.current.style.width = `${width}px`
    //   jsRef.current.style.width = `${width}px`
    //   htmlRef.current.style.width = `${width}px`
    // }
  }

  useEffect(() => {
    if (!container.current || !htmlRef.current || !cssRef.current || !jsRef.current) return
    const wrapper = container.current
    const wrapperRect = wrapper.getBoundingClientRect()
    if (!current) {
      const width = Math.ceil(wrapperRect.width / 3)
      cssRef.current.style.width = `${width}px`
      jsRef.current.style.width = `${width}px`
      htmlRef.current.style.width = `${width}px`
    } else {
      const map = new Map<string, HTMLDivElement>()
      map.set('html', htmlRef.current)
      map.set('css', cssRef.current)
      map.set('js', jsRef.current)
      const target = map.get(current)
      if (!target) return
      map.delete(current)
      const width = wrapperRect.width - 70
      target.style.width = `${width}px`
      map.forEach((item) => {
        item.style.width = '30px'
      })
    }
  }, [current])

  return (
    <div className={cls.web}>
      <div className={cls.codeBlock} ref={container}>
        <div
          className={cls.resizer}
          onDoubleClick={() => collapseSection('html')}
          draggable={false}
        />
        <div ref={htmlRef} className={classNames(cls.codeSection)}>
          <div className={cls.codeWrapper}>
            <div className={cls.iconWrapper}>
              <span className={cls.stackIcon}>HTML</span>
              <HTML />
            </div>
            <CodeEditor
              className={cls.codeEditor}
              value={html}
              onChange={setHtml}
              language="html"
            />
          </div>
        </div>
        <div
          className={cls.resizer}
          onPointerDown={(e) => codeColumnResize(e, 'html')}
          onDoubleClick={() => collapseSection('css')}
          draggable={false}
        />
        <div ref={cssRef} className={classNames(cls.codeSection)}>
          <div className={cls.codeWrapper}>
            <div className={cls.iconWrapper}>
              <span className={cls.stackIcon}>CSS</span>
              <Css />
            </div>
            <CodeEditor className={cls.codeEditor} value={css} onChange={setCss} language="css" />
          </div>
        </div>
        <div
          className={cls.resizer}
          onPointerDown={(e) => codeColumnResize(e, 'css')}
          onDoubleClick={() => collapseSection('js')}
          draggable={false}
        />
        <div ref={jsRef} className={classNames(cls.codeSection)}>
          <div className={cls.codeWrapper}>
            <div className={cls.iconWrapper}>
              <span className={cls.stackIcon}>JS</span>
              <Js />
            </div>
            <CodeEditor
              className={cls.codeEditor}
              value={javaScript}
              onChange={setJavaScript}
              language="javascript"
            />
          </div>
        </div>
        <div className={cls.resizer} draggable={false} />
      </div>
      <div className={cls.codeResizer} onPointerDown={codeBlockResize} />
      <div className={cls.result} ref={result}>
        <div className={cls.frameWrapper}>
          <PreviewFrame css={css} html={html} javaScript={javaScript} />
        </div>
        <div className={cls.frameResizer} onPointerDown={resultBlockResize} />
      </div>
    </div>
  )
}

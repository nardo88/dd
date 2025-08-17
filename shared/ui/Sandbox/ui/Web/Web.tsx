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

const minMax = {
  html: { min: 25, max: 31 },
  css: { min: 31, max: 37 },
  js: { min: 36 },
}

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

  const codeColumnResize = (ev: PointerEvent, target: 'html' | 'css') => {
    if (
      ev?.buttons !== 1 ||
      !container.current ||
      !jsRef.current ||
      !htmlRef.current ||
      !cssRef.current
    )
      return

    ev.preventDefault()

    const html = htmlRef.current
    const css = cssRef.current
    const js = jsRef.current
    const wrapper = container.current

    html.classList.remove(cls.transition)
    css.classList.remove(cls.transition)
    js.classList.remove(cls.transition)

    const posX = ev.clientX
    const htmlW = html.getBoundingClientRect().width
    const cssW = css.getBoundingClientRect().width
    const jsW = js.getBoundingClientRect().width
    const wrapperW = wrapper.getBoundingClientRect().width

    function dragMove(event: globalThis.PointerEvent) {
      // Разница в процентах
      const percentDiff = ((event.clientX - posX) / wrapperW) * 100
      // разница в пикселях
      const pixelDif = event.clientX - posX
      if (target === 'html') {
        const htmlPercent = (htmlW / wrapperW) * 100
        const cssPercent = (cssW / wrapperW) * 100
        if (htmlW + pixelDif < minMax.html.min) return
        if (cssW - pixelDif < minMax.css.max) {
          const jsPercent = (jsW / wrapperW) * 100
          html.style.width = `${htmlPercent + percentDiff}%`
          js.style.width = `${jsPercent + cssPercent - percentDiff}%`
        } else {
          html.style.width = `${htmlPercent + percentDiff}%`
          css.style.width = `${cssPercent - percentDiff}%`
        }
      }
      if (target === 'css') {
        const cssPercent = (cssW / wrapperW) * 100
        const jsPercent = (jsW / wrapperW) * 100
        const htmlPercent = (htmlW / wrapperW) * 100
        if (jsW - pixelDif < minMax.js.min) return
        js.style.width = `${jsPercent - percentDiff}%`
        if (cssW + pixelDif < minMax.css.min) {
          html.style.width = `${htmlPercent + (percentDiff + cssPercent)}%`
        } else {
          css.style.width = `${cssPercent + percentDiff}%`
        }
      }
    }

    document.onpointermove = dragMove

    function dragEnd() {
      document.onpointerup = null
      document.onpointermove = null

      html.classList.add(cls.transition)
      css.classList.add(cls.transition)
      js.classList.add(cls.transition)
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
  }

  useEffect(() => {
    if (!container.current || !htmlRef.current || !cssRef.current || !jsRef.current) return
    const wrapperW = container.current.getBoundingClientRect().width
    const map = new Map<string, HTMLDivElement>()
    map.set('html', htmlRef.current)
    map.set('css', cssRef.current)
    map.set('js', jsRef.current)
    if (!current) {
      map.forEach((item) => {
        item.style.width = '33.333%'
      })
    } else {
      const target = map.get(current)
      if (!target) return
      map.delete(current)
      const width = wrapperW - 50
      target.style.width = `${width}px`
      map.forEach((item, i) => {
        if (i === 'html') {
          item.style.width = '25px'
        } else {
          item.style.width = '35px'
        }
      })
    }
  }, [current])

  return (
    <div className={cls.web}>
      <div className={cls.codeBlock} ref={container}>
        <div ref={htmlRef} className={classNames(cls.codeSection, {}, [cls.transition])}>
          <div className={cls.codeWrapper}>
            <div className={cls.iconWrapper} onClick={() => collapseSection('html')}>
              <span className={cls.stackIcon}>HTML</span>
              <HTML />
            </div>
            <CodeEditor
              wrapper={container.current}
              className={cls.codeEditor}
              value={html}
              onChange={setHtml}
              language="html"
            />
          </div>
        </div>

        <div ref={cssRef} className={classNames(cls.codeSection, {}, [cls.transition])}>
          <div
            className={classNames(cls.resizer, {}, [cls.columnResizer])}
            onPointerDown={(e) => codeColumnResize(e, 'html')}
            draggable={false}
          />
          <div className={cls.codeWrapper}>
            <div className={cls.iconWrapper} onClick={() => collapseSection('css')}>
              <span className={cls.stackIcon}>CSS</span>
              <Css />
            </div>
            <CodeEditor
              wrapper={container.current}
              className={cls.codeEditor}
              value={css}
              onChange={setCss}
              language="css"
            />
          </div>
        </div>

        <div ref={jsRef} className={classNames(cls.codeSection, {}, [cls.transition])}>
          <div
            className={classNames(cls.resizer, {}, [cls.columnResizer])}
            onPointerDown={(e) => codeColumnResize(e, 'css')}
            draggable={false}
          />
          <div className={cls.codeWrapper}>
            <div className={cls.iconWrapper} onClick={() => collapseSection('js')}>
              <span className={cls.stackIcon}>JS</span>
              <Js />
            </div>
            <CodeEditor
              wrapper={container.current}
              className={cls.codeEditor}
              value={javaScript}
              onChange={setJavaScript}
              language="javascript"
            />
          </div>
        </div>
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

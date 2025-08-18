import { FC, PointerEvent, useEffect, useRef, useState } from 'react'

import { classNames } from '@shared/helpers/classNames'
import useDebounce from '@shared/hooks/useDebounce'
import { CodeEditor } from '@shared/ui/CodeEditor/CodeEditor'
import { Css } from '@shared/ui/Icons/Css'
import { HTML } from '@shared/ui/Icons/Html'
import { Js } from '@shared/ui/Icons/Js'

import { IAllCode } from '../../types'
import { ResultBlock } from '../ResultBlock/ResultBlock'

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
  const [allCode, setAllCode] = useState<IAllCode>({ css, html, javaScript })

  const container = useRef<HTMLDivElement>(null)
  const result = useRef<HTMLDivElement>(null)
  const htmlRef = useRef<HTMLDivElement>(null)
  const cssRef = useRef<HTMLDivElement>(null)
  const jsRef = useRef<HTMLDivElement>(null)
  const web = useRef<HTMLDivElement>(null)

  const changeAllCode = (field: keyof IAllCode, value: string) => {
    setAllCode((p) => ({ ...p, [field]: value }))
  }

  const debounce = useDebounce(changeAllCode, 1000)

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
          const newJsHeight = jsPercent + cssPercent - percentDiff
          if (wrapperW * (newJsHeight / 100) < minMax.js.min) return
          html.style.width = `${htmlPercent + percentDiff}%`
          js.style.width = `${newJsHeight}%`
        } else {
          html.style.width = `${htmlPercent + percentDiff}%`
          css.style.width = `${cssPercent - percentDiff}%`
        }
      }
      if (target === 'css') {
        const cssPercent = (cssW / wrapperW) * 100
        const jsPercent = (jsW / wrapperW) * 100
        const htmlPercent = (htmlW / wrapperW) * 100
        if (jsW - pixelDif < minMax.html.min) return
        js.style.width = `${jsPercent - percentDiff}%`
        if (cssW + pixelDif < minMax.css.max) {
          if (wrapperW * ((htmlPercent + (percentDiff + cssPercent)) / 100) < minMax.html.min)
            return

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

  const resultBlockResize = (ev: PointerEvent) => {
    if (!container.current || !web.current || !result.current) return

    ev.preventDefault()
    ;(ev.target as HTMLElement).setPointerCapture(ev.pointerId) // фиксируем указатель
    document.body.style.userSelect = 'none'

    const wrapper = web.current
    const code = container.current
    const res = result.current

    const startY = ev.clientY

    const wrapperHeight = wrapper.getBoundingClientRect().height
    const codeHeight = code.getBoundingClientRect().height

    const dragMove = (event: globalThis.PointerEvent) => {
      const pixelDif = event.clientY - startY
      const percentDif = (pixelDif / wrapperHeight) * 100

      const codePercent = (codeHeight / wrapperHeight) * 100
      const newCodePercent = codePercent + percentDif
      const newResultPercent = 100 - newCodePercent

      if (wrapperHeight * (newCodePercent / 100) <= 40) return
      if (wrapperHeight * (newResultPercent / 100) <= 33) return

      code.style.height = `${newCodePercent}%`
      res.style.height = `${newResultPercent}%`
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
    <div className={cls.web} ref={web}>
      <div className={cls.code} ref={container}>
        <div className={cls.codeBlock}>
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
                onChange={(value) => {
                  setHtml(value)
                  debounce('html', value)
                }}
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
                onChange={(value) => {
                  setCss(value)
                  debounce('css', value)
                }}
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
                onChange={(value) => {
                  setJavaScript(value)
                  debounce('javaScript', value)
                }}
                language="javascript"
              />
            </div>
          </div>
        </div>
        <div className={cls.rowResizer} onPointerDown={resultBlockResize} />
      </div>
      <ResultBlock ref={result} code={allCode} className={cls.result} />
    </div>
  )
}

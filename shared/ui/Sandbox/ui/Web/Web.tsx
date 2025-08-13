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

const getLogWrapper = (javaScript: string) => `
(function() {
  const methods = ['log', 'error', 'warn', 'info'];
  methods.forEach(method => {
    const original = console[method];
    console[method] = function(...args) {
      window.parent.postMessage({
        type: 'iframe-log',
        level: method,
        args
      }, '*');
      original.apply(console, args);
    };
  });
})();

try {
  ${javaScript}
} catch(e) {
  console.error('Execution error:', e);
}
`

export const Web: FC<IWebProps> = () => {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [javaScript, setJavaScript] = useState('')

  const container = useRef<HTMLDivElement>(null)
  const htmlRef = useRef<HTMLDivElement>(null)
  const cssRef = useRef<HTMLDivElement>(null)
  const jsRef = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)

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
    const wrapper = container.current
    const posX = ev.clientX
    const s = target.getBoundingClientRect()
    const c = inside.getBoundingClientRect()
    const w = wrapper.getBoundingClientRect()

    function dragMove(event: globalThis.PointerEvent) {
      if (!htmlRef.current || event.clientX - w.left < 20 || w.left + w.width - event.clientX < 20)
        return
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

  // useEffect(() => {
  //   if (!frame.current) return

  //   const parser = new DOMParser()
  //   const doc = parser.parseFromString(html, 'text/html')

  //   const style = document.createElement('style')
  //   style.textContent = css

  //   if (!doc.head) {
  //     const head = doc.createElement('head')
  //     doc.documentElement.insertBefore(head, doc.body)
  //   }
  //   doc.head.appendChild(style)

  //   const script = document.createElement('script')
  //   script.textContent = getLogWrapper(javaScript || '')
  //   if (!doc.body) {
  //     const body = doc.createElement('body')
  //     doc.documentElement.appendChild(body)
  //   }
  //   doc.body.appendChild(script)

  //   const serializer = new XMLSerializer()
  //   const finalHtml = serializer.serializeToString(doc)

  //   const blob = new Blob([finalHtml], { type: 'text/html' })
  //   const src = URL.createObjectURL(blob)
  //   frame.current.src = src

  //   return () => {
  //     if (frame.current?.src) URL.revokeObjectURL(frame.current?.src)
  //   }
  // }, [html, css, javaScript])

  return (
    <div className={cls.web}>
      <div className={cls.codeBlock} ref={container}>
        <div ref={htmlRef} className={classNames(cls.codeSection)}>
          <div className={cls.codeWrapper}>
            <div className={cls.iconWrapper}>
              <span className={cls.stackIcon}>
                HTML
                <HTML />
              </span>
            </div>
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
            <div className={cls.iconWrapper}>
              <span className={cls.stackIcon}>
                CSS
                <Css />
              </span>
            </div>
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
            <div className={cls.iconWrapper}>
              <span className={cls.stackIcon}>
                JS
                <Js />
              </span>
            </div>
            <CodeEditor value={javaScript} onChange={setJavaScript} language="javascript" />
          </div>
        </div>
      </div>
      <div className={cls.result}>
        <PreviewFrame css={css} html={html} javaScript={javaScript} />
      </div>
    </div>
  )
}

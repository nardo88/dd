import { useEffect, useRef } from 'react'

import { compileSCSS } from '@shared/helpers/compileSCSS'
import { compileTS } from '@shared/helpers/compileTS'
import { createId } from '@shared/helpers/createId/createId'
import { useAppSelector } from '@shared/hooks/redux'

import { getLogWrapper } from '../../helpers/getLogWrapper'
import { getAllCode, getSettings } from '../../selectors'
import { ILog } from '../../types'

import cls from './PreviewFrame.module.scss'

interface PreviewFrameProps {
  getRef: (ref: HTMLIFrameElement) => void
  addLog: (log: ILog) => void
}

export const PreviewFrame: React.FC<PreviewFrameProps> = (props) => {
  const { getRef, addLog } = props
  const { css, html, javaScript } = useAppSelector(getAllCode)
  const { useTypeScript, useSass } = useAppSelector(getSettings)

  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!frameRef.current) return

    let finalHtml = html

    // Вставляем CSS
    if (css.trim()) {
      const styleTag = `<style>${useSass ? compileSCSS(css) : css}</style>`
      if (finalHtml.includes('</head>')) {
        finalHtml = finalHtml.replace('</head>', `${styleTag}</head>`)
      } else {
        finalHtml = styleTag + finalHtml
      }
    }

    // Вставляем JS с логгером
    if (javaScript.trim()) {
      const scriptTag = `<script>${getLogWrapper(useTypeScript ? compileTS(javaScript) : javaScript)}</script>`
      if (finalHtml.includes('</body>')) {
        finalHtml = finalHtml.replace('</body>', `${scriptTag}</body>`)
      } else {
        finalHtml += scriptTag
      }
    }

    // Загружаем в iframe через Blob, чтобы скрипты работали нормально
    const blob = new Blob([finalHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    frameRef.current.src = url

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [html, css, javaScript, useTypeScript, useSass])

  // Приём сообщений из iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const { source, _level, args, message } = e.data || {}
      if (source === 'iframe-log' && args?.length) {
        addLog({
          id: createId(),
          type: 'info',
          message: args.join(),
        })
      }
      if (source === 'iframe-error') {
        addLog({
          id: createId(),
          type: 'error',
          message,
        })
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  useEffect(() => {
    if (!frameRef.current) return
    getRef(frameRef.current)
  }, [frameRef.current])

  return (
    <iframe
      className={cls.frame}
      ref={frameRef}
      style={{ width: '100%', border: 'none', minHeight: 0 }}
    />
  )
}

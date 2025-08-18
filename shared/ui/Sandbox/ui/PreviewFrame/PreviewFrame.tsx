import { useEffect, useRef } from 'react'

interface PreviewFrameProps {
  html: string // Полный HTML пользователя
  css: string // CSS пользователя
  javaScript: string // JS пользователя
  className?: string
  getRef: (ref: HTMLIFrameElement) => void
}

export const PreviewFrame: React.FC<PreviewFrameProps> = (props) => {
  const { html, css, javaScript, className, getRef } = props

  const frameRef = useRef<HTMLIFrameElement>(null)

  // Функция для обёртки JS с логированием
  const getLogWrapper = (code: string) => `
    (function() {
      const serialize = (value) => {
        if (value instanceof Element) return value.outerHTML;
        try { return JSON.stringify(value); } catch { return String(value); }
      };

      ['log','info','warn','error'].forEach(level => {
        const orig = console[level]?.bind(console);
        console[level] = (...args) => {
          const serializedArgs = args.map(serialize);
          window.parent.postMessage({ source: 'iframe-log', level, args: serializedArgs }, '*');
          orig?.(...args);
        }
      });

      window.addEventListener('error', e => {
        window.parent.postMessage({ source: 'iframe-error', message: e.message }, '*');
      });
      window.addEventListener('unhandledrejection', e => {
        window.parent.postMessage({ source: 'iframe-error', message: e.reason?.toString() }, '*');
      });

      try {
        ${code}
      } catch (e) {
        console.error(e);
        window.parent.postMessage({ source: 'iframe-error', message: e.message }, '*');
      }
    })();
  `

  useEffect(() => {
    if (!frameRef.current) return

    let finalHtml = html

    // Вставляем CSS
    if (css.trim()) {
      const styleTag = `<style>${css}</style>`
      if (finalHtml.includes('</head>')) {
        finalHtml = finalHtml.replace('</head>', `${styleTag}</head>`)
      } else {
        finalHtml = styleTag + finalHtml
      }
    }

    // Вставляем JS с логгером
    if (javaScript.trim()) {
      const scriptTag = `<script>${getLogWrapper(javaScript)}</script>`
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
  }, [html, css, javaScript])

  // Приём сообщений из iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const { source, level, args, message } = e.data || {}
      if (source === 'iframe-log') {
        console.log(...args)
        // ;(console[level as keyof Console] ?? console.log)('[iframe log]', ...args)
      }
      if (source === 'iframe-error') {
        console.error('[iframe error]', message)
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
      className={className}
      ref={frameRef}
      style={{ width: '100%', border: 'none', minHeight: 0 }}
    />
  )
}

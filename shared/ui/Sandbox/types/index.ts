export interface IExecutorStrategy {
  init: () => void
  run: (code: string) => Promise<string>
}

export interface IAllCode {
  javaScript: string
  html: string
  css: string
}

export interface ILog {
  type: 'info' | 'error'
  message: string
  id: string
}

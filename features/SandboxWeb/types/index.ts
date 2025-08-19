export type SectionTypes = 'html' | 'css' | 'js'

export interface IWebCode {
  javaScript: string
  html: string
  css: string
}

export interface ILog {
  type: 'info' | 'error'
  message: string
  id: string
}

export interface SandboxWebState {
  code: IWebCode
  allCode: IWebCode
  current: null | SectionTypes
  showTerminal: boolean
  logs: ILog[]
}

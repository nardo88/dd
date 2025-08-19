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

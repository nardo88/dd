export interface ISandboxSettings {
  useTypeScript: boolean
  useSass: boolean
  useReact: boolean
}

export interface ISandbox {
  _id: string
  title: string
  userId: string
  html: string
  js: string
  css: string
  settings: ISandboxSettings
  createdAt: number
  updatedAt: number
}

import { ISettings, IWebCode } from '../types'

export const defaultCode: IWebCode = { css: '', html: '', javaScript: '' }

export const defaultSettings: ISettings = {
  useTypeScript: false,
  useSass: false,
  useReact: false,
}

export const minMax = {
  html: { min: 25, max: 31 },
  css: { min: 31, max: 37 },
  js: { min: 36 },
}

export const reactRender = '\nReactDOM.createRoot(document.getElementById("root")).render(<App />)'

import { compileString } from 'sass'

export const compileSCSS = (code: string): string => {
  try {
    const result = compileString(code)
    return result.css
  } catch (e) {
    return ''
  }
}

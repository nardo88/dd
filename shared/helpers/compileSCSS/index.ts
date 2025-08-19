import { compileString } from 'sass'

export const compileSCSS = (code: string): string => {
  const result = compileString(code)
  return result.css
}

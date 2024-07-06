export const UNMISTAKABLE_CHARS =
  '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz'

const choice = (string: string): string => {
  const index = Math.floor(Math.random() * string.length)
  return string.substr(index, 1)
}

export const randomString = (charsCount: number, alphabet: string): string => {
  let result = ''
  for (let i = 0; i < charsCount; i++) {
    result += choice(alphabet)
  }
  return result
}

export const createId = () => randomString(17, UNMISTAKABLE_CHARS)

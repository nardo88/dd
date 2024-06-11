export function getShortString(text: string, limit: number) {
  let newText = String(text).trim()

  if (newText.length <= limit) return newText

  newText = newText.slice(0, limit)

  return newText + '...'
}

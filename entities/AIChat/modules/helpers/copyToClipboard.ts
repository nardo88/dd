import { marked } from 'marked'

import { IAIMessage } from '@shared/types/aiMessages'

import { getTextFromMessage } from './getTextFromMessage'

export const copyToClipboard = async (msg: IAIMessage, cb: (id: boolean) => void) => {
  const markdownText = getTextFromMessage(msg)
  const html = marked.parse(markdownText) as string

  const plainText = markdownText
    .replace(/#{1,6}\s?/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[-*+]\s?/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim()

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
      }),
    ])
  } catch {
    await navigator.clipboard.writeText(plainText)
  }

  cb(true)
  setTimeout(() => cb(false), 2000)
}

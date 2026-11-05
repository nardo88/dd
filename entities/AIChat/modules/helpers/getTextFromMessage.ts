import { IAIMessage } from '@shared/types/aiMessages'

export const getTextFromMessage = (msg: IAIMessage): string => {
  return (
    msg.parts
      ?.filter((part) => part.type === 'text')
      .map((part) => (part as { text: string }).text)
      .join('') || ''
  )
}

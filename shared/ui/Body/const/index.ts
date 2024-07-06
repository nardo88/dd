import { BodyItemType } from '../types'

export const bodyVariantsTitle: Record<BodyItemType, string> = {
  text: 'Текст',
  image: 'Изображение',
  markdown: 'MarkDown',
  video: 'Видео',
  file: 'Файл',
  frame: 'Фрейм',
  code: 'Код',
}

export const variants: Array<{ id: BodyItemType; title: string }> = [
  { id: 'text', title: 'Текст' },
  { id: 'image', title: 'Изображение' },
  { id: 'markdown', title: 'MarkDown' },
  { id: 'video', title: 'Видео' },
  { id: 'file', title: 'Файл' },
  { id: 'frame', title: 'Фрейм' },
  { id: 'code', title: 'Код' },
]

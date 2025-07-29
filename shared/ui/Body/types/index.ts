import { LanguageVariants } from '@shared/types/body'

export type BodyItemType =
  | 'markdown'
  | 'text'
  | 'image'
  | 'video'
  | 'file'
  | 'frame'
  | 'code'
  | 'terminal'

export interface IBodySetting {
  language?: LanguageVariants
  needTerminal?: boolean
  canEdit?: boolean
}

export interface IBody {
  _id: string
  type: BodyItemType
  value: string
  settings?: IBodySetting
}

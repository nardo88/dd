import { LanguagesType } from '@shared/ui/CodeEditor/CodeEditor'

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
  language?: LanguagesType
  needTerminal?: boolean
  canEdit?: boolean
}

export interface IBody {
  _id: string
  type: BodyItemType
  value: string
  settings?: IBodySetting
}

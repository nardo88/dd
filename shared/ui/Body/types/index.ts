import { SandboxStacks } from '@shared/ui/Sandbox'

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
  language?: SandboxStacks
  needTerminal?: boolean
  canEdit?: boolean
}

export interface IBody {
  _id: string
  type: BodyItemType
  value: string
  settings?: IBodySetting
}

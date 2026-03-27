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
  | 'anchor'

export type AnchorType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

export interface IBodySetting {
  language?: SandboxStacks
  needTerminal?: boolean
  canEdit?: boolean
  anchorType?: AnchorType
}

export interface IBody {
  _id: string
  type: BodyItemType
  value: string
  settings?: IBodySetting
}

export type BodyItemType =
  | 'markdown'
  | 'text'
  | 'image'
  | 'video'
  | 'file'
  | 'frame'
  | 'code'
  | 'terminal'

export interface IBody {
  _id: string
  type: BodyItemType
  value: string
}

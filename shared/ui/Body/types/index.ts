export type BodyItemType =
  | 'markdown'
  | 'text'
  | 'image'
  | 'video'
  | 'file'
  | 'frame'
  | 'code'

export interface IBody {
  _id: string
  type: BodyItemType
  value: string
}

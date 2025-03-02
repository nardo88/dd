import { IBody } from '@shared/ui/Body'

export interface IArticle {
  _id: string
  title: string
  userId: string
  category: string
  description: string
  image: string
  body: IBody[]
  order: number
  createdAt: number
  updatedAt: number
}

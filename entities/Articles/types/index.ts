export interface IBody {
  _id: string
  type: string
  value: string
}

export interface IArticle {
  _id: string
  title: string
  userId: string
  category: string
  description: string
  image: string
  body: IBody[]
  createdAt: number
  updatedAt: number
}

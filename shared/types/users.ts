export interface UsersType {
  _id: string
  email: string
  profile: {
    name: string
    surname: string
    middlename: string
  }
  roles: string[]
}

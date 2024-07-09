import { IValidateData, IValidateErrors } from '../../types'

export const validate = (data: IValidateData): null | IValidateErrors => {
  const { body, category, title } = data
  const result: IValidateErrors = {}

  if (!title.trim()) {
    result.title = 'Необходимо указать заголовок'
  }

  if (!category || !category.trim()) {
    result.category = 'Необходимо указать категорию'
  }

  if (body.some((i) => !i.value.trim())) {
    result.body = 'Есть незаполненные поля в содержимом статьи'
  }
  return Object.keys(result).length ? result : null
}

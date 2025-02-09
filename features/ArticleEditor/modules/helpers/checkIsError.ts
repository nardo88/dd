import { IValidateErrors } from '@features/ArticleEditor/types'

export const checkIsError = (
  type: 'settings' | 'content',
  validate: IValidateErrors | null
): boolean => {
  if (type === 'content') return !!validate?.body
  if (type === 'settings') return !!validate?.title || !!validate?.category
  return false
}

import { useAppSelector } from '@shared/hooks/redux'
import { getValidate } from '../selectors'

export const checkIsError = (type: 'settings' | 'content'): boolean => {
  const validate = useAppSelector(getValidate)
  if (type === 'content') return !!validate?.body
  if (type === 'settings') return !!validate?.title || !!validate?.category
  return false
}

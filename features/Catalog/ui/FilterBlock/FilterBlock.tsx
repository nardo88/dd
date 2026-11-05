import { FC, useState } from 'react'

import { useAppDispatch } from '@shared/hooks/redux'
import useDebounce from '@shared/hooks/useDebounce'
import { Input } from '@shared/ui/Input/Input'

import { catalogAction } from '../../modules/slice'

import cls from './FilterBlock.module.scss'

export const FilterBlock: FC = () => {
  const [title, setTitle] = useState('')
  const dispatch = useAppDispatch()

  const debounce = useDebounce((v: string) => {
    dispatch(catalogAction.changeTitleFilter(v))
  }, 400)

  return (
    <div className={cls.FilterBlock}>
      <Input
        value={title}
        onChange={(v) => {
          setTitle(v)
          debounce(v)
        }}
        label="Название статьи"
      />
    </div>
  )
}

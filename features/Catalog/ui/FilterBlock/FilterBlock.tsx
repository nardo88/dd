import { FC, useState } from 'react'
import cls from './FilterBlock.module.scss'
import { useAppDispatch } from '@shared/hooks/redux'
import { Input } from '@shared/ui/Input'
import useDebounce from '@shared/hooks/useDebounce'
import { catalogAction } from '../../modules/slice'

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

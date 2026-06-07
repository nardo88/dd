import { FC, useState } from 'react'

import { useAppDispatch } from '@shared/hooks/redux'
import useDebounce from '@shared/hooks/useDebounce'
import { Input } from '@shared/ui/Input'

import { actions } from '../../slice'

import cls from './FilterBlock.module.scss'

export const FilterBlock: FC = () => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState('')

  const debounce = useDebounce((value: string) => dispatch(actions.setFilter(value)), 300)

  return (
    <div className={cls.filterBlock}>
      <Input
        value={value}
        onChange={(val) => {
          setValue(val)
          debounce(val)
        }}
        placeholder="ФИО / email / id"
      />
    </div>
  )
}

import { FC, useState } from 'react'
import cls from './FilterBlock.module.scss'
import { OptionType, Select } from '@shared/ui/Select/Select'
import { categories } from '@shared/consts/categories'
import { Input } from '@shared/ui/Input'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getCategoryFilter, getTitleFilter } from '../../selectors'
import useDebounce from '@shared/hooks/useDebounce'
import { articleManagerAction } from '../../slice'
import { Button } from '@shared/ui/Button/Button'

interface FilterBlockProps {
  className?: string
}

export const FilterBlock: FC<FilterBlockProps> = (props) => {
  const { className } = props
  const [filter, setFilter] = useState('')
  const dispatch = useAppDispatch()
  const title = useAppSelector(getTitleFilter)
  const category = useAppSelector(getCategoryFilter)

  const debounce = useDebounce((v: string) => {
    dispatch(articleManagerAction.changeTitleFilter(v))
  }, 300)

  const changeCategory = (v: OptionType) => {
    dispatch(articleManagerAction.changeCategoryFilter(v))
  }

  const resetFilter = () => {
    setFilter('')
    dispatch(articleManagerAction.resetFilter())
  }

  return (
    <div className={cls.FilterBlock}>
      <Select
        label="Категория"
        options={categories}
        className={cls.category}
        value={category}
        onChange={changeCategory}
      />
      <Input
        label="Заголовок"
        value={filter}
        onChange={(v) => {
          setFilter(v)
          debounce(v)
        }}
      />
      <Button onClick={resetFilter}>Сбросить фильтры</Button>
    </div>
  )
}

import { FC } from 'react'
import cls from './Settings.module.scss'
import { OptionType, Select } from '@shared/ui/Select/Select'
import { categories } from '@shared/consts/categories'
import { Input } from '@shared/ui/Input'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getCategory, getDescription, getTitle } from '../../modules/selectors'
import { articleEditorAction } from '../../modules/slice'

interface SettingsProps {
  className?: string
}

export const Settings: FC<SettingsProps> = () => {
  const category = useAppSelector(getCategory)
  const title = useAppSelector(getTitle)
  const description = useAppSelector(getDescription)
  const dispatch = useAppDispatch()

  const changeCategory = (v: OptionType) =>
    dispatch(articleEditorAction.setCategory(v.id))

  const changeTitle = (v: string) => dispatch(articleEditorAction.setTitle(v))
  const changeDescription = (v: string) =>
    dispatch(articleEditorAction.setDescription(v))

  return (
    <div className={cls.Settings}>
      <Select
        label="Категория"
        options={categories}
        value={categories.find((i) => i.id === category)}
        onChange={changeCategory}
      />
      <Input value={title} label="Заголовок" onChange={changeTitle} />
      <Input
        value={description}
        label="Краткое описание"
        onChange={changeDescription}
      />
    </div>
  )
}

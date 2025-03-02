import { FC } from 'react'
import cls from './Settings.module.scss'
import { OptionType, Select } from '@shared/ui/Select/Select'
import { categories } from '@shared/consts/categories'
import { Input, InputTypes } from '@shared/ui/Input'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getCategory, getDescription, getImage, getOrder, getTitle } from '../../modules/selectors'
import { articleEditorAction } from '../../modules/slice'
import { InputFile } from '@shared/ui/InputFile/InputFile'

interface SettingsProps {
  className?: string
}

export const Settings: FC<SettingsProps> = () => {
  const category = useAppSelector(getCategory)
  const title = useAppSelector(getTitle)
  const description = useAppSelector(getDescription)
  const image = useAppSelector(getImage)
  const order = useAppSelector(getOrder)
  const dispatch = useAppDispatch()

  const changeCategory = (v: OptionType) => {
    dispatch(articleEditorAction.setCategory(v.id))
  }

  const changeTitle = (v: string) => {
    dispatch(articleEditorAction.setTitle(v))
  }

  const changeDescription = (v: string) => {
    dispatch(articleEditorAction.setDescription(v))
  }

  const changeImage = (v: string) => {
    dispatch(articleEditorAction.setImage(v))
  }
  const changeOrder = (v: string) => {
    if (Number(v) <= 0) return
    dispatch(articleEditorAction.setOrder(v))
  }

  return (
    <div className={cls.Settings}>
      <Select
        label="Категория"
        options={categories}
        value={categories.find((i) => i.id === category)}
        onChange={changeCategory}
      />
      <Input value={title} label="Заголовок" onChange={changeTitle} />
      <Input value={description} label="Краткое описание" onChange={changeDescription} />
      <Input
        value={order}
        type={InputTypes.NUMBER}
        label="Порядковый номер"
        onChange={changeOrder}
      />
      <InputFile
        label="Обложка"
        type="image"
        url={image}
        onChange={changeImage}
        remove={() => dispatch(articleEditorAction.setImage(null))}
      />
    </div>
  )
}

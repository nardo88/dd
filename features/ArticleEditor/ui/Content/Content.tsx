import { useRouter } from 'next/router'
import { FC } from 'react'

import { useNotification } from '@entities/Notifications'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { BodyInput, IBody } from '@shared/ui/Body'
import { Button } from '@shared/ui/Button/Button'

import { create } from '../../modules/asyncThunks/create'
import { update } from '../../modules/asyncThunks/update'
import { validate } from '../../modules/helpers/validate'
import { getBody, getCategory, getTitle } from '../../modules/selectors'
import { articleEditorAction } from '../../modules/slice'

import cls from './Content.module.scss'

export const Content: FC<{ id?: string }> = ({ id }) => {
  const { addNotification } = useNotification()

  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const body = useAppSelector(getBody)
  const category = useAppSelector(getCategory)
  const title = useAppSelector(getTitle)

  const changeBody = (val: IBody[]) => {
    dispatch(articleEditorAction.setBody(val))
  }

  const save = () => {
    dispatch(articleEditorAction.setValidate(null))
    const result = validate({ body, category, title })
    if (result) return dispatch(articleEditorAction.setValidate(result))
    if (id) {
      dispatch(update({ id, addNotification }))
    } else {
      dispatch(create({ push, addNotification }))
    }
  }

  const preview = () => {
    window.open(`/article/${id}`)
  }

  return (
    <div className={cls.Content}>
      <div className={cls.top}>
        <Button className={cls.saveBtn} onClick={preview}>
          Предпросмотр
        </Button>
        <Button className={cls.saveBtn} onClick={save}>
          Сохранить
        </Button>
      </div>
      <BodyInput body={body} onChange={changeBody} className={cls.body} />
    </div>
  )
}

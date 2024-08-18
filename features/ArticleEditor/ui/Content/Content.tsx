import { FC } from 'react'
import { Button } from '@shared/ui/Button/Button'
import { BodyInput, IBody } from '@shared/ui/Body'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getBody, getCategory, getTitle } from '../../modules/selectors'
import { articleEditorAction } from '../../modules/slice'
import { validate } from '../../modules/helpers/validate'
import { create } from '../../modules/asyncThunks/create'
import { useRouter } from 'next/router'
import { update } from '../../modules/asyncThunks/update'
import cls from './Content.module.scss'
import { useNotification } from '@entities/Notifications'

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
      dispatch(create({ push }))
    }
  }

  return (
    <div className={cls.Content}>
      <div className={cls.top}>
        <Button className={cls.saveBtn} onClick={save}>
          Сохранить
        </Button>
      </div>
      <BodyInput body={body} onChange={changeBody} className={cls.body} />
    </div>
  )
}

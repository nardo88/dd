import { FC } from 'react'
import { Button } from '@shared/ui/Button/Button'
import { BodyInput, IBody } from '@shared/ui/Body'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getBody, getCategory, getTitle } from '../../modules/selectors'
import { articleEditorAction } from '../../modules/slice'
import { validate } from '../../modules/helpers/validate'
import cls from './Content.module.scss'

export const Content: FC = () => {
  const dispatch = useAppDispatch()
  const body = useAppSelector(getBody)
  const category = useAppSelector(getCategory)
  const title = useAppSelector(getTitle)

  const changeBody = (val: IBody[]) => {
    dispatch(articleEditorAction.setBody(val))
  }

  const save = () => {
    dispatch(articleEditorAction.setValidate(null))
    const result = validate({ body, category, title })
    if (result) return dispatch(articleEditorAction.setValidate(null))
  }

  return (
    <div className={cls.Content}>
      <div className={cls.top}>
        <Button className={cls.saveBtn} onClick={save}>
          Сохранить
        </Button>
      </div>
      <BodyInput body={body} onChange={changeBody} />
    </div>
  )
}

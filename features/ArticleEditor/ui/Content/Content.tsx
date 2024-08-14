import { FC } from 'react'
import { Button } from '@shared/ui/Button/Button'
import { BodyInput, IBody } from '@shared/ui/Body'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getBody, getCategory, getTitle } from '../../modules/selectors'
import { articleEditorAction } from '../../modules/slice'
import { validate } from '../../modules/helpers/validate'
import { saveArticle } from '../../modules/asyncThunks/saveArticle'
import cls from './Content.module.scss'
import { useRouter } from 'next/router'

export const Content: FC<{ id?: string }> = ({ id }) => {
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
    dispatch(saveArticle({ id, push }))
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

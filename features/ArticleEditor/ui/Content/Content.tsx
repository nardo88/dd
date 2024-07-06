import { FC } from 'react'
import { Button } from '@shared/ui/Button/Button'
import { BodyInput, IBody } from '@shared/ui/Body'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getBody } from '../../modules/selectors'
import { articleEditorAction } from '../../modules/slice'
import cls from './Content.module.scss'

export const Content: FC = () => {
  const dispatch = useAppDispatch()
  const body = useAppSelector(getBody)

  const changeBody = (val: IBody[]) =>
    dispatch(articleEditorAction.setBody(val))
  return (
    <div className={cls.Content}>
      <div className={cls.top}>
        <Button className={cls.saveBtn}>Сохранить</Button>
      </div>
      <BodyInput body={body} onChange={changeBody} />
    </div>
  )
}

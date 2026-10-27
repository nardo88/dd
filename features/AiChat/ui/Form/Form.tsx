import { FC } from 'react'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { SendIcon } from '@shared/ui/Icons/SendIcon'
import { Input } from '@shared/ui/Input'

import { getMessage } from '../../modules/selectors'
import { actions } from '../../modules/slice'

import cls from './Form.module.scss'

export const Form: FC = () => {
  const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)

  const changeHandler = (v: string) => dispatch(actions.setMessage(v))
  return (
    <form className={cls.form}>
      <Input
        placeholder="Введите сообщение..."
        className={cls.input}
        value={message}
        onChange={changeHandler}
      />
      <Button className={cls.btn} type="submit">
        <SendIcon />
      </Button>
    </form>
  )
}

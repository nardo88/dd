import { FC, FormEvent, useRef } from 'react'

import { sendMessage } from '@entities/AIChat/modules/asyncThunks/sendMessage'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { useFetchWithAuth } from '@shared/hooks/useFetchWithAuth'
import { Button } from '@shared/ui/Button/Button'
import { SendIcon } from '@shared/ui/Icons/SendIcon'
import { Textarea } from '@shared/ui/Textarea/Textarea'

import { getMessage, getSessionId } from '../../modules/selectors'
import { actions } from '../../modules/slice'

import cls from './Form.module.scss'

interface IProps {
  scrollToBottom: () => void
}

export const Form: FC<IProps> = (props) => {
  const { scrollToBottom } = props
  const dispatch = useAppDispatch()
  const fetchWithAuth = useFetchWithAuth()

  const message = useAppSelector(getMessage)
  const sessionId = useAppSelector(getSessionId)

  const ref = useRef<HTMLFormElement>(null)

  const changeHandler = (v: string) => dispatch(actions.setMessage(v))

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (!sessionId) return
    if (!message?.trim()) return

    dispatch(sendMessage({ fetchWithAuth, scrollToBottom }))
  }

  return (
    <form ref={ref} className={cls.form} onSubmit={submitHandler}>
      <Textarea
        placeholder="Введите сообщение..."
        className={cls.input}
        value={message}
        onChange={changeHandler}
        maxRows={2}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && ref.current) {
            ref.current.requestSubmit()
          }
        }}
      />
      <Button className={cls.btn} type="submit">
        <SendIcon />
      </Button>
    </form>
  )
}

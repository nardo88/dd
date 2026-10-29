import { FC, FormEvent, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { useFetchWithAuth } from '@shared/hooks/useFetchWithAuth'
import { Button } from '@shared/ui/Button/Button'
import { SendIcon } from '@shared/ui/Icons/SendIcon'
import { Textarea } from '@shared/ui/Textarea/Textarea'

import { getMessage, getSessionId } from '../../modules/selectors'
import { actions } from '../../modules/slice'

import cls from './Form.module.scss'

export const Form: FC = () => {
  const dispatch = useAppDispatch()
  const fetchWithAuth = useFetchWithAuth()

  const message = useAppSelector(getMessage)
  const sessionId = useAppSelector(getSessionId)

  const [streaming, setStreaming] = useState<string>('')
  console.log('streaming: ', streaming)

  const abortController = useRef<AbortController | null>(null)

  const changeHandler = (v: string) => dispatch(actions.setMessage(v))

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (!sessionId) return
    if (!message?.trim()) return

    const controller = new AbortController()
    abortController.current = controller
    setStreaming('')
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_HOST_API}/ai/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message, sessionId }),
        signal: controller.signal,
      })

      if (!response.ok) throw new Error('Request failed')
      if (!response.body) throw new Error('No response body')

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
      let buffer = ''
      let textBuffer = ''
      let notDone = true
      let toolData: unknown = null

      while (notDone) {
        const { done, value } = await reader.read()
        if (done) {
          notDone = false
          break
        }
        buffer += value

        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.trim()) continue

          let event
          try {
            event = JSON.parse(line)
          } catch (e) {
            continue
          }

          switch (event.type) {
            case 'text':
              textBuffer += event.delta
              setStreaming(textBuffer)
              break

            case 'tool_call':
              break

            case 'tool_result':
              toolData = event.result
              break
          }
        }
      }
      setStreaming('')
    } catch (e) {
      console.error('Error from fetch', e)
    }
  }

  return (
    <form className={cls.form} onSubmit={submitHandler}>
      <Textarea
        placeholder="Введите сообщение..."
        className={cls.input}
        value={message}
        onChange={changeHandler}
        maxRows={2}
      />
      <Button className={cls.btn} type="submit">
        <SendIcon />
      </Button>
    </form>
  )
}

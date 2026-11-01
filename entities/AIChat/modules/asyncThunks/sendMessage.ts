import { StateSchema } from '@app/redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { createId } from '@shared/helpers/createId/createId'
import { FetchType } from '@shared/hooks/useFetchWithAuth'
import { IAIMessage } from '@shared/types/aiMessages'

import { AiChatState } from '../../types'
import { actions } from '../slice'

interface IOutputData {
  text: string
  id: string
}

interface IInput {
  fetchWithAuth: FetchType
  scrollToBottom: () => void
}

export const sendMessage = createAsyncThunk<IOutputData, IInput, { rejectValue: string }>(
  'sendMessage',
  async ({ fetchWithAuth, scrollToBottom }, thunkApi) => {
    try {
      const _state = thunkApi.getState() as StateSchema
      const state = _state.aiChat as AiChatState

      const controller = new AbortController()

      const id = createId()

      const assistantMessage: IAIMessage = {
        _id: id,
        role: 'assistant',
        parts: [{ type: 'text', text: '' }],
        sessionId: state.sessionId!,
        createdAt: dayjs().valueOf(),
        updatedAt: dayjs().valueOf(),
      }

      thunkApi.dispatch(
        actions.addMessage([
          {
            _id: createId(),
            role: 'user',
            parts: [{ type: 'text', text: state.message }],
            sessionId: state.sessionId!,
            createdAt: dayjs().valueOf(),
            updatedAt: dayjs().valueOf(),
          },
          assistantMessage,
        ])
      )
      thunkApi.dispatch(actions.setMessage(''))
      thunkApi.dispatch(actions.setStreaming(''))
      scrollToBottom()

      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_HOST_API}/ai/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: state.message, sessionId: state.sessionId }),
        signal: controller.signal,
      })

      if (!response.ok) throw new Error('Request failed')
      if (!response.body) throw new Error('No response body')

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
      let buffer = ''
      let textBuffer = ''
      let notDone = true

      thunkApi.dispatch(actions.setStatus('streaming'))

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
              thunkApi.dispatch(actions.setStreaming(textBuffer))
              break

            case 'tool_call':
              break

            // case 'tool_result':
            //   toolData = event.result
            //   break
          }
        }
      }

      return thunkApi.fulfillWithValue({ text: textBuffer, id })
    } catch (e: any) {
      return thunkApi.rejectWithValue(e)
    } finally {
      setTimeout(() => {
        scrollToBottom()
      })
    }
  }
)

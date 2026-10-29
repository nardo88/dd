import { useCallback } from 'react'

import { store } from '@app/redux'
import { sessionAction } from '@entities/User'
import { AxiosError } from 'axios'

import { api } from '@shared/libs/axios'

type QueueItemType = { resolve: (token: string) => void; reject: (err: unknown) => void }

let isRefreshing = false
let failedQueue: QueueItemType[] = []

const processQueue = (token: string | null, error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token!)
  })
  failedQueue = []
}

async function refreshAccessToken(): Promise<string> {
  return await api.get('/session/refresh-token', { withCredentials: true })
}

export const useFetchWithAuth = () =>
  useCallback(async (url: string, options: RequestInit = {}) => {
    if (isRefreshing) {
      await new Promise<string>((resolve, reject) => {
        if (isRefreshing) {
          failedQueue.push({ resolve, reject })
          return
        }
        isRefreshing = true

        refreshAccessToken()
          .then((newToken) => {
            processQueue(newToken, null)
            resolve(newToken)
          })
          .catch((err) => {
            processQueue(null, err)
            store.dispatch(sessionAction.logout())
            reject(err)
          })
          .finally(() => (isRefreshing = false))
      })
    }

    let response = await fetch(url, { ...options, credentials: 'include' })

    if (response.status === 401) {
      try {
        await refreshAccessToken()
        response = await fetch(url, { ...options, credentials: 'include' })
      } catch {
        store.dispatch(sessionAction.logout())
      }
    }

    // Для совместимости с ErrorType преобразуем ошибку в AxiosError
    if (!response.ok) {
      const data = await response.text()
      throw { response: { status: response.status, data }, isAxiosError: true } as AxiosError
    }

    return response
  }, [])

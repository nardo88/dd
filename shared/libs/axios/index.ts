import { USER_TOKEN_KEY } from '@shared/consts/localStorage'
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API,
  headers: {
    'Cache-Control': 'no-cache',
  },
  timeout: 10000,
})

api.interceptors.request.use((config: any) => {
  if (typeof window !== 'undefined' && localStorage.getItem(USER_TOKEN_KEY)) {
    config.headers.Authorization =
      'Bearer ' + localStorage.getItem(USER_TOKEN_KEY)
  }
  return config
})

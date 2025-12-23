import { store } from '@app/redux'
import { sessionAction } from '@entities/User'
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API,
  headers: { 'Cache-Control': 'no-cache' },
  timeout: 10000,
  withCredentials: true,
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    // Получаем config axios
    const originalRequest = error.config
    // Если пришел 401 статус - перехватываем
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/session/refresh-token')
    ) {
      // originalRequest._retry = true -защита от цикла (что есть refresh тоже вернет 401)
      originalRequest._retry = true

      try {
        await api.get('/session/refresh-token', { withCredentials: true })
        // повторяем запрос если refresh вернул новую пару
        return api(originalRequest)
      } catch (err) {
        store.dispatch(sessionAction.logout())
        return Promise.reject(err)
      }
    }
    // Для всех других ошибок возвращаем текущую ошибку
    return Promise.reject(error)
  }
)

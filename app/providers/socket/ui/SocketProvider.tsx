import { ReactNode, useEffect, useState } from 'react'
import { SocketContext } from './SocketContext'
import { useAppSelector } from '@shared/hooks/redux'
import { getSessionData } from '@entities/User'
import { Socket, io } from 'socket.io-client'

const SOCKET_URL = process.env.SOCKET_URL

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<null | Socket>(null)
  const { isAuth, isLoad, token } = useAppSelector(getSessionData)

  useEffect(() => {
    if (!isLoad && isAuth && token && SOCKET_URL) {
      const s = io(SOCKET_URL, {
        extraHeaders: {
          authorization: token,
        },
      })
      setSocket(s)
    }
  }, [isAuth, token, isLoad])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

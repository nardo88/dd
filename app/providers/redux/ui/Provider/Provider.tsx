import { store } from '@app/redux'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'

interface IProps {
  children: ReactNode
}

export const ReduxProvider = ({ children }: IProps) => {
  return <Provider store={store}>{children}</Provider>
}

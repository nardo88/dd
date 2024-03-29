import { FC } from 'react'
import { classNames } from '@shared/helpers/classNames'
import { useStore } from 'react-redux'

interface LeftMenu {
  className?: string
  isAuth: boolean
  isLoad: boolean
}

export const LeftMenu: FC<LeftMenu> = ({ className, isAuth, isLoad }) => {
  const store = useStore()

  const click = () => {
    console.log(store.getState())
  }
  if (isLoad) return null
  return (
    <div className={classNames('', {}, [className])}>
      {isAuth ? (
        <button>Logout</button>
      ) : (
        <button onClick={click}>login</button>
      )}
    </div>
  )
}

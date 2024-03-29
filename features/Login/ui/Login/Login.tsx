import { FC, FormEvent, useEffect } from 'react'
import { Input, InputTypes } from '@shared/ui/Input'
import { getLogin, getpassword } from '../../modules/selectors'
import cls from './Login.module.scss'
import { useSelector, useStore } from 'react-redux'
import { useAppDispatch } from '@shared/hooks/redux'
import { loginAction, loginReducer } from '../../modules/slice/LoginSlice'
import { Button } from '@shared/ui/Button/Button'
import Link from 'next/link'
import { ReduxStoreWithManager } from '@app/redux/types'

export const Login: FC = () => {
  const loginValue = useSelector(getLogin)
  const passwordValue = useSelector(getpassword)
  const dispatch = useAppDispatch()
  const store = useStore() as ReduxStoreWithManager

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  useEffect(() => {
    store.reducerManager.add('login', loginReducer)
    return () => {
      store.reducerManager.remove('login')
    }
  }, [store])

  return (
    <div className={cls.login}>
      <form className={cls.form} onSubmit={submitHandler}>
        <Input
          value={loginValue}
          onChange={(v) => dispatch(loginAction.changeLogin(v))}
          label="Email"
        />
        <Input
          value={passwordValue}
          onChange={(v) => dispatch(loginAction.changePassword(v))}
          label="Пароль"
          type={InputTypes.PASSWORD}
        />
        <div className={cls.btnWrapper}>
          <Link className={cls.link} href={'/signup'}>
            Зарегистрироваться
          </Link>
          <Button type="submit">Войти</Button>
        </div>
      </form>
    </div>
  )
}

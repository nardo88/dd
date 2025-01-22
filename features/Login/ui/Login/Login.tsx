import { FC, FormEvent, useEffect } from 'react'
import { Input, InputTypes } from '@shared/ui/Input'
import { getError, getIsLoading, getLogin, getpassword } from '../../modules/selectors'
import cls from './Login.module.scss'
import { useSelector, useStore } from 'react-redux'
import { useAppDispatch } from '@shared/hooks/redux'
import { loginAction, loginReducer } from '../../modules/slice/LoginSlice'
import { Button } from '@shared/ui/Button/Button'
import Link from 'next/link'
import { ReduxStoreWithManager } from '@app/redux'
import { loginByEmail } from '@features/Login/modules/asyncThunk'
import { Text, TextVariant } from '@shared/ui/Text/Text'
import { Loader, LoaderVariants } from '@shared/ui/Loader/Loader'

export const Login: FC = () => {
  const login = useSelector(getLogin)
  const password = useSelector(getpassword)
  const error = useSelector(getError)
  const isLoading = useSelector(getIsLoading)
  const dispatch = useAppDispatch()
  const store = useStore() as ReduxStoreWithManager

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      loginByEmail({
        login,
        password,
      })
    )
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
        {error && <Text variant={TextVariant.ERROR}>{error}</Text>}
        <Input
          disabled={isLoading}
          value={login}
          onChange={(v) => dispatch(loginAction.changeLogin(v))}
          label="Email"
        />
        <Input
          value={password}
          onChange={(v) => dispatch(loginAction.changePassword(v))}
          label="Пароль"
          type={InputTypes.PASSWORD}
          disabled={isLoading}
        />
        <div className={cls.btnWrapper}>
          <Link className={cls.link} href={'/signup'}>
            Зарегистрироваться
          </Link>
          <Button className={cls.submitBtn} disabled={isLoading} type="submit">
            {isLoading && <Loader variant={LoaderVariants.SECONDARY} className={cls.btnLoader} />}
            Войти
          </Button>
        </div>
      </form>
    </div>
  )
}

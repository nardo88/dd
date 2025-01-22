import { FC, FormEvent, useEffect } from 'react'
import Link from 'next/link'
import { Input, InputTypes } from '@shared/ui/Input'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import {
  getEmail,
  getErrorSignUp,
  getIsLoadingSignUp,
  getPassword,
  getRepeatPassword,
  signUpResult,
  signUpValidate,
} from '../../modules/selector'
import { signupAction, signupReducer } from '../../modules/slice/signupSlice'
import { Button } from '@shared/ui/Button/Button'
import { useStore } from 'react-redux'
import { ReduxStoreWithManager } from '@app/redux'
import { Text, TextVariant } from '@shared/ui/Text/Text'
import { Loader, LoaderVariants } from '@shared/ui/Loader/Loader'
import { validateSignUp } from '../../modules/helpers/validate'
import cls from './Signup.module.scss'
import { signUpThunk } from '@features/Signup/modules/services/signUpThunk'

const Signup: FC = () => {
  const dispatch = useAppDispatch()
  const email = useAppSelector(getEmail)
  const password = useAppSelector(getPassword)
  const repeatPassword = useAppSelector(getRepeatPassword)
  const result = useAppSelector(signUpResult)
  const isLoading = useAppSelector(getIsLoadingSignUp)
  const error = useAppSelector(getErrorSignUp)
  const validate = useAppSelector(signUpValidate)
  const store = useStore() as ReduxStoreWithManager

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signupAction.changeValidate(null))
    const res = validateSignUp({
      email,
      password,
      repeatPassword,
    })

    if (res) {
      return dispatch(signupAction.changeValidate(res))
    }

    dispatch(signUpThunk({ email, password }))
  }

  useEffect(() => {
    store.reducerManager.add('signup', signupReducer)
    return () => {
      store.reducerManager.remove('signup')
    }
  }, [store])

  return (
    <div className={cls.signup}>
      <form className={cls.form} onSubmit={submitHandler}>
        {error && <Text variant={TextVariant.ERROR}>{error}</Text>}
        <Input
          value={email}
          onChange={(v) => dispatch(signupAction.changeEmail(v))}
          label="Email"
          disabled={isLoading}
          errorText={validate?.email}
        />
        <Input
          value={password}
          onChange={(v) => dispatch(signupAction.changePassword(v))}
          label="Пароль"
          type={InputTypes.PASSWORD}
          disabled={isLoading}
          errorText={validate?.password || null}
        />
        <Input
          value={repeatPassword}
          onChange={(v) => dispatch(signupAction.changeRepeatPassword(v))}
          label="Повторите пароль"
          type={InputTypes.PASSWORD}
          disabled={isLoading}
          errorText={validate?.repeatPassword || null}
        />
        <div className={cls.btnWrapper}>
          {isLoading ? (
            <div className={cls.loaderWrapper}>
              <Loader />
            </div>
          ) : (
            <>
              <Link className={cls.link} href={'/signin'}>
                Войти
              </Link>
              <Button className={cls.submitBtn} disabled={isLoading} type="submit">
                {isLoading && (
                  <Loader variant={LoaderVariants.SECONDARY} className={cls.btnLoader} />
                )}
                Зарегистрироваться
              </Button>
            </>
          )}
        </div>
        {result && (
          <Text variant={TextVariant.SUCCESS} className={cls.result}>
            {result}
          </Text>
        )}
      </form>
    </div>
  )
}

export default Signup

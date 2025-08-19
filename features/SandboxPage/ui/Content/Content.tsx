import { FC } from 'react'

import { useAppSelector } from '@shared/hooks/redux'
import { Sandbox, SandboxStacks, isSandboxStacks } from '@shared/ui/Sandbox'
import { IWebCode, WebSandbox } from '@shared/ui/WebSandbox'

import { getCode } from '../../selectors'

import cls from './Content.module.scss'

interface IContentProps {
  type: string
}

export const Content: FC<IContentProps> = (props) => {
  const { type } = props
  const code = useAppSelector(getCode)

  return (
    <>
      {type === 'web' && <WebSandbox code={code as IWebCode} onChange={() => {}} />}
      {isSandboxStacks(type) && (
        <Sandbox code={code as string} className={cls.sandbox} language={type as SandboxStacks} />
      )}
    </>
  )
}

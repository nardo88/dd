import { FC, useEffect, useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { classNames } from '@shared/helpers/classNames'
import { TimeOutType } from '@shared/types/timeOut'
import { Sandbox } from '@shared/ui/Sandbox'

import { IBody } from '../../types'

import cls from './Code.module.scss'

export const Code: FC<IBody> = (props) => {
  const { value, settings } = props
  const [isCopied, setIsCopied] = useState(false)
  const ref = useRef<TimeOutType | null>(null)

  const clickHandler = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(value)
  }

  useEffect(() => {
    if (isCopied && !ref.current) {
      ref.current = setTimeout(() => {
        setIsCopied(false)
        ref.current = null
      }, 3000)
    }
  }, [isCopied])

  return (
    <div className={cls.code}>
      {!settings?.canEdit && (
        <>
          <button
            className={classNames(cls.copyBtn, { [cls.isCopied]: isCopied })}
            onClick={clickHandler}
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
          <SyntaxHighlighter language={settings?.language || 'typescript'} style={oneDark}>
            {value}
          </SyntaxHighlighter>
        </>
      )}
      {settings?.canEdit && (
        <Sandbox language={settings?.language || 'typescript'} code={value} canRun />
      )}
    </div>
  )
}

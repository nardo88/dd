import { FC, useEffect, useRef, useState } from 'react'
import { classNames } from '@shared/helpers/classNames'
import { TimeOutType } from '@shared/types/timeOut'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import cls from './Code.module.scss'

interface CodeProps {
  value: string
}

export const Code: FC<CodeProps> = (props) => {
  const { value } = props
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
      <button
        className={classNames(cls.copyBtn, { [cls.isCopied]: isCopied })}
        onClick={clickHandler}>
        {isCopied ? 'Copied' : 'Copy'}
      </button>
      <SyntaxHighlighter language="javascript" style={oneDark}>
        {value}
      </SyntaxHighlighter>
    </div>
  )
}

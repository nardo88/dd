import { FC } from 'react'
import { classNames } from '@shared/helpers/classNames'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './MediumText.scss'

interface MediumTextProps {
  children?: string
  className?: string
}

export const MediumText: FC<MediumTextProps> = (props) => {
  const { className, children } = props

  return (
    <ReactQuill
      value={children}
      className={classNames('MediumText', {}, [className])}
      readOnly
      modules={{ toolbar: null }}
    />
  )
}

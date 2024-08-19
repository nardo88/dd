import { FC } from 'react'
import { classNames } from '@shared/helpers/classNames'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './MediumText.scss'

interface MediumTextProps {
  value?: string
  className?: string
}

export const MediumText: FC<MediumTextProps> = (props) => {
  const { className, value } = props

  return (
    <ReactQuill
      value={value}
      className={classNames('MediumText', {}, [className])}
      readOnly
      modules={{ toolbar: null }}
    />
  )
}

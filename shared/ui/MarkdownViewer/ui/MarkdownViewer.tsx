import { FC } from 'react'
import MDEditor from '@uiw/react-md-editor'
import cls from './MarkdownViewer.module.scss'
import { classNames } from '@shared/helpers/classNames'

interface MarkdownViewerProps {
  value: string
  className?: string
}

export const MarkdownViewer: FC<MarkdownViewerProps> = (props) => {
  const { value, className } = props

  return (
    <div className={classNames(cls.MarkdownViewer, {}, [className])}>
      <MDEditor.Markdown source={value} />
    </div>
  )
}

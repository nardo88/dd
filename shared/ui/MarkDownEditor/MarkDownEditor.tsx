import { FC } from 'react'
import { classNames } from '@shared/helpers/classNames'
import MDEditor from '@uiw/react-md-editor'
import './MarkDownEditor.module.scss'

interface MarkDownEditorProps {
  className?: string
  value: string
  onChange: (val: string) => void
}

export const MarkDownEditor: FC<MarkDownEditorProps> = (props) => {
  const { className, onChange, value } = props

  return (
    <div className={classNames('MarkDownEditor', {}, [className])}>
      <MDEditor
        hideToolbar={true}
        value={value}
        onChange={(val: any) => onChange(val)}
        preview="edit"
      />
    </div>
  )
}

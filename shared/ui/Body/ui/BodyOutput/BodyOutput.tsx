import { FC } from 'react'
import cls from './BodyOutput.module.scss'
import { classNames } from '@shared/helpers/classNames'
import { IBody } from '../..'
import { MediumText } from '../../../MediumText'
import { Image } from '../Image/Image'
import { AsyncCode as Code } from '../Code/Code.async'
import { Video } from '../Video/Video'
import { IFrame } from '../IFrame/IFrame'
import { MarkdownViewer } from '@shared/ui/MarkdownViewer'

interface BodyOutputProps {
  className?: string
  body: IBody[]
}

export const BodyOutput: FC<BodyOutputProps> = (props) => {
  const { className, body } = props
  return (
    <div className={classNames(cls.BodyOutput, {}, [className])}>
      {body.map((item) => (
        <div key={item._id}>
          {item.type === 'text' && <MediumText value={item.value} />}
          {item.type === 'image' && <Image src={item.value} />}
          {['code', 'terminal'].includes(item.type) && <Code {...item} />}
          {item.type === 'video' && <Video src={item.value} />}
          {item.type === 'frame' && <IFrame src={item.value} />}
          {item.type === 'markdown' && <MarkdownViewer value={item.value} />}
          {item.type === 'file' && (
            <a
              download={item.value}
              href={item.value}
              className={cls.downLoad}
              target="_blank"
              rel="noreferrer">
              Скачать файл
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

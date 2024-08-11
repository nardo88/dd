import { FC } from 'react'
import cls from './BodyOutput.module.scss'
import { classNames } from '@shared/helpers/classNames'
import { IBody } from '../..'
import { MediumText } from '../../../MediumText'

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
          {item.type === 'text' && <MediumText children={item.value} />}
          {/* {item.type === 'image' && <Image />} */}
        </div>
      ))}
    </div>
  )
}

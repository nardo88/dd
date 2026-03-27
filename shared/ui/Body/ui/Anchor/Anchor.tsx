import { FC } from 'react'

import { classNames } from '@shared/helpers/classNames'

import { IBody } from '../..'

import cls from './Anchor.module.scss'

export const Anchor: FC<IBody> = (props) => {
  const { settings, value, _id } = props

  return (
    <>
      {settings?.anchorType === 'h1' && (
        <h1 className={classNames(cls.anchor, {}, [cls[settings.anchorType]])} id={_id}>
          {value}
        </h1>
      )}
      {settings?.anchorType === 'h2' && (
        <h2 className={classNames(cls.anchor, {}, [cls[settings.anchorType]])} id={_id}>
          {value}
        </h2>
      )}
      {settings?.anchorType === 'h3' && (
        <h3 className={classNames(cls.anchor, {}, [cls[settings.anchorType]])} id={_id}>
          {value}
        </h3>
      )}
      {settings?.anchorType === 'h4' && (
        <h4 className={classNames(cls.anchor, {}, [cls[settings.anchorType]])} id={_id}>
          {value}
        </h4>
      )}
      {settings?.anchorType === 'h5' && (
        <h5 className={classNames(cls.anchor, {}, [cls[settings.anchorType]])} id={_id}>
          {value}
        </h5>
      )}
    </>
  )
}

import { RefObject, useEffect, useRef, useState } from 'react'

import { Text, TextVariant } from '@shared/ui/Text/Text'

import cls from './Select.module.scss'
import { ArrowBottom } from '../Icons/ArrowBottom'
import { classNames } from '@shared/helpers/classNames'
import { getShortString } from '@shared/helpers/getShortString'

export type OptionType = { id: string; title: string }

type PropsType = {
  options: Array<OptionType>
  value?: OptionType | null
  onChange: (value: OptionType) => void
  label?: string
  haveError?: boolean
  errorText?: string
  errorClassName?: string
  className?: string
  disabled?: boolean
  placeholder?: string
  wrapper?: RefObject<HTMLDivElement> | null
}

export const Select = (props: PropsType) => {
  const {
    options = [],
    value,
    onChange,
    label,
    haveError = true,
    errorText,
    errorClassName,
    className,
    disabled = false,
    placeholder,
    wrapper,
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const changeSelect = (val: OptionType) => {
    onChange(val)
    setIsOpen(false)
  }

  const hideList = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', hideList)
    if (wrapper?.current) {
      wrapper?.current.addEventListener('click', hideList)
    }
    return () => {
      window.removeEventListener('click', hideList)
      if (wrapper?.current) {
        wrapper?.current.removeEventListener('click', hideList)
      }
    }
  }, [])

  return (
    <div ref={ref} className={classNames(cls.wrapper, {}, [className])}>
      {label && (
        <label
          className={classNames(cls.label, {
            [cls.error]: errorText && errorText.length > 0,
          })}>
          {label}
        </label>
      )}

      <div
        className={classNames(cls.input, {
          [cls.disabled]: disabled,
          [cls.noValue]: !value?.title,
          [cls.error]: errorText && errorText.length > 0,
          [cls.cup]: !!options.length,
        })}
        onClick={() => options.length && !disabled && setIsOpen(!isOpen)}>
        <span>
          {placeholder && !value ? placeholder : ''}
          {value?.title || ''}
        </span>

        <span className={classNames(cls.arrow, { [cls.rotate]: isOpen })}>
          <ArrowBottom />
        </span>
      </div>
      {isOpen && (
        <div className={cls.dropDown}>
          <ul>
            {options.map((item: OptionType) => (
              <li
                key={item.id}
                className={cls.selectOption}
                onClick={() => changeSelect(item)}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {haveError && errorText && (
        <Text
          className={classNames(cls.errorText, {}, [errorClassName])}
          variant={TextVariant.ERROR}>
          {errorText || ''}
        </Text>
      )}
    </div>
  )
}

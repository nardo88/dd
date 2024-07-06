import { FC, useEffect, useRef, useState } from 'react'
import cls from './BodyInput.module.scss'
import { classNames } from '@shared/helpers/classNames'
import { BodyItemType, IBody } from '../../types'
import { Plus } from '@shared/ui/Icons/Plus'
import { Button, ButtonVariant } from '@shared/ui/Button/Button'
import { bodyVariantsTitle, variants } from '../../const'
import { createId } from '@shared/helpers/createId/createId'
import { MediumEditor } from '@shared/ui/MediumEditor'
import { Text, TextVariant } from '@shared/ui/Text/Text'
import { Remove } from '@shared/ui/Icons/Remove'

interface BodyInputProps {
  className?: string
  body: IBody[]
  onChange: (body: IBody[]) => void
}

export const BodyInput: FC<BodyInputProps> = (props) => {
  const { className, body, onChange } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const addItem = (type: BodyItemType) => {
    onChange([...body, { _id: createId(), type, value: '' }])
    setIsOpen(false)
  }

  const hideList = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  const changeValue = (id: string, value: string) => {
    onChange(body.map((i) => (i._id === id ? { ...i, value } : i)))
  }

  useEffect(() => {
    window.addEventListener('click', hideList)
  }, [])

  return (
    <div className={classNames(cls.BodyInput, {}, [className])}>
      <div className={cls.content}>
        {body.map((item) => (
          <div key={item._id} className={cls.bodyItem}>
            <div className={cls.topContent}>
              <Text variant={TextVariant.HELPER}>
                {bodyVariantsTitle[item.type]}
              </Text>
              <Button variant={ButtonVariant.ICON}>
                <Remove />
              </Button>
            </div>
            {item.type === 'text' && (
              <MediumEditor
                value={item.value}
                onChange={(value) => changeValue(item._id, value)}
              />
            )}
          </div>
        ))}
      </div>
      <div className={cls.addSection} ref={ref}>
        <Button
          variant={ButtonVariant.ICON}
          onClick={() => setIsOpen((p) => !p)}>
          <Plus />
        </Button>
        <div className={classNames(cls.variants, { [cls.isOpen]: isOpen })}>
          <ul className={cls.variantList}>
            {variants.map((item) => (
              <li
                key={item.id}
                className={cls.variantItem}
                onClick={() => addItem(item.id)}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

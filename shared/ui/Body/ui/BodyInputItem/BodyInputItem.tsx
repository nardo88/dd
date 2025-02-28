import { Text, TextVariant } from '@shared/ui/Text/Text'
import cls from './BodyInputItem.module.scss'
import { BodyItemType, IBody } from '../../types'
import { FC, useRef, useState } from 'react'
import { bodyVariantsTitle, variants } from '../../const'
import { Button, ButtonVariant } from '@shared/ui/Button/Button'
import { Plus } from '@shared/ui/Icons/Plus'
import { classNames } from '@shared/helpers/classNames'
import { createId } from '@shared/helpers/createId/createId'
import { Remove } from '@shared/ui/Icons/Remove'
import { MediumEditor } from '@shared/ui/MediumEditor'
import { InputFile } from '@shared/ui/InputFile/InputFile'
import { MarkDownEditor } from '@shared/ui/MarkDownEditor'
import { CodeEditor } from '@shared/ui/CodeEditor/CodeEditor'
import { Input } from '@shared/ui/Input'

interface IBodyInputItemProps extends IBody {
  body: IBody[]
  onChange: (body: IBody[]) => void
}

export const BodyInputItem: FC<IBodyInputItemProps> = (props) => {
  const { body, onChange, _id, type, value } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [down, setDown] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const removeItem = (id: string) => {
    onChange(body.filter((i) => i._id !== id))
  }

  const changeValue = (id: string, value: string) => {
    onChange(body.map((i) => (i._id === id ? { ...i, value } : i)))
  }

  const addItem = (type: BodyItemType) => {
    onChange([...body, { _id: createId(), type, value: '' }])
    setIsOpen(false)
  }

  return (
    <div className={cls.bodyItem}>
      <div className={cls.topContent}>
        <Text variant={TextVariant.HELPER}>{bodyVariantsTitle[type]}</Text>
        <div className={cls.topBtnWrapper}>
          <div className={cls.addBetween} ref={ref}>
            <Button variant={ButtonVariant.ICON} onClick={() => setIsOpen((p) => !p)}>
              <Plus />
            </Button>
            <div
              ref={listRef}
              className={classNames(cls.variants, { [cls.isOpen]: isOpen })}
              style={{
                transform: `translateY(${down ? '-125%' : '0'})`,
              }}>
              <ul className={cls.variantList}>
                {variants.map((item) => (
                  <li key={item.id} className={cls.variantItem} onClick={() => addItem(item.id)}>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Button variant={ButtonVariant.ICON} onClick={() => removeItem(_id)}>
            <Remove />
          </Button>
        </div>
      </div>
      <div onPointerDown={(e) => e.stopPropagation()}>
        {type === 'text' && <MediumEditor value={value} onChange={(v) => changeValue(_id, v)} />}

        {['image', 'file', 'video'].includes(type) && (
          <InputFile
            url={value}
            type={type}
            onChange={(v) => changeValue(_id, v)}
            remove={() => changeValue(_id, '')}
          />
        )}

        {type === 'markdown' && (
          <MarkDownEditor value={value} onChange={(v) => changeValue(_id, v)} />
        )}

        {type === 'code' && <CodeEditor value={value} onChange={(v) => changeValue(_id, v)} />}

        {type === 'frame' && <Input value={value} onChange={(v) => changeValue(_id, v)} />}
      </div>
    </div>
  )
}

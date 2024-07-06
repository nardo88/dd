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
  const [currentItem, setCurentItem] = useState<string | null>(null)

  const parent = useRef<HTMLDivElement | null>(null)

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

  const dragStart = (e: any, id: string) => {
    console.log('dragStart: ', id)
    e.target.classList.add(cls.selected)
  }

  const dragEnd = (e: any, id: string) => {
    console.log('dragEnd: ', id)
    e.target.classList.remove(cls.selected)
  }

  const dragOver = (e: any) => {
    e.preventDefault()
  }

  const drop = (e: any, id: string) => {
    e.preventDefault()
    console.log('drop: ', id)
    // if (startIndex === index) {
    //   return
    // }
    // if (startIndex !== null) {
    //   const body = [...data.body]
    //   body.splice(startIndex, 1)
    //   body.splice(index, 0, currentItem)
    //   setData({ ...data, body })
    //   setStartIndex(null)
    //   setCurrentItem(null)
    // }
  }

  useEffect(() => {
    window.addEventListener('click', hideList)
  }, [])

  return (
    <div className={classNames(cls.BodyInput, {}, [className])}>
      <div className={cls.content}>
        {body.map((item) => (
          <div key={item._id} className={cls.bodyItem}>
            <div
              className={cls.topContent}
              draggable
              onDragEnd={(e) => dragEnd(e, item._id)}
              onDragOver={(e: any) => dragOver(e)}
              onDragStart={(e) => dragStart(e, item._id)}
              // onDragEnter={(e: any) => dragEnter(e)}
              // onDragLeave={(e: any) => dragLeave(e)}
              onDrop={(e: any) => drop(e, item._id)}>
              <Text variant={TextVariant.HELPER} className={cls.itemTitle}>
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

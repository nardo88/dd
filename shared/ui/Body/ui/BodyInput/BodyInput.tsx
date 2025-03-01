import { FC, useEffect, useRef, useState } from 'react'
import cls from './BodyInput.module.scss'
import { classNames } from '@shared/helpers/classNames'
import { BodyItemType, IBody } from '../../types'
import { Plus } from '@shared/ui/Icons/Plus'
import { Button, ButtonVariant } from '@shared/ui/Button/Button'
import { variants } from '../../const'
import { createId } from '@shared/helpers/createId/createId'
import { Reorder } from '@shared/ui/Reorder'
import { BodyInputItem } from '../BodyInputItem/BodyInputItem'

interface BodyInputProps {
  className?: string
  body: IBody[]
  onChange: (body: IBody[]) => void
}

export const BodyInput: FC<BodyInputProps> = (props) => {
  const { className, body, onChange } = props
  console.log('body: ', body)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [down, setDown] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const addItem = (type: BodyItemType) => {
    onChange([...body, { _id: createId(), type, value: '' }])
    setIsOpen(false)
  }

  const hideList = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', hideList)

    return () => {
      window.removeEventListener('click', hideList)
    }
  }, [])

  useEffect(() => {
    if (listRef.current && ref.current) {
      setDown(
        window.innerHeight <
          Number(
            Math.floor(ref.current?.getBoundingClientRect()?.top) + listRef.current?.offsetHeight
          )
      )
    }
  }, [isOpen])

  return (
    <div className={classNames(cls.BodyInput, {}, [className])}>
      {!!body.length && (
        <Reorder.Container className={cls.content}>
          {body.map((item, index) => (
            <Reorder.Element
              key={item._id}
              keyField="_id"
              index={index}
              data={body}
              setData={onChange}>
              <BodyInputItem body={body} onChange={onChange} {...item} index={index} />
            </Reorder.Element>
          ))}
        </Reorder.Container>
      )}
      <div className={cls.addSection} ref={ref}>
        <Button
          variant={ButtonVariant.ICON}
          onClick={() => setIsOpen((p) => !p)}
          className={cls.addBtn}>
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
    </div>
  )
}

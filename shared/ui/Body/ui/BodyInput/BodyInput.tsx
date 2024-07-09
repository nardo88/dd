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
import { Reorder } from 'framer-motion'
import { InputFile } from '@shared/ui/InputFile/InputFile'
import { MarkDownEditor } from '@shared/ui/MarkDownEditor/MarkDownEditor'
import { CodeEditor } from '@shared/ui/CodeEditor/CodeEditor'
import { Input } from '@shared/ui/Input'

interface BodyInputProps {
  className?: string
  body: IBody[]
  onChange: (body: IBody[]) => void
}

export const BodyInput: FC<BodyInputProps> = (props) => {
  const { className, body, onChange } = props
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

  const removeItem = (id: string) => {
    onChange(body.filter((i) => i._id !== id))
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

  useEffect(() => {
    if (listRef.current && ref.current) {
      setDown(
        window.innerHeight <
          Number(
            Math.floor(ref.current?.getBoundingClientRect()?.top) +
              listRef.current?.offsetHeight
          )
      )
    }
  }, [isOpen])

  return (
    <div className={classNames(cls.BodyInput, {}, [className])}>
      <Reorder.Group
        as="ul"
        axis="y"
        values={body}
        onReorder={onChange}
        className={cls.content}>
        {body.map((item) => (
          <Reorder.Item
            value={item}
            key={item._id}
            className={cls.bodyItem}
            whileDrag={{
              scale: 1.01,
              boxShadow: '0 0 5px 3px rgba(0,0,0,0.3)',
              background: 'white',
              cursor: 'grabbing',
            }}>
            <div className={cls.topContent}>
              <Text variant={TextVariant.HELPER}>
                {bodyVariantsTitle[item.type]}
              </Text>
              <Button
                variant={ButtonVariant.ICON}
                onClick={() => removeItem(item._id)}>
                <Remove />
              </Button>
            </div>
            {item.type === 'text' && (
              <MediumEditor
                value={item.value}
                onChange={(value) => changeValue(item._id, value)}
              />
            )}

            {['image', 'file', 'video'].includes(item.type) && (
              <InputFile
                url={item.value}
                type={item.type}
                onChange={(v) => changeValue(item._id, v)}
                remove={() => changeValue(item._id, '')}
              />
            )}

            {item.type === 'markdown' && (
              <MarkDownEditor
                value={item.value}
                onChange={(v) => changeValue(item._id, v)}
              />
            )}

            {item.type === 'code' && (
              <CodeEditor
                value={item.value}
                onChange={(v) => changeValue(item._id, v)}
              />
            )}

            {item.type === 'frame' && (
              <Input
                value={item.value}
                onChange={(v) => changeValue(item._id, v)}
              />
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <div className={cls.addSection} ref={ref}>
        <Button
          variant={ButtonVariant.ICON}
          onClick={() => setIsOpen((p) => !p)}>
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

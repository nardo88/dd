import { Text, TextVariant } from '@shared/ui/Text/Text'
import cls from './BodyInputItem.module.scss'
import { BodyItemType, IBody, IBodySetting } from '../../types'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
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
import { Setting } from '../Setting/Setting'
import { SettingIcon } from '@shared/ui/Icons/SettingIcon'

interface IBodyInputItemProps extends IBody {
  index: number
  body: IBody[]
  onChange: (body: IBody[]) => void
}

export const BodyInputItem: FC<IBodyInputItemProps> = (props) => {
  const { body, onChange, _id, type, value, index, settings } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
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
    const newBody = [...body]
    newBody.splice(index + 1, 0, { _id: createId(), type, value: '' })
    onChange(newBody)
    setIsOpen(false)
  }

  const hideList = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  const changeSetting = (field: keyof IBodySetting, value: string | boolean) => {
    onChange(
      body.map((i) =>
        i._id === _id ? { ...i, settings: { ...(i.settings || {}), [field]: value } } : i
      )
    )
  }

  const closePopup = useCallback(() => setIsPopupOpen(false), [])

  useEffect(() => {
    window.addEventListener('click', hideList)
    window.addEventListener('pointerdown', hideList)

    return () => {
      window.removeEventListener('click', hideList)
      window.removeEventListener('pointerdown', hideList)
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
    <div className={cls.bodyItem}>
      <div className={cls.topContent}>
        <Text variant={TextVariant.HELPER}>{bodyVariantsTitle[type]}</Text>
        <div className={cls.topBtnWrapper} onPointerDown={(e) => e.stopPropagation()}>
          {index !== body.length - 1 && (
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
          )}
          {['code'].includes(type) && (
            <Button variant={ButtonVariant.ICON} onClick={() => setIsPopupOpen(true)}>
              <SettingIcon />
            </Button>
          )}
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

        {type === 'code' && (
          <CodeEditor
            language={settings?.language || 'typescript'}
            value={value}
            onChange={(v) => changeValue(_id, v)}
          />
        )}

        {['frame', 'terminal'].includes(type) && (
          <Input value={value} onChange={(v) => changeValue(_id, v)} />
        )}
        {isPopupOpen && <Setting settings={settings} onChange={changeSetting} close={closePopup} />}
      </div>
    </div>
  )
}

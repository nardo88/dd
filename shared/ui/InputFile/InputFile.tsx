import { ChangeEvent, FC, useState } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { api } from '@shared/libs/axios'
import { BodyItemType, bodyVariantsTitle } from '@shared/ui/Body'
import { Button } from '@shared/ui/Button/Button'
import { Remove } from '@shared/ui/Icons/Remove'
import { Progress } from '@shared/ui/Progress/Progress'

import { Upload } from '../Icons/Upload'
import { Text } from '../Text/Text'

import cls from './InputFile.module.scss'

interface InputFileProps {
  className?: string
  type: BodyItemType
  onChange: (value: string) => void
  remove?: () => void
  url: string | null
  label?: string
}

export const InputFile: FC<InputFileProps> = (props) => {
  const { className, onChange, type, url, label, remove } = props
  const [progress, setProgress] = useState(0)
  console.log('progress: ', progress)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setProgress(0)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await api.post<{ data: string }>('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data; charset=UTF-16' },
        // Здесь после указания заголовков передаем
        // callback с помощью которого будем отслеживать прогресс
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
          }
        },
        params: { location },
      })
      setProgress(0)
      console.log(response.data)
      // onChange?.(fileData)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      e.target.value = ''
    }
  }

  return (
    <div className={classNames(cls.InputFile, {}, [className])}>
      {error && <Text variant="error">{error}</Text>}
      {label && <span className={cls.label}>{label}</span>}
      {!label && bodyVariantsTitle[type] && (
        <span className={cls.label}>{bodyVariantsTitle[type]}</span>
      )}

      <div className={cls.Control}>
        {url && remove && (
          <Button variant="icon" onClick={remove} className={cls.controlBtn} title="Удалить">
            <Remove fill="var(--color-secondary)" />
          </Button>
        )}
        <div className={cls.InputWrapper}>
          <Button variant="icon" onClick={remove} className={cls.controlBtn}>
            <Upload />
          </Button>
          <input type="file" onChange={uploadFile} />
        </div>
        {progress > 0 && <Progress className={cls.progress} progress={progress} />}
      </div>

      {type === 'image' && url && <img src={url} className={cls.preview} />}
      {type === 'file' && url && (
        <a download={url} href={url} className="mt20 df" target="_blank" rel="noreferrer">
          Скачать
        </a>
      )}
      {type === 'video' && url && <video controls className={cls.video} src={url} />}
    </div>
  )
}

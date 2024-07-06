import { FC } from 'react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { classNames } from '@shared/helpers/classNames'
import { BodyItemType, bodyVariantsTitle } from '@shared/ui/Body'
import { Button, ButtonVariant } from '@shared/ui/Button/Button'
import { Remove } from '@shared/ui/Icons/Remove'
import { Progress } from '@shared/ui/Progress/Progress'
import useFirebase from '@shared/hooks/useFireBase'
import cls from './InputFile.module.scss'
import { Upload } from '../Icons/Upload'

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
  const [file, setFile] = useState(null) as any
  const [urlFile, setUrlFile] = useState(url)
  const [progress, setProgress] = useState(0)
  const { storage, getDownloadURL, ref, uploadBytesResumable } = useFirebase()

  useEffect(() => {
    if (file) {
      const name = dayjs().valueOf()
      const imagesRef = ref(storage, `/${type}/${name}`)
      const uploadTask = uploadBytesResumable(imagesRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot: any) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress)
        },
        (error: any) => {
          switch (error?.code) {
            case 'storage/unauthorized':
              console.log(`User doesn't have permission to access the object`)
              break
            case 'storage/canceled':
              console.log(`User canceled the upload`)
              break
            case 'storage/unknown':
              console.log(
                `Unknown error occurred, inspect error.serverResponse`
              )
              break
          }
        },
        () => {
          // После того как файл загружен мы получаем ссылку
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: string) => {
              setUrlFile(downloadURL)
              onChange(downloadURL)
            }
          )
        }
      )
    } else {
      setProgress(0)
    }
  }, [file])

  return (
    <div className={classNames(cls.InputFile, {}, [className])}>
      {label ? (
        <span className={cls.label}>{label}</span>
      ) : bodyVariantsTitle[type] ? (
        <span className={cls.label}>{bodyVariantsTitle[type]}</span>
      ) : null}
      <div className={cls.Control}>
        {remove && (
          <Button
            variant={ButtonVariant.ICON}
            onClick={remove}
            className={cls.removeBtn}
            title="Удалить">
            <Remove fill="var(----color-secondary)" />
          </Button>
        )}
        <div className={cls.InputWrapper}>
          <Button
            variant={ButtonVariant.ICON}
            onClick={remove}
            className={cls.removeBtn}>
            <Upload />
          </Button>
          <input
            type="file"
            onChange={(e: any) => {
              setFile(e.target.files[0])
            }}
          />
        </div>
        {progress > 0 && (
          <Progress className={cls.progress} progress={progress} />
        )}
      </div>

      {type === 'image' && urlFile && (
        <img src={urlFile} className={cls.preview} />
      )}
      {type === 'file' && urlFile && (
        <a
          download={urlFile}
          href={urlFile}
          className="mt20 df"
          target="_blank"
          rel="noreferrer">
          Скачать
        </a>
      )}
      {type === 'video' && urlFile && (
        <video controls className={cls.video} src={urlFile} />
      )}
    </div>
  )
}

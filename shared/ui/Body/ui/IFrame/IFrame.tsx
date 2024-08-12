import { FC, useEffect, useRef, useState } from 'react'
import cls from './IFrame.module.scss'

interface IFrameProps {
  src: string
}

export const IFrame: FC<IFrameProps> = (props) => {
  const { src } = props
  const ref = useRef<HTMLDivElement | null>(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    setValue(ref.current?.offsetTop || 0)
  }, [])

  return (
    <div ref={ref} className={cls.IFrame}>
      <iframe
        className={cls.frame}
        style={{
          height: `calc(100vh - ${value + 85}px)`,
        }}
        src={src}
      />
    </div>
  )
}

import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import { sandboxListAction } from '@entities/Sandbox/slice'

import { useAppDispatch } from '@shared/hooks/redux'
import useDebounce from '@shared/hooks/useDebounce'
import { Button } from '@shared/ui/Button/Button'
import { Input } from '@shared/ui/Input'

import cls from './FilterBlock.module.scss'

export const FilterBlock: FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [filter, setFilter] = useState('')

  const debounce = useDebounce((v: string) => {
    dispatch(sandboxListAction.setFilter(v))
  }, 300)

  return (
    <div className={cls.filterBlock}>
      <Input
        label="Заголовок"
        value={filter}
        onChange={(v) => {
          setFilter(v)
          debounce(v)
        }}
      />

      <Button className={cls.addBtn} onClick={() => router.push('/sandbox')}>
        Добавить
      </Button>
    </div>
  )
}

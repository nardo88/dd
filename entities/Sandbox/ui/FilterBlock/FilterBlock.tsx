import { useRouter } from 'next/router'
import { FC, useMemo, useState } from 'react'

import { sandboxAction } from '@entities/Sandbox/slice'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import useDebounce from '@shared/hooks/useDebounce'
import { DropListButton, OptionsType } from '@shared/ui/DropListButton/DropListButton'
import { Plus } from '@shared/ui/Icons/Plus'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select/Select'

import { stackOptions } from '../../consts'
import { getStackTitle } from '../../selectors'
import { StackType } from '../../types'

import cls from './FilterBlock.module.scss'

export const FilterBlock: FC = () => {
  const dispatch = useAppDispatch()
  const stack = useAppSelector(getStackTitle)
  const router = useRouter()

  const [filter, setFilter] = useState('')

  const options = useMemo(
    (): OptionsType[] => [
      { id: 'python', title: 'Python', onClick: () => router.push(`/sandbox/python`) },
      { id: 'javascript', title: 'JavaScript', onClick: () => router.push(`/sandbox/javascript`) },
      { id: 'typescript', title: 'TypeScript', onClick: () => router.push(`/sandbox/typescript`) },
      { id: 'php', title: 'PHP', onClick: () => router.push(`/sandbox/php`) },
      { id: 'web', title: 'Web', onClick: () => router.push(`/sandbox/web`) },
    ],
    []
  )

  const debounce = useDebounce((v: string) => {
    dispatch(sandboxAction.changeTitleFilter(v))
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
      <Select
        label="Стек"
        options={stackOptions}
        value={stackOptions.find((i) => i.id === stack)}
        onChange={(v) => {
          dispatch(sandboxAction.changeStackFilter(v.id as StackType))
        }}
      />
      <DropListButton className={cls.addBtn} options={options}>
        <Plus />
        <span>Добавить</span>
      </DropListButton>
    </div>
  )
}

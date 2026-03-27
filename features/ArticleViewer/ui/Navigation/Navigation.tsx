import Link from 'next/link'
import { FC } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { useAppSelector } from '@shared/hooks/redux'
import { Text } from '@shared/ui/Text/Text'

import { getNavigation } from '../../modules/selectors'

import cls from './Navigation.module.scss'

export const Navigation: FC = () => {
  const navigation = useAppSelector(getNavigation)
  console.log('navigation: ', navigation)

  if (!navigation.length) return null

  return (
    <div className={cls.navigation}>
      <Text className={cls.title}>Содержимое</Text>
      <ul className={cls.navList}>
        {navigation.map((item) => (
          <li className={classNames(cls.navLink, {}, [cls[item.type]])} key={item.id}>
            <Link href={`#${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

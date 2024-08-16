import { FC } from 'react'
import cls from './PreviewList.module.scss'
import { useAppSelector } from '@shared/hooks/redux'
import { getIsLoading, getIsOpenSidebar, getPreview } from '../../modules/selectors'
import { Loader, LoaderVariants } from '@shared/ui/Loader/Loader'
import { Category } from '../Category/Category'
import { classNames } from '@shared/helpers/classNames'

export const PreviewList: FC = () => {
  const isLoading = useAppSelector(getIsLoading)
  const isOpen = useAppSelector(getIsOpenSidebar)
  const articles = useAppSelector(getPreview)

  if (isLoading) {
    return (
      <div className={cls.loaderWrapper}>
        <Loader variant={LoaderVariants.SECONDARY} />
      </div>
    )
  }
  return (
    <div className={classNames(cls.PreviewList, { [cls.isHide]: !isOpen })}>
      {articles.map((item) => (
        <Category key={item._id} {...item} />
      ))}
    </div>
  )
}

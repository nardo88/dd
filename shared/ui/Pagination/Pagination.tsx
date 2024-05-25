import { useEffect, useState } from 'react'

import cls from './Pagination.module.scss'
import { classNames } from '@shared/helpers/classNames'
import { Left } from '../Icons/Left'
import { Right } from '../Icons/Right'
import { Text } from '../Text/Text'

type PaginationProps = {
  total: number
  className?: string
  currentPage: number
  pageCount?: number
  limit?: number
  onChange: (newCurrentPage: number) => void
}

type PageIncrementProps = {
  goToLastPage: (value: number) => void
  lastPage: number
  total: number
  maxPageNumberLimit: number
}

type PageDecrementProps = {
  goToFirstPage: (value: number) => void
  minPageNumberLimit: number
}

const PageDecrement = ({
  minPageNumberLimit,
  goToFirstPage,
}: PageDecrementProps) => {
  return minPageNumberLimit >= 1 ? (
    <>
      <li className={cls.item} onClick={() => goToFirstPage(1)}>
        1
      </li>
      <li className={cls.dotItem}> &hellip; </li>
    </>
  ) : null
}

const PageIncrement = ({
  goToLastPage,
  lastPage,
  total,
  maxPageNumberLimit,
}: PageIncrementProps) => {
  return total > maxPageNumberLimit ? (
    <>
      <li className={cls.dotItem}> &hellip; </li>
      <li className={cls.item} onClick={() => goToLastPage(lastPage)}>
        {lastPage}
      </li>
    </>
  ) : null
}

const Pagination = ({
  total = 0,
  currentPage,
  onChange,
  pageCount = 5,
  limit = 5,
  className,
}: PaginationProps) => {
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState<number>(5)
  const [minPageNumberLimit, setminPageNumberLimit] = useState<number>(0)

  function getPages(): Array<number> {
    return Array.apply(null, Array(Math.ceil(total / pageCount))).map(
      (_, index) => index + 1
    )
  }
  const [pages, setPages] = useState<number[]>(getPages())
  const lastPage = pages[pages.length - 1]

  const checkNumberLimit = (value: number) => {
    if (
      Math.floor(limit / 2) + value > maxPageNumberLimit &&
      maxPageNumberLimit <= lastPage
    ) {
      const nextValue =
        value + Math.floor(limit / 2) < lastPage
          ? value + Math.floor(limit / 2)
          : lastPage
      setmaxPageNumberLimit(nextValue)
      setminPageNumberLimit(nextValue - limit)
    }
    if (
      value - Math.floor(limit / 2) <= minPageNumberLimit &&
      minPageNumberLimit > 0
    ) {
      const prevValue =
        value - Math.ceil(limit / 2) >= 0 ? value - Math.ceil(limit / 2) : 0
      setminPageNumberLimit(prevValue)
      setmaxPageNumberLimit(prevValue + limit)
    }
  }

  const handleClick = (value: number) => {
    onChange(value)
    checkNumberLimit(value)
    scrollTo()
  }

  useEffect(() => setPages(getPages()), [total, currentPage])

  useEffect(() => {
    setmaxPageNumberLimit(5)
    setminPageNumberLimit(0)
  }, [total])

  if (!total || total <= pageCount) return null

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      <ul className={cls.buttonsWrapper}>
        <li>
          <div
            className={classNames(
              cls.prev,
              { [cls.disabled]: currentPage === 1 },
              [cls.sidebtn]
            )}
            onClick={() => {
              if (currentPage !== 1) handleClick(currentPage - 1)
            }}>
            <Left />
          </div>
        </li>

        <PageDecrement
          minPageNumberLimit={minPageNumberLimit}
          goToFirstPage={handleClick}
        />
        {pages.map((item: number) => {
          if (item < maxPageNumberLimit + 1 && item > minPageNumberLimit) {
            return (
              <li key={item} className={cls.desctopPoint}>
                <button
                  onClick={() => handleClick(item)}
                  className={classNames(cls.item, {
                    [cls.current]: item === currentPage,
                  })}>
                  {item}
                </button>
              </li>
            )
          }
        })}
        <li className={cls.mobileCurrentPage}>
          <Text>{currentPage}</Text>
        </li>
        <PageIncrement
          goToLastPage={handleClick}
          lastPage={lastPage}
          total={pages.length}
          maxPageNumberLimit={maxPageNumberLimit}
        />

        <li>
          <div
            className={classNames(cls.sidebtn, {
              [cls.disabled]: currentPage === Math.ceil(total / pageCount),
            })}
            onClick={() => {
              if (currentPage !== Math.ceil(total / pageCount))
                handleClick(currentPage + 1)
            }}>
            <Right />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Pagination

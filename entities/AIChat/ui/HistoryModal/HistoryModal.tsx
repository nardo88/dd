import { FC, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Loader } from '@shared/ui/Loader/Loader'
import Pagination from '@shared/ui/Pagination/Pagination'
import { Popup } from '@shared/ui/Popup/Popup'
import { Text } from '@shared/ui/Text/Text'

import { getSessionList } from '../../modules/asyncThunks/getSessionList'
import { PAGE_COUNT } from '../../modules/consts'
import {
  getIsSessionsLoading,
  getSessions,
  getSessionsCurrentPage,
  getSessionsError,
  getSessionsTotal,
} from '../../modules/selectors'
import { actions } from '../../modules/slice'
import { SessionItem } from '../SessionItem/SessionItem'

import cls from './HistoryModal.module.scss'

interface IProps {
  onClose: () => void
}

export const HistoryModal: FC<IProps> = (props) => {
  const { onClose } = props
  const dispatch = useAppDispatch()

  const sessions = useAppSelector(getSessions)
  const total = useAppSelector(getSessionsTotal)
  const currentPage = useAppSelector(getSessionsCurrentPage)
  const isLoading = useAppSelector(getIsSessionsLoading)
  const error = useAppSelector(getSessionsError)

  useEffect(() => {
    dispatch(getSessionList())
  }, [currentPage])

  return (
    <Popup title="История сессий" onClose={onClose} maxWidth={600}>
      <div className={cls.content}>
        {error && <Text variant="error">{error}</Text>}
        {sessions.length > 0 && (
          <ul className={cls.list}>
            {sessions.map((session) => (
              <SessionItem key={session._id} session={session} onSelect={onClose} />
            ))}
          </ul>
        )}

        {!sessions.length && !isLoading && (
          <Text variant="helper" className={cls.empty}>
            Нет прошлых сессий
          </Text>
        )}

        {isLoading && <Loader />}

        <Pagination
          currentPage={currentPage}
          total={total}
          pageCount={PAGE_COUNT}
          onChange={(page) => dispatch(actions.setSessionsCurrentPage(page))}
        />
      </div>
    </Popup>
  )
}

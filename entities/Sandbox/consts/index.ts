import { OptionType } from '@shared/ui/Select/Select'

import { IFilter } from '../types'

export const defaultFilter: IFilter = {
  title: '',
  type: 'all',
}

export const stackOptions: OptionType[] = [
  { id: 'all', title: 'Все' },
  { id: 'python', title: 'Python' },
  { id: 'javascript', title: 'JavaScript' },
  { id: 'typescript', title: 'TypeScript' },
  { id: 'php', title: 'PHP' },
  { id: 'web', title: 'WEB' },
]

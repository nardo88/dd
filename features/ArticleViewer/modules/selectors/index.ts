import { StateSchema } from '@app/redux/types'

import { IBody } from '@shared/ui/Body'

import { INavigation } from '../types'

const emptyArray: any[] = []

export const getArticleBody = (state: StateSchema): IBody[] => state.article?.body || emptyArray
export const getIsLoading = (state: StateSchema) => state.article?.isLoading || false
export const getNavigation = (state: StateSchema): INavigation[] =>
  state.article?.navigation || emptyArray

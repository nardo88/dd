import { StateSchema } from '@app/redux/types'
import { IBody } from '@shared/ui/Body'

const emptyArray: IBody[] = []

export const getArticleBody = (state: StateSchema) => state.article?.body || emptyArray
export const getIsLoading = (state: StateSchema) => state.article?.isLoading || false
